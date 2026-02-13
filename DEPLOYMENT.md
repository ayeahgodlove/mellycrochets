# Deployment Checklist

## Before deploying

1. **Environment variables**  
   Set in your hosting (Vercel, Netlify, etc.):
   - `NEXTAUTH_URL` – production URL (e.g. `https://yourdomain.com`)
   - `NEXTAUTH_SECRET` – secret for NextAuth
   - Database and any API keys (e.g. Tranzak) as used in `.env`

2. **Build**  
   Run `npm run build` (or `refine build`). If Refine CLI fails, try `npx next build`.

3. **Do not commit**  
   `.env` and `.env*.local` are gitignored; keep secrets out of the repo.

## Recent optimizations

- Removed duplicate crochet fetch on `/crochets/[slug]` (uses `fetchCrochetBySlug` only).
- `API_URL` in `constants/api-url.js` uses `process.env.NEXTAUTH_URL` for deployment.
- Unused imports and commented code removed in post-hero, api-url, crochets slug page, and utils/data.
