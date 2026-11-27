import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import sanitizeHtml from "sanitize-html";
import {
  getMailDashboardPassword,
  getMailClientIp,
  isMailRateLimited,
  isSameOrigin,
  MAIL_SESSION_COOKIE,
  verifyMailSession,
} from "@/lib/mail-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_DOMAIN = "sujanroy.in";
const MAX_REQUEST_BYTES = 10 * 1024 * 1024;
const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_ATTACHMENTS = 5;
const MAX_RECIPIENTS = 10;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 30_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const USERNAME_PATTERN = /^[a-z0-9](?:[a-z0-9._+-]{0,62}[a-z0-9])?$/;
const EMAIL_PATTERN =
  /^[^\s@<>(),;:]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

interface MailConfig {
  apiKey: string;
  domain: string;
  defaultUsername: string;
  allowedUsernames: Set<string>;
}

function response(message: string, status: number) {
  return NextResponse.json(
    { message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

function isValidUsername(value: string) {
  return USERNAME_PATTERN.test(value) && !value.includes("..");
}

function getMailConfig(): MailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const domain = process.env.EMAIL_DOMAIN?.trim().toLowerCase();
  const defaultFrom = process.env.DEFAULT_FROM_EMAIL?.trim().toLowerCase();

  if (!apiKey || domain !== EMAIL_DOMAIN || !defaultFrom) {
    return null;
  }

  const defaultAt = defaultFrom.lastIndexOf("@");
  const defaultUsername = defaultFrom.slice(0, defaultAt);
  if (
    defaultAt < 1 ||
    defaultFrom.slice(defaultAt + 1) !== domain ||
    !isValidUsername(defaultUsername)
  ) {
    return null;
  }

  const configuredUsernames = (process.env.EMAIL_ALLOWED_USERNAMES ?? "")
    .split(",")
    .map((username) => username.trim().toLowerCase())
    .filter(Boolean);

  if (configuredUsernames.some((username) => !isValidUsername(username))) {
    return null;
  }

  return {
    apiKey,
    domain,
    defaultUsername,
    allowedUsernames: new Set([defaultUsername, ...configuredUsernames]),
  };
}

function parseEmailList(value: string, required: boolean) {
  const trimmed = value.trim();
  if (!trimmed) return required ? null : [];

  const addresses = trimmed.split(",").map((address) => address.trim());
  if (
    addresses.some(
      (address) =>
        address.length > 254 ||
        !EMAIL_PATTERN.test(address) ||
        address.includes(".."),
    )
  ) {
    return null;
  }

  return addresses;
}

function safePlainText(value: string) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim();
}

const EMAIL_HTML_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "a",
    "b",
    "blockquote",
    "br",
    "div",
    "em",
    "i",
    "li",
    "ol",
    "p",
    "strong",
    "u",
    "ul",
  ],
  allowedAttributes: { a: ["href"] },
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesAppliedToAttributes: ["href"],
  disallowedTagsMode: "discard",
};

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return response("This request is not allowed.", 403);
  }

  const dashboardPassword = getMailDashboardPassword();
  if (!dashboardPassword) {
    return response(
      "Set a unique EMAIL_DASHBOARD_PASSWORD with at least 24 characters.",
      503,
    );
  }

  if (
    !verifyMailSession(
      request.cookies.get(MAIL_SESSION_COOKIE)?.value,
      dashboardPassword,
    )
  ) {
    return response("Your dashboard session has expired. Sign in again.", 401);
  }

  const config = getMailConfig();
  if (!config) {
    return response(
      "Email sending is not configured. Contact the site owner.",
      503,
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return response("The message and attachments are too large.", 413);
  }

  if (
    isMailRateLimited(
      `send:${getMailClientIp(request)}`,
      RATE_LIMIT_MAX_REQUESTS,
      RATE_LIMIT_WINDOW_MS,
    )
  ) {
    return response("Too many send attempts. Please wait a little before trying again.", 429);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return response("The message form is invalid.", 400);
  }

  const field = (name: string) => {
    const value = formData.get(name);
    return typeof value === "string" ? value : "";
  };

  if (field("website").trim()) {
    return response("This request is not allowed.", 400);
  }

  const sender = field("sender").trim().toLowerCase();
  const to = parseEmailList(field("to"), true);
  const cc = parseEmailList(field("cc"), false);
  const bcc = parseEmailList(field("bcc"), false);
  const subject = field("subject").trim();
  const text = safePlainText(field("text"));
  const untrustedHtml = field("html");

  if (!isValidUsername(sender) || !config.allowedUsernames.has(sender)) {
    return response("That sender username is not authorized.", 403);
  }

  if (!to || !cc || !bcc) {
    return response("Enter valid recipient email addresses.", 400);
  }

  if (to.length + cc.length + bcc.length > MAX_RECIPIENTS) {
    return response(`Send to no more than ${MAX_RECIPIENTS} recipients at once.`, 400);
  }

  if (
    !subject ||
    subject.length > MAX_SUBJECT_LENGTH ||
    /[\r\n\u0000-\u001f\u007f]/.test(subject)
  ) {
    return response("Enter a subject of 1 to 200 characters.", 400);
  }

  if (!text || text.length > MAX_MESSAGE_LENGTH || untrustedHtml.length > 100_000) {
    return response("Enter a message of 1 to 30,000 characters.", 400);
  }

  const html = sanitizeHtml(untrustedHtml, EMAIL_HTML_OPTIONS);
  if (!html.trim()) {
    return response("Enter a message before sending.", 400);
  }

  const attachmentEntries = formData.getAll("attachments");
  if (attachmentEntries.some((entry) => typeof entry === "string" && entry)) {
    return response("An attachment was invalid.", 400);
  }
  const files = attachmentEntries.filter(
    (entry): entry is File => typeof entry !== "string" && entry.size > 0,
  );

  if (
    files.length > MAX_ATTACHMENTS ||
    files.some((file) => file.size > MAX_FILE_BYTES) ||
    files.reduce((total, file) => total + file.size, 0) > MAX_ATTACHMENT_BYTES
  ) {
    return response("Attachments must be five files or fewer and total 8 MB or less.", 413);
  }

  try {
    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename:
          file.name
            .replace(/[^\w.-]+/g, "_")
            .replace(/^\.+/, "")
            .slice(0, 128) || "attachment",
        content: Buffer.from(await file.arrayBuffer()),
      })),
    );
    const resend = new Resend(config.apiKey);
    const { data, error } = await resend.emails.send({
      from: `Sujan Kumar Roy <${sender}@${config.domain}>`,
      to,
      ...(cc.length > 0 ? { cc } : {}),
      ...(bcc.length > 0 ? { bcc } : {}),
      subject,
      html,
      text,
      ...(attachments.length > 0 ? { attachments } : {}),
    });

    if (error || !data?.id) {
      console.error("Resend rejected an email:", error?.message ?? "Missing message ID.");
      return response(
        "The email provider could not send this message. Check the verified domain and sender configuration.",
        502,
      );
    }

    return NextResponse.json(
      { message: "Your email was sent successfully.", id: data.id },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Email delivery failed:", error);
    return response(
      "The email provider could not send this message. Please try again later.",
      502,
    );
  }
}
