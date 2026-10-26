# WordsCut website

Public WordsCut marketing website, initially published at
[GitHub Pages](https://awaismirza.github.io/wordscut-app-web/). The owner will
connect wordscut.com later. React + Vite, using the approved WordsCut design and genuine native
application screenshots. This repository contains **website code only** — no
application source, installers, model files, credentials or private recordings.

## Development

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
```

Routes: `/`, `/privacy`, `/terms`, `/support`. The build emits static HTML with
WordsCut-specific canonical/Open Graph/Twitter metadata for each route so direct
Pages requests and social previews work without relying on JavaScript execution.
Legacy `/products/wordscut/*` and `/products/yusafcut/*` links resolve to root routes.

`src/data/product-sites/wordsCut.js` owns product copy and availability. Screenshot
provenance and privacy review are in `public/wordscut/screenshots/manifest.json`.
Current images show development build 1.10.1 with original synthetic demo media and
an authored transcript. Camera picture capture was unsuccessful; only real camera
controls are shown. Recorder capture used its limited display-only fallback.
No transcription accuracy, camera sync or signed-release acceptance is claimed.

The paid release is in preparation. With no `VITE_WORDSCUT_CHECKOUT_URL`, calls to
action contact support. Preserve the existing public HTTPS checkout validation,
earlier licence rights and source offers. Do not set the Pages repository variable
`WORDSCUT_CHECKOUT_URL` until purchase/delivery and hosting eligibility are reviewed.
No app download or price is invented by this site.

## Publishing

Pushes to main run `.github/workflows/pages.yml`: lint, test, build, Pages upload
and deployment. The initial build base is `/wordscut-app-web/` and no custom domain
is configured, so the Pages address remains usable while DNS is deferred.
When the owner is ready, set repository variables `SITE_BASE_PATH=/` and
`SITE_URL=https://wordscut.com`, add `public/CNAME` containing `wordscut.com`,
configure the Pages custom domain, and redeploy. DNS then requires the four GitHub
Pages apex A records and `www` CNAME to `awaismirza.github.io`; leave unrelated mail,
verification and security records intact. Enable HTTPS once the certificate issues. See `docs/HANDOFF.md` for live validation and rollback.

Visual source: awaismirza/awaisjamil review commit
`ec2f7d048b97520596d6bf780f0cd6b542a7167b`. The application remains in its separate
private repository. No application Git history is copied here.
