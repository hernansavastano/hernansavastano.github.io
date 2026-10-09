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

## Hosting on Cloudflare Pages
- Build command: `npm run build`
- Build output directory: `dist/public`
- Environment variable: `VITE_WEB3FORMS_KEY` = your Web3Forms access key
  (free at https://web3forms.com — this makes the contact form email you).
  Without it, the contact form opens the visitor's email app instead.
