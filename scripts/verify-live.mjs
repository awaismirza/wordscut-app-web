import {chromium} from 'playwright'
import assert from 'node:assert/strict'
import {mkdir,writeFile} from 'node:fs/promises'
const base='https://awaismirza.github.io/wordscut-app-web'
const browser=await chromium.launch({channel:'chrome',headless:true})
const errors=[];const results=[]
try {
 for(const width of [390,1440]) {
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'})
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
  await page.goto(base+'/',{waitUntil:'networkidle'})
  assert.match(await page.locator('h1').innerText(),/Edit the words/)
  assert.equal(await page.locator('html').evaluate(e=>e.scrollWidth<=innerWidth),true)
  assert.equal(await page.locator('link[rel=canonical]').count(),1)
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),base+'/')
  await page.locator('.wc-hero-image button').click()
  assert.equal(await page.locator('dialog').evaluate(d=>d.open),true)
  await page.getByRole('button',{name:'View actual size'}).click()
  await page.keyboard.press('Escape')
  for(const image of await page.locator('.wc-landing >section img').all()) {
   await image.scrollIntoViewIfNeeded()
   await image.evaluate(i=>i.complete?Promise.resolve():new Promise((resolve,reject)=>{i.addEventListener('load',resolve,{once:true});i.addEventListener('error',reject,{once:true})}))
   assert.ok(await image.evaluate(i=>i.naturalWidth>0))
  }
  await page.evaluate(()=>scrollTo(0,0))
  await mkdir('docs/qa/live',{recursive:true})
  await page.screenshot({path:`docs/qa/live/hero-${width}.png`})
  results.push({width,overflow:false,images:'loaded',gallery:'pass',canonical:'pass'})
  await page.close()
 }
 const page=await browser.newPage()
 for(const route of ['privacy','terms','support']) {
  const response=await page.goto(`${base}/${route}/`,{waitUntil:'networkidle'})
  assert.equal(response.status(),200)
  assert.ok(await page.locator('h1').isVisible())
  assert.equal(await page.locator('link[rel=canonical]').count(),1)
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),`${base}/${route}`)
 }
 await page.goto(base+'/terms/',{waitUntil:'networkidle'})
 const license=page.getByRole('link',{name:'AGPL-3.0-or-later'})
 assert.equal(await license.getAttribute('href'),'/wordscut-app-web/wordscut/legacy-AGPL-3.0.txt')
 const licenseResponse=await page.request.get(base+'/wordscut/legacy-AGPL-3.0.txt')
 assert.equal(licenseResponse.status(),200)
 assert.deepEqual(errors,[])
 await writeFile('docs/qa/live/results.json',JSON.stringify({url:base+'/',results,legal:'all 200',legacyLicense:'200',errors},null,2))
 console.log('PASS: live desktop/mobile, all images, gallery, canonical metadata, legal/support and licence; no console errors.')
} finally {await browser.close()}
