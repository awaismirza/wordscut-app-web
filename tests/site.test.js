import assert from 'node:assert/strict'
import test from 'node:test'
import { existsSync, readFileSync } from 'node:fs'
import { wordsCut } from '../src/data/product-sites/wordsCut.js'
import { pageMetadata } from '../src/data/pages.js'

test('WordsCut owns root, legal and support URLs at the current Pages address', () => {
  for (const path of ['/', '/privacy', '/terms', '/support']) {
    assert.equal(pageMetadata[path].canonical, `https://awaismirza.github.io/wordscut-app-web${path}`)
    assert.match(pageMetadata[path].title, /WordsCut/)
    assert.match(pageMetadata[path].image, /^https:\/\/awaismirza\.github\.io\/wordscut-app-web\//)
  }
  assert.equal(existsSync('public/CNAME'),false, 'DNS is deferred; do not redirect the working Pages address')
})

test('native captures retain privacy-reviewed provenance and working asset paths', () => {
  const manifest = JSON.parse(readFileSync('public/wordscut/screenshots/manifest.json'))
  for (const shot of wordsCut.screenshots) {
    assert.ok(existsSync(`public${shot.src}`))
    const record = manifest.screenshots.find(item => shot.src.endsWith(item.filename))
    assert.equal(record.privacyReview, 'passed')
    assert.equal(record.capture, 'fresh native app')
    assert.equal(record.width, shot.width)
    assert.equal(record.height, shot.height)
  }
})

test('unreleased availability, legacy rights and honest capture limitations survive the move', () => {
  assert.match(wordsCut.download.url,/^mailto:/)
  assert.doesNotMatch(wordsCut.download.label,/buy|download/i)
  assert.match(wordsCut.terms.sections[0].blocks[0].p,/does not revoke those rights/)
  assert.match(wordsCut.screenshots.find(s=>s.id==='camera').caption,/did not render/)
  assert.match(wordsCut.screenshots.find(s=>s.id==='recording').caption,/fallback/)
})
