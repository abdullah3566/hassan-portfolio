# Hassan Abdullah — Portfolio

Junior Full-Stack Developer portfolio built with Next.js 14 + Tailwind CSS.

## Before deploying — 1 thing to add

Drop your photo into the `public/` folder as **hassan.jpg** (square, ~800x800px).
Until then the site shows an "HA" monogram placeholder.
Your resume PDF is already included at `public/Hassan_Abdullah_Resume.pdf`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel (free)

1. Push this folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/abdullah3566/portfolio.git
   git push -u origin main
   ```
2. Go to https://vercel.com → "Add New Project" → import the repo.
3. Vercel auto-detects Next.js. Click **Deploy**. Done.

You'll get a free URL like `hassan-portfolio.vercel.app`.
Add it to your CV, LinkedIn Featured section, and GitHub profile.

## Editing content

All text lives in the data arrays at the top of `app/page.js`
(NAV, SKILLS, EXPERIENCE, PROJECTS) — edit there without touching layout code.
When Lexisera has a public URL, add it to the Lexisera project's `live` field.
