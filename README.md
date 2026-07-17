# backnd

A polished, minimal D2C management dashboard for brand owners. The public landing page is served at `/`, and the dashboard is protected behind Vercel Routing Middleware at `/dashboard.html`.

## Run locally

```bash
npm start
```

Then open `http://localhost:4174`.

The local static server is only for visual preview. Password protection runs on Vercel Routing Middleware, so use Vercel for auth testing.

## Deploy on Vercel

Use the default deployment. No build command is required.

Recommended settings:

- Framework preset: Other
- Build command: leave empty
- Output directory: `.`

Required environment variables:

- `BACKND_PASSWORD`: the password used to enter the dashboard
- `BACKND_SESSION_SECRET`: a long random string for signing session cookies

## What is included

- Password-protected landing flow using signed HTTP-only cookies
- Middleware-controlled dashboard route with no password in client code
- Responsive dashboard shell for desktop, tablet, and mobile
- Sidebar sections for platforms, inventory, logistics, ads, customers, finance, and support
- Accessible landmarks, labels, focus states, and reduced-motion support
- Static sample metrics ready to replace with API data
