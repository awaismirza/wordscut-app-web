import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.WORDSCUT_QA_URL || "http://127.0.0.1:5190/wordscut-app-web";
const out = "docs/qa/wordscut-marketing";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
const errors = [];
try {
  for (const theme of ["light", "dark"]) {
    for (const width of [390, 768, 1280, 1440, 1920]) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await page.addInitScript(
        (value) => localStorage.setItem("wordscut-theme", value),
        theme,
      );
      await page.goto(`${base}/`, {
        waitUntil: "networkidle",
      });
      assert.equal(
        await page.locator("h1").innerText(),
        "Edit the words.\nShape the video.",
      );
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(
        await page
          .locator("html")
          .evaluate((el) => el.scrollWidth <= innerWidth),
        true,
        `${width} overflow`,
      );
      await page.getByRole("button", { name: "Read. Select. Cut." }).click();
      assert.equal(
        await page
          .getByRole("button", { name: "Read. Select. Cut." })
          .getAttribute("aria-pressed"),
        "true",
      );
      const workflowControl = page.getByRole('button', { name: 'Read. Select. Cut.' });
      await page.keyboard.press('Tab');
      await workflowControl.focus();
      const focusContrast = await workflowControl.evaluate(element => {
        const style = getComputedStyle(element);
        const luminance = color => {
          const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(value => {
            const channel = value / 255;
            return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
          });
          return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
        };
        const foreground = luminance(style.outlineColor);
        const background = luminance(style.backgroundColor);
        return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
      });
      assert.ok(focusContrast >= 3, `Focus contrast ${focusContrast}`);
      const enlarge = page.locator("#wc-workflow-image button");
      await enlarge.click();
      assert.equal(
        await page.locator("dialog").evaluate((el) => el.open),
        true,
      );
      assert.equal(
        await page.locator("dialog :focus").getAttribute("aria-label"),
        "Close screenshot",
      );
      for (let i = 0; i < 4; i++) await page.keyboard.press("Tab");
      assert.equal(
        await page.locator("dialog :focus").count(),
        1,
        "focus remains in modal",
      );
      await page.getByRole("button", { name: "View actual size" }).click();
      assert.equal(
        await page
          .getByRole("button", { name: "Fit image" })
          .getAttribute("aria-pressed"),
        "true",
      );
      await page.keyboard.press("Escape");
      assert.equal(
        await page.locator("dialog").evaluate((el) => el.open),
        false,
      );
      assert.equal(
        await enlarge.evaluate((el) => el === document.activeElement),
        true,
        "focus returns to opener",
      );
      if (width < 768) {
        const menu = page.getByRole("button", { name: "Toggle navigation" });
        await menu.click();
        assert.equal(await menu.getAttribute("aria-expanded"), "true");
        await page
          .locator("#product-mobile-navigation")
          .getByRole("link", { name: "Overview", exact: true })
          .click();
        assert.equal(await menu.getAttribute("aria-expanded"), "false");
      }
      for (const image of await page.locator(".wc-landing > section img").all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(img => img.complete ? Promise.resolve() : new Promise((resolve, reject) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', reject, { once: true });
        }));
        try { await image.evaluate((img) => img.decode()); }
        catch { throw new Error(`Image failed: ${await image.getAttribute('src')}`); }
        assert.ok(
          await image.evaluate((img) => img.naturalWidth > 0),
          "image resolves",
        );
      }
      const headings = await page
        .locator(".wc-landing :is(h1,h2,h3)")
        .evaluateAll((elements) =>
          elements.map((el) => ({
            text: el.textContent,
            lines:
              el.getBoundingClientRect().height /
              parseFloat(getComputedStyle(el).lineHeight),
          })),
        );
      assert.ok(
        headings.every((h) => h.lines < 2.1),
        JSON.stringify(headings.filter((h) => h.lines >= 2.1)),
      );
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `${out}/${theme}-${width}-hero.png` });
      await page.screenshot({
        path: `${out}/${theme}-${width}-full.jpg`,
        fullPage: true,
        quality: 80,
      });
      if (width === 1440) {
        await page
          .locator(".wc-gallery")
          .screenshot({ path: `${out}/${theme}-gallery.jpg`, quality: 85 });
        await page.locator(".wc-gallery button").first().click();
        await page.screenshot({ path: `${out}/${theme}-gallery-open.png` });
        await page.keyboard.press("Escape");
      }
      const contact = page.locator(".wc-hero .wc-actions a").first();
      assert.match(await contact.getAttribute("href"), /^mailto:/);
      assert.doesNotMatch(await contact.innerText(), /buy|download/i);
      assert.equal(
        await page.locator("link[rel=canonical]").getAttribute("href"),
        "https://awaismirza.github.io/wordscut-app-web/",
      );
      assert.match(
        await page.locator('meta[property="og:image"]').getAttribute("content"),
        /wordscut\/social-preview.png$/,
      );
      assert.match(
        await page
          .locator('meta[name="twitter:image"]')
          .getAttribute("content"),
        /wordscut\/social-preview.png$/,
      );
      results.push({
        theme,
        width,
        overflow: false,
        images: "decoded",
        modal: "keyboard and focus pass",
        headings: "max two lines",
      });
      await page.close();
    }
  }
  const page = await browser.newPage();
  for (const suffix of ["", "/privacy", "/terms", "/support"]) {
    await page.goto(`${base}/products/yusafcut${suffix}`);
    await page.waitForURL(`${base}${suffix || '/'}`);
    assert.ok(await page.locator("h1").isVisible());
    const path = suffix || '/';
    assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://awaismirza.github.io/wordscut-app-web${path}`);
  }
  await page.goto(`${base}/terms`);
  assert.match(await page.locator('main').innerText(), /does not revoke those rights/);
  await page.close();
  assert.deepEqual(errors, []);
  await writeFile(
    `${out}/results.json`,
    JSON.stringify(
      {
        results,
        errors,
        aliases: "all four routes pass",
        legalPages: "privacy, terms and support pass",
        legacyRights: "preserved",
      },
      null,
      2,
    ),
  );
  console.log(
    `PASS: ${results.length} viewport/theme combinations; gallery, focus, navigation, images, headings, aliases, SEO and CTA; no console errors.`,
  );
} finally {
  await browser.close();
}
