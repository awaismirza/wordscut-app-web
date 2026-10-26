import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { pageMetadata, domain } from '../src/data/pages.js'

const template = await readFile('dist/index.html', 'utf8')
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
for (const [route, meta] of Object.entries(pageMetadata)) {
  const directory = route === '/' ? 'dist' : `dist${route}`
  await mkdir(directory, { recursive: true })
  const tags = `<title>${escape(meta.title)}</title>
<meta name="description" content="${escape(meta.description)}">
<link rel="canonical" href="${meta.canonical}">
<meta property="og:title" content="${escape(meta.title)}">
<meta property="og:description" content="${escape(meta.description)}">
<meta property="og:url" content="${meta.canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="WordsCut">
<meta property="og:image" content="${meta.image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escape(meta.title)}">
<meta name="twitter:description" content="${escape(meta.description)}">
<meta name="twitter:image" content="${meta.image}">`
  await writeFile(`${directory}/index.html`, template.replace('<!-- PAGE_METADATA -->', tags))
}
await writeFile('dist/404.html', template.replace('<!-- PAGE_METADATA -->', '<title>WordsCut</title><meta name="robots" content="noindex">'))
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.values(pageMetadata).map(meta => `<url><loc>${meta.canonical}</loc></url>`).join('')}</urlset>\n`)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\n`)
