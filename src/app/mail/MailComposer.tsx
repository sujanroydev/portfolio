"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createElement,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

const MAX_MESSAGE_LENGTH = 30_000;
const MAX_ATTACHMENT_COUNT = 5;
const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024;
const USERNAME_PATTERN = /^[a-z0-9](?:[a-z0-9._+-]{0,62}[a-z0-9])?$/;

interface MailComposerProps {
  domain: string;
  defaultUsername: string;
  allowedUsernames: string[];
}

function isValidUsername(value: string) {
  return USERNAME_PATTERN.test(value) && !value.includes("..");
}

function formatBytes(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const PREVIEW_TAGS = new Set([
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
]);
const BLOCKED_PREVIEW_TAGS = new Set([
  "iframe",
  "object",
  "script",
  "style",
  "svg",
  "template",
]);
const PREVIEW_CLASSES: Record<string, string> = {
  a: "text-teal-700 underline dark:text-accent",
  blockquote:
    "my-3 border-l-2 border-teal-600 pl-4 text-slate-600 dark:border-accent dark:text-slate-400",
  li: "my-1",
  ol: "my-3 list-decimal pl-6",
  p: "my-2",
  ul: "my-3 list-disc pl-6",
};

function renderPreviewNode(node: Node, key: string): ReactNode {
  if (node.nodeType === 3) return node.textContent;
  if (node.nodeType !== 1) return null;

  const element = node as Element;
  const tag = element.tagName.toLowerCase();
  if (BLOCKED_PREVIEW_TAGS.has(tag)) return null;

  const children = Array.from(element.childNodes).map((child, index) =>
    renderPreviewNode(child, `${key}-${index}`),
  );
  if (!PREVIEW_TAGS.has(tag)) return children;

  if (tag === "a") {
    const href = element.getAttribute("href");
    try {
      const parsed = new URL(href ?? "");
      if (!["http:", "https:", "mailto:"].includes(parsed.protocol)) {
        return children;
      }
      return createElement(
        "a",
        {
          key,
          href,
          target: "_blank",
          rel: "noopener noreferrer",
          className: PREVIEW_CLASSES.a,
        },
        ...children,
      );
    } catch {
      return children;
    }
  }

  return createElement(
    tag,
    { key, className: PREVIEW_CLASSES[tag] },
    ...children,
  );
}

function renderPreview(html: string) {
  const parsed = new DOMParser().parseFromString(html, "text/html");
  return Array.from(parsed.body.childNodes).map((node, index) =>
    renderPreviewNode(node, `preview-${index}`),
  );
}

export default function MailComposer({
  domain,
  defaultUsername,
  allowedUsernames,
}: MailComposerProps) {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  const submissionLock = useRef(false);
  const [sender, setSender] = useState(defaultUsername || "custom");
  const [customUsername, setCustomUsername] = useState("");
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageHtml, setMessageHtml] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showCopyFields, setShowCopyFields] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [feedback, setFeedback] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const username = (sender === "custom" ? customUsername : sender)
    .trim()
    .toLowerCase();
  const senderEmail = username ? `${username}@${domain}` : "";
  const isAllowedSender = allowedUsernames.includes(username);
  const messageLength = messageText.length;
  const canSend =
    isAllowedSender &&
    !submitting &&
    Boolean(to.trim()) &&
    Boolean(subject.trim()) &&
    Boolean(messageText.trim()) &&
    messageLength <= MAX_MESSAGE_LENGTH;

  function updateMessage() {
    setMessageText(editorRef.current?.innerText ?? "");
    setMessageHtml(editorRef.current?.innerHTML ?? "");
  }

  function applyFormat(command: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    updateMessage();
  }

  function addLink() {
    const value = window.prompt("Enter a link URL (https://, http://, or mailto:)");
    if (!value) return;

    try {
      const parsed = new URL(value);
      if (!["http:", "https:", "mailto:"].includes(parsed.protocol)) {
        setFeedback({ kind: "error", message: "Use an http, https, or mailto link." });
        return;
      }
    } catch {
      setFeedback({ kind: "error", message: "Enter a complete link URL." });
      return;
    }

    setFeedback(null);
    applyFormat("createLink", value);
  }

  function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    const combined = [...attachments, ...selected];
    const totalBytes = combined.reduce((total, file) => total + file.size, 0);

    if (combined.length > MAX_ATTACHMENT_COUNT) {
      setFeedback({ kind: "error", message: "Attach up to five files." });
    } else if (totalBytes > MAX_ATTACHMENT_BYTES) {
      setFeedback({
        kind: "error",
        message: "Attachments must total 8 MB or less.",
      });
    } else {
      setAttachments(combined);
      setFeedback(null);
    }

    setFileInputKey((key) => key + 1);
  }

  function removeAttachment(indexToRemove: number) {
    setAttachments((current) =>
      current.filter((_, index) => index !== indexToRemove),
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLock.current || !canSend) return;

    submissionLock.current = true;
    setSubmitting(true);
    setFeedback(null);

    const editorHtml = editorRef.current?.innerHTML ?? "";
    const formData = new FormData();
    formData.set("sender", username);
    formData.set("to", to);
    formData.set("cc", cc);
    formData.set("bcc", bcc);
    formData.set("subject", subject);
    formData.set("html", editorHtml);
    formData.set("text", messageText);
    formData.set("website", "");
    attachments.forEach((file) => formData.append("attachments", file));

    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        body: formData,
      });
      const result: unknown = await response.json();
      const responseMessage =
        typeof result === "object" &&
        result !== null &&
        "message" in result &&
        typeof result.message === "string"
          ? result.message
          : "";

      if (!response.ok) {
        if (response.status === 401) router.refresh();
        setFeedback({
          kind: "error",
          message: responseMessage || "The email could not be sent. Please try again.",
        });
        return;
      }

      setFeedback({
        kind: "success",
        message: "Your email was sent successfully.",
      });
      setTo("");
      setCc("");
      setBcc("");
      setSubject("");
      setMessageText("");
      setMessageHtml("");
      setAttachments([]);
      setShowCopyFields(false);
      setFileInputKey((key) => key + 1);
      if (editorRef.current) editorRef.current.innerHTML = "";
    } catch {
      setFeedback({
        kind: "error",
        message: "Could not reach the mail service. Check your connection and try again.",
      });
    } finally {
      submissionLock.current = false;
      setSubmitting(false);
    }
  }

  async function signOut() {
    setSigningOut(true);

    try {
      const response = await fetch("/api/mail/auth", { method: "DELETE" });
      if (!response.ok) throw new Error("Sign-out request failed.");
      router.refresh();
    } catch {
      setSigningOut(false);
      setFeedback({
        kind: "error",
        message: "Could not sign out. Please try again.",
      });
    }
  }

  function stopToolbarFocus(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-[#101316] dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-7 sm:px-8 sm:pt-10">
        <header className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 no-underline transition hover:text-teal-700 dark:text-slate-300 dark:hover:text-accent"
          >
            <span aria-hidden="true">←</span> Back to portfolio
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 dark:border-white/10 dark:text-slate-400">
              SIGNED IN
            </span>
            <button
              type="button"
              onClick={signOut}
              disabled={signingOut}
              className="rounded-lg px-2 py-1 text-sm font-medium text-slate-600 transition hover:text-rose-700 disabled:opacity-50 dark:text-slate-300 dark:hover:text-rose-300"
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </header>

        <div className="mb-8 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-accent">
            Write something thoughtful
          </p>
          <h1 className="font-[var(--font-inter)] text-3xl font-semibold tracking-tight sm:text-4xl">
            New message
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Send a message from an authorized @
            {domain} address.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_270px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#181c20]"
          >
            <div className="space-y-6 p-5 sm:p-8">
              <div>
                <label
                  htmlFor="mail-sender"
                  className="mb-2 block text-sm font-medium"
                >
                  From
                </label>
                <div className="grid gap-3 sm:grid-cols-[minmax(150px,0.65fr)_minmax(0,1fr)]">
                  <select
                    id="mail-sender"
                    value={sender}
                    onChange={(event) => setSender(event.target.value)}
                    className="min-h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-teal-600 dark:border-white/10 dark:bg-[#111518]"
                    aria-label="Choose sender username"
                  >
                    {allowedUsernames.map((identity) => (
                      <option key={identity} value={identity}>
                        {identity}
                      </option>
                    ))}
                    <option value="custom">Custom username…</option>
                  </select>
                  {sender === "custom" ? (
                    <div className="flex min-h-12 items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-teal-600 dark:border-white/10 dark:bg-[#111518]">
                      <input
                        type="text"
                        value={customUsername}
                        onChange={(event) =>
                          setCustomUsername(event.target.value.toLowerCase())
                        }
                        placeholder="your-username"
                        autoComplete="off"
                        maxLength={64}
                        aria-label="Custom sender username"
                        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                      />
                      <span className="text-sm text-slate-500">@{domain}</span>
                    </div>
                  ) : (
                    <div className="flex min-h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">
                      {senderEmail || "Configure a sender identity"}
                    </div>
                  )}
                </div>
                {sender === "custom" && customUsername && (
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span
                      className={
                        isValidUsername(username)
                          ? "text-slate-500 dark:text-slate-400"
                          : "text-rose-600 dark:text-rose-400"
                      }
                    >
                      {isValidUsername(username)
                        ? senderEmail
                        : "Use letters, numbers, dots, underscores, + or -."}
                    </span>
                    {isValidUsername(username) && !isAllowedSender && (
                      <span className="text-amber-700 dark:text-amber-300">
                        This username has not been enabled for sending.
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="mail-to" className="text-sm font-medium">
                    To
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCopyFields((visible) => !visible)}
                    aria-expanded={showCopyFields}
                    className="rounded px-1 py-1 text-xs font-medium text-teal-700 hover:text-teal-900 dark:text-accent dark:hover:text-white"
                  >
                    {showCopyFields ? "Hide CC / BCC" : "Add CC / BCC"}
                  </button>
                </div>
                <input
                  id="mail-to"
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={to}
                  onChange={(event) => setTo(event.target.value)}
                  placeholder="name@example.com"
                  className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 dark:border-white/10 dark:bg-[#111518]"
                />
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Separate multiple email addresses with commas.
                </p>
              </div>

              {showCopyFields && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="mail-cc"
                      className="mb-2 block text-sm font-medium"
                    >
                      CC
                    </label>
                    <input
                      id="mail-cc"
                      type="text"
                      inputMode="email"
                      value={cc}
                      onChange={(event) => setCc(event.target.value)}
                      placeholder="name@example.com"
                      className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 dark:border-white/10 dark:bg-[#111518]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mail-bcc"
                      className="mb-2 block text-sm font-medium"
                    >
                      BCC
                    </label>
                    <input
                      id="mail-bcc"
                      type="text"
                      inputMode="email"
                      value={bcc}
                      onChange={(event) => setBcc(event.target.value)}
                      placeholder="name@example.com"
                      className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 dark:border-white/10 dark:bg-[#111518]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="mail-subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Subject
                </label>
                <input
                  id="mail-subject"
                  type="text"
                  required
                  maxLength={200}
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="A clear subject"
                  className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 dark:border-white/10 dark:bg-[#111518]"
                />
                <p className="mt-1 text-right text-xs text-slate-500 dark:text-slate-400">
                  {subject.length}/200
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium" id="mail-message-label">
                    Message
                  </label>
                  <span
                    className={`text-xs ${
                      messageLength > MAX_MESSAGE_LENGTH
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {messageLength.toLocaleString()}/
                    {MAX_MESSAGE_LENGTH.toLocaleString()}
                  </span>
                </div>
                <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
                  <div
                    className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-white/[0.03]"
                    role="toolbar"
                    aria-label="Message formatting"
                  >
                    {[
                      ["bold", "Bold", "B"],
                      ["italic", "Italic", "I"],
                      ["underline", "Underline", "U"],
                    ].map(([command, label, symbol]) => (
                      <button
                        key={command}
                        type="button"
                        onMouseDown={stopToolbarFocus}
                        onClick={() => applyFormat(command)}
                        aria-label={label}
                        title={label}
                        className={`size-9 rounded-lg text-sm text-slate-700 transition hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-white/10 ${
                          command === "bold"
                            ? "font-bold"
                            : command === "italic"
                              ? "italic"
                              : "underline"
                        }`}
                      >
                        {symbol}
                      </button>
                    ))}
                    <span className="mx-1 my-1 w-px bg-slate-200 dark:bg-white/10" />
                    <button
                      type="button"
                      onMouseDown={stopToolbarFocus}
                      onClick={addLink}
                      aria-label="Add link"
                      title="Add link"
                      className="size-9 rounded-lg text-sm text-slate-700 transition hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-white/10"
                    >
                      ↗
                    </button>
                    <button
                      type="button"
                      onMouseDown={stopToolbarFocus}
                      onClick={() => applyFormat("insertUnorderedList")}
                      aria-label="Bulleted list"
                      title="Bulleted list"
                      className="size-9 rounded-lg text-sm text-slate-700 transition hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-white/10"
                    >
                      •≡
                    </button>
                    <button
                      type="button"
                      onMouseDown={stopToolbarFocus}
                      onClick={() => applyFormat("insertOrderedList")}
                      aria-label="Numbered list"
                      title="Numbered list"
                      className="size-9 rounded-lg text-sm text-slate-700 transition hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-white/10"
                    >
                      1≡
                    </button>
                    <button
                      type="button"
                      onMouseDown={stopToolbarFocus}
                      onClick={() => applyFormat("formatBlock", "blockquote")}
                      aria-label="Quotation"
                      title="Quotation"
                      className="size-9 rounded-lg text-sm text-slate-700 transition hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-white/10"
                    >
                      “
                    </button>
                  </div>
                  <div
                    ref={editorRef}
                    contentEditable
                    role="textbox"
                    aria-labelledby="mail-message-label"
                    aria-multiline="true"
                    onInput={updateMessage}
                    data-placeholder="Write your message here…"
                    className="min-h-56 px-4 py-4 text-sm leading-7 outline-none empty:before:pointer-events-none empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)] dark:empty:before:text-slate-500"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Formatting is preserved in the delivered email.
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">Attachments</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Up to 5 files, 8 MB total.
                    </p>
                  </div>
                  <label
                    htmlFor="mail-attachments"
                    className="inline-flex min-h-10 cursor-pointer items-center rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                  >
                    Add files
                  </label>
                  <input
                    key={fileInputKey}
                    id="mail-attachments"
                    type="file"
                    multiple
                    onChange={handleAttachmentChange}
                    className="sr-only"
                  />
                </div>
                {attachments.length > 0 && (
                  <ul className="space-y-2" aria-label="Selected attachments">
                    {attachments.map((file, index) => (
                      <li
                        key={`${file.name}-${file.lastModified}-${index}`}
                        className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-white/[0.03]"
                      >
                        <span className="min-w-0 truncate">
                          {file.name}
                          <span className="ml-2 text-xs text-slate-500">
                            {formatBytes(file.size)}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          aria-label={`Remove ${file.name}`}
                          className="shrink-0 rounded px-2 py-1 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
                You are signed in to the private mail dashboard. Your session
                expires after eight hours.
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  disabled={!subject.trim() && !messageText.trim()}
                  className="min-h-11 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                >
                  Preview email
                </button>
                <button
                  type="submit"
                  disabled={!canSend}
                  className="min-h-12 rounded-xl bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-accent dark:text-[#08120f] dark:hover:bg-[#6ff5d4]"
                >
                  {submitting ? "Sending…" : "Send message"}
                </button>
              </div>

              {feedback && (
                <div
                  role={feedback.kind === "error" ? "alert" : "status"}
                  aria-live={feedback.kind === "error" ? "assertive" : "polite"}
                  className={`fixed left-4 right-4 top-4 z-[250] mx-auto max-w-md rounded-xl border px-4 py-3 text-sm shadow-lg ${
                    feedback.kind === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/20 dark:bg-[#10251d] dark:text-emerald-200"
                      : "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-400/20 dark:bg-[#2b171b] dark:text-rose-200"
                  }`}
                >
                  {feedback.message}
                </div>
              )}
            </div>
          </form>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#181c20]">
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-800 dark:bg-accent/10 dark:text-accent">
                <span aria-hidden="true">✦</span>
              </div>
              <h2 className="text-sm font-semibold">A note on sender addresses</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Only usernames enabled by the site owner can send. The domain
                must be verified with Resend; custom usernames are not mailboxes
                unless an inbox or alias is configured separately.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#181c20]">
              <h2 className="text-sm font-semibold">Before you send</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                <li>Check recipient addresses and attachments.</li>
                <li>Keep your message respectful and relevant.</li>
                <li>Messages are sent through the verified domain.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {showPreview && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowPreview(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="mail-preview-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-7 dark:border-white/10 dark:bg-[#181c20]"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 id="mail-preview-title" className="text-lg font-semibold">
                Email preview
              </h2>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                aria-label="Close preview"
                className="size-9 rounded-lg text-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
              >
                ×
              </button>
            </div>
            <dl className="space-y-3 border-b border-slate-200 pb-5 text-sm dark:border-white/10">
              <div className="grid grid-cols-[64px_1fr] gap-3">
                <dt className="text-slate-500 dark:text-slate-400">From</dt>
                <dd className="break-all">{senderEmail || "—"}</dd>
              </div>
              <div className="grid grid-cols-[64px_1fr] gap-3">
                <dt className="text-slate-500 dark:text-slate-400">To</dt>
                <dd className="break-all">{to || "—"}</dd>
              </div>
              {cc && (
                <div className="grid grid-cols-[64px_1fr] gap-3">
                  <dt className="text-slate-500 dark:text-slate-400">CC</dt>
                  <dd className="break-all">{cc}</dd>
                </div>
              )}
              {bcc && (
                <div className="grid grid-cols-[64px_1fr] gap-3">
                  <dt className="text-slate-500 dark:text-slate-400">BCC</dt>
                  <dd className="break-all">{bcc}</dd>
                </div>
              )}
              <div className="grid grid-cols-[64px_1fr] gap-3">
                <dt className="text-slate-500 dark:text-slate-400">Subject</dt>
                <dd className="break-words font-medium">{subject || "—"}</dd>
              </div>
            </dl>
            <div className="min-h-32 break-words py-5 text-sm leading-7">
              {messageHtml ? (
                renderPreview(messageHtml)
              ) : (
                <p className="whitespace-pre-wrap text-slate-500 dark:text-slate-400">
                  {messageText || "Your message will appear here."}
                </p>
              )}
            </div>
            {attachments.length > 0 && (
              <div className="border-t border-slate-200 pt-4 text-sm dark:border-white/10">
                <p className="mb-2 font-medium">Attachments</p>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  {attachments.map((file, index) => (
                    <li key={`${file.name}-${file.lastModified}-${index}`}>
                      {file.name} ({formatBytes(file.size)})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
