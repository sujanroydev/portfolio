# Sujan Kumar Roy — Portfolio

The portfolio and companion pages are built with Next.js App Router, React,
TypeScript, and Tailwind CSS v4. Existing copy, project links, imagery, visual
styles, and page interactions have been retained while the original static
pages were migrated to reusable components and route-specific styles.

Tailwind utilities handle component and route styling. `globals.css` is limited
to the shared theme and base styles, focus treatment, and custom keyframe
animations used by the personal message page.

## Routes

- `/` — portfolio, education, skills, projects, GitHub stats, and contact form
- `/unsaid` — personal message page with animated hearts
- `/unsaid/deshboard` — private activity and response history
- `/bfc` — BuildFromCode landing page
- `/chrona` — Chrona product page
- `/chrona/privacy` — Chrona privacy policy

The `/github`, `/linkedin`, `/facebook`, `/knowlet`, `/landcalculator`, and
`/digitalrdn` paths redirect to their existing destinations.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation and production

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

Static images, favicons, and the existing search verification file are served
from `public/`. The project preview embeds and GitHub statistics continue to use
their existing external services. The contact form opens a prefilled email
using the visitor's default mail application; it does not send data to a
backend.

## Portfolio email composer

`/mail` sends email through Resend using the verified `sujanroy.in` domain.
Configure these environment variables before enabling delivery:

```bash
RESEND_API_KEY=
EMAIL_DOMAIN=sujanroy.in
DEFAULT_FROM_EMAIL=hello@sujanroy.in
EMAIL_ALLOWED_USERNAMES=hello,sujan,contact
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

In Resend, add and verify `sujanroy.in` and publish the DNS records Resend
provides, including DKIM and SPF. `DEFAULT_FROM_EMAIL` must use that domain.
Only `EMAIL_ALLOWED_USERNAMES` and the default sender can be selected in the
composer; add a custom local-part to that comma-separated allowlist to enable
it. Resend must accept the verified domain as the sending identity. A sender
address is not automatically an inbox: configure a mailbox or alias separately
if you need to receive replies at it.

Create a Cloudflare Turnstile widget for the portfolio hostname and set its
site key and secret above. The secret and `RESEND_API_KEY` are server-only. The
send endpoint also checks the request origin, validates all fields and
attachments, sanitizes rich-text HTML, and rate-limits attempts per IP in each
running server process. For multi-instance/serverless production deployments,
also configure a distributed rate limit at the hosting edge because process
memory is not shared between instances.

## Unsaid activity tracking

The private Unsaid experience records page views and meaningful interactions
through authenticated server-side APIs. Add the following environment
variables:

```bash
UNSAID_PASSWORD=
UNSAID_SESSION_SECRET=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

`SUPABASE_SERVICE_ROLE_KEY` must only be used by server-side code. Apply the
database migration with the Supabase CLI:

```bash
supabase db push
```

The migration creates `unsaid_activities`, `unsaid_responses`, indexes,
`updated_at` and search-text triggers, RLS restrictions, and private dashboard
aggregate functions. The dashboard is available only at
`/unsaid/deshboard` after a valid Unsaid session is established.
