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
