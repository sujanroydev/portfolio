# Sujan Kumar Roy — Portfolio

The portfolio and companion pages are built with Next.js App Router, React, and
JavaScript. Existing copy, project links, imagery, visual styles, and page
interactions have been retained while the original static pages were migrated
to reusable components and route-specific styles.

## Routes

- `/` — portfolio, education, skills, projects, GitHub stats, and contact form
- `/for-you` — personal message page with animated hearts
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
npm run build
npm start
```

Static images, favicons, and the existing search verification file are served
from `public/`. The project preview embeds and GitHub statistics continue to use
their existing external services. The contact form opens a prefilled email
using the visitor's default mail application; it does not send data to a
backend.
