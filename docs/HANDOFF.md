# Standalone WordsCut site migration — 26 October 2026

Owner requested a new public `awaismirza/wordscut-app-web` repository, GitHub Pages
publication at wordscut.com, and replacing the portfolio mini-site with an external
product link. Source design is awaisjamil review commit ec2f7d0; website source only
was selected into this fresh repository, with no prior application/portfolio history.

Implemented root/legal/support routes, standalone header/footer, WordsCut theme
storage, source-verified copy and unchanged privacy-reviewed native screenshots.
Removed the portfolio chatbot and portfolio pages. Built static HTML metadata,
project-base paths, sitemap and robots output; reused the existing product styling/gallery.

Deployment and DNS live evidence will be recorded after publication. DNS provider
is Squarespace. Its original default parking records are four A records
198.185.159.144 / 198.185.159.145 / 198.49.23.144 / 198.49.23.145, www CNAME
ext-sq.squarespace.com and an HTTPS parking hint record. Mail security TXT and
_domainconnect records are unrelated and must remain. Restore that preset only
if rolling this site back to parking is explicitly requested.

Roll back site code with a revert and a normal Pages deployment; keep domain
ownership claimed in Pages during any transition. Portfolio migration is isolated
on feature/wordscut-external-site from origin/main 5d82899 and is published after
the new destination is verified. The earlier redesign branch remains historical.

Owner subsequently deferred all DNS work and asked for GitHub Pages deployment
only for now. No DNS record or custom-domain setting was changed. Initial public
URL: https://awaismirza.github.io/wordscut-app-web/. There is deliberately no CNAME
file, to avoid redirecting this working URL to the parked custom domain.

## Validation before publication

Initial website source commit: ce358b1a0deb0ff1c9224c7526558bca8068052b.
- npm run lint: pass.
- npm test: 7/7 pass.
- npm run build: pass, approximately 280 KB JS / 89 KB gzip.
- Clean npm ci against the regenerated lockfile: pass (213 packages); npm reports
  13 inherited dependency advisories, not remediated by this migration.
- Production browser matrix: 390/768/1280/1440/1920 × light/dark, all ten pass.
  Root and legal routes, actual-size gallery, focus/contrast, menu, all images,
  canonical/social metadata, old route aliases, contact CTA and console checked.
- Read-only independent review of routing/base paths/SEO/Pages/privacy: no findings.
- Browser checks fixed static/client canonical duplication and wait for lazy images
  to finish loading before decoding. Licence text links use the project base.

GitHub repository is public and Pages is enabled in workflow mode with no custom
domain (`cname: null`). The next commit adds the workflow after Pages enablement.
No DNS records were changed. Portfolio migration is committed/pushed to its review
branch at 8345945, with live portfolio main unchanged while DNS is deferred.

## Published and live-verified

Deployment commit: a9e9cd6e1549f19b85ed8f41d7ba76c3a76468ab.
GitHub Actions run: https://github.com/awaismirza/wordscut-app-web/actions/runs/40323724259
Build and Deploy to GitHub Pages both completed successfully.
Live URL: https://awaismirza.github.io/wordscut-app-web/

HTTP checks returned 200 for home, privacy, terms, support and editor-hero.webp.
Live Chrome checks at 390 and 1440 pass: no page overflow; all product images load;
gallery opens, actual-size mode works and Escape closes; exactly one canonical;
all legal/support pages and earlier licence text resolve; no console/page errors.
Proof: docs/qa/live/hero-390.png, hero-1440.png and results.json.
Reproduce with node scripts/verify-live.mjs (installed Chrome required).
The full ten-combination production-preview matrix remains in
`docs/qa/wordscut-marketing/results.json`.

GitHub Pages has HTTPS enforced, no custom domain and no CNAME. Owner will configure
DNS later. awaisjamil.com live main was not changed; its prepared migration remains
on the isolated review branch. No PR, merge, app change, installer/release or DNS
mutation was performed. This final documentation/verification-evidence commit uses
[skip ci]; the deployed application code remains exactly the successful SHA above.

Next actions: owner reviews the working Pages URL; later connect wordscut.com using
the README settings; then publish the prepared portfolio link migration.
