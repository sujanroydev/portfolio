import type { Metadata } from "next";
import MailComposer from "./MailComposer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Send an email | Sujan Kumar Roy",
  description: "Compose and send an email from Sujan's portfolio.",
  robots: { index: false, follow: false },
};

const USERNAME_PATTERN = /^[a-z0-9](?:[a-z0-9._+-]{0,62}[a-z0-9])?$/;
const DEFAULT_USERNAMES = ["hello", "sujan", "contact"];

function isValidUsername(value: string) {
  return USERNAME_PATTERN.test(value) && !value.includes("..");
}

export default function MailPage() {
  const domain = process.env.EMAIL_DOMAIN?.trim().toLowerCase() || "sujanroy.in";
  const configuredDefault = process.env.DEFAULT_FROM_EMAIL?.trim().toLowerCase() ?? "";
  const defaultUsername =
    configuredDefault.endsWith(`@${domain}`)
      ? configuredDefault.slice(0, -(domain.length + 1))
      : "";
  const configuredUsernames = (process.env.EMAIL_ALLOWED_USERNAMES ?? "")
    .split(",")
    .map((username) => username.trim().toLowerCase())
    .filter(isValidUsername);
  const allowedUsernames = Array.from(
    new Set(
      [defaultUsername, ...configuredUsernames].filter(
        (username) => username && isValidUsername(username),
      ),
    ),
  ).sort((first, second) => {
    const firstPriority = DEFAULT_USERNAMES.indexOf(first);
    const secondPriority = DEFAULT_USERNAMES.indexOf(second);
    if (firstPriority !== -1 || secondPriority !== -1) {
      return (firstPriority === -1 ? 99 : firstPriority) -
        (secondPriority === -1 ? 99 : secondPriority);
    }
    return first.localeCompare(second);
  });

  return (
    <MailComposer
      domain={domain}
      defaultUsername={defaultUsername}
      allowedUsernames={allowedUsernames}
      turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
    />
  );
}
