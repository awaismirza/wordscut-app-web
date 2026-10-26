# WordsCut website agent guidance

- Website only. Never add private app source, installers, captured personal media,
  credentials or private fixtures. Native screenshot assets need reviewed provenance.
- Keep product copy data-driven in `src/data/product-sites/wordsCut.js`.
- Preserve root, privacy, terms, support and legacy-link behavior; update metadata
  in `src/data/pages.js` and static generation together.
- Preserve actual release/checkout status and earlier licence rights. Development
  screenshots are not proof of a public release, ASR accuracy or capture acceptance.
- Run lint, unit tests, build and real-browser responsive/route checks before delivery.
- Keep a reproducible `docs/HANDOFF.md`. Stage specific paths, never `git add -A`.
- Publish, DNS and main-branch updates require owner authorization for that task.
