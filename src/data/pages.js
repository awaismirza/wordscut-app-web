import { wordsCut } from './product-sites/wordsCut.js'

export const domain = (import.meta.env?.VITE_SITE_URL || globalThis.process?.env?.VITE_SITE_URL || 'https://awaismirza.github.io/wordscut-app-web').replace(/\/$/, '')
export const pageMetadata = Object.fromEntries([
  ['/', 'WordsCut — Edit the words. Shape the video.', wordsCut.seoDescription],
  ['/privacy', 'WordsCut — Privacy Policy', wordsCut.privacy.seoDescription],
  ['/terms', 'WordsCut — Terms & Conditions', wordsCut.terms.seoDescription],
  ['/support', 'WordsCut — Support', 'Get help with WordsCut for Mac, release questions and earlier-version source requests.'],
].map(([path, title, description]) => [path, {
  title, description, canonical: `${domain}${path}`, image: `${domain}/wordscut/social-preview.png`,
}]))
