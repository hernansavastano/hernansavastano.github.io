# Hernán Savastano — Mi Canción website

A static React site (Vite + Tailwind). No server is needed; it can be hosted
for free on Cloudflare Pages.

## Change songs, gallery, or text
- Track list and gallery: `data/storage.ts`
- Page content: `client/src/components/` and `client/src/pages/`
- Images and audio: `client/public/attached_assets/`

## Build
    npm install
    npm run build        # output goes to dist/public

## Hosting on GitHub Pages
Every push to `main` builds and publishes the site automatically
(see `.github/workflows/deploy.yml`).
- Contact form: add a repository secret named `VITE_WEB3FORMS_KEY`
  (Settings → Secrets and variables → Actions) with your free Web3Forms key
  from https://web3forms.com. Without it, the form opens the visitor's email app.
- Custom domain: Settings → Pages → Custom domain → `www.hernansavastano.com`.
