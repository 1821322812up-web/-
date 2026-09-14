import { chromium } from '../.design-tools/.shared/visual-runtime/node_modules/playwright/index.mjs'
import { mkdir, writeFile } from 'node:fs/promises'
const base = process.env.QA_URL || 'http://localhost:4173/'
const dir = 'docs/qa/privacy'
await mkdir(dir, { recursive: true })
const browser = await chromium.launch({ headless: true, channel: 'msedge' })
const results = []
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 } })
    const errors = []
    page.on('pageerror', e => errors.push(e.message))
    const response = await page.goto(base)
    await page.locator('#hero[data-ready=true]').waitFor()
    await page.locator('.floating-company').first().scrollIntoViewIfNeeded()
    await page.locator('.floating-company').first().click()
    const covers = []
    for (let i = 0; i < 5; i++) {
      await page.locator('.work-case__cover').nth(i).scrollIntoViewIfNeeded()
      await page.locator('.work-case__thumbnail').nth(i).evaluate(image => image.decode())
      covers.push(await page.locator('.work-case__thumbnail').nth(i).evaluate(image => image.naturalWidth > 0))
    }
    const modalOverflow = await page.locator('dialog').evaluate(element => element.scrollWidth > element.clientWidth)
    await page.locator('.experience-modal__close').click()
    await page.waitForTimeout(500)
    const bodyUnlocked = await page.evaluate(() => document.body.style.overflow !== 'hidden')
    await page.goto(`${base.replace(/\/$/, '')}/#ai-workflow`)
    await page.reload()
    await page.locator('#hero[data-ready=true]').waitFor()
    await page.locator('.ai-row').nth(1).scrollIntoViewIfNeeded()
    if (width > 700) await page.locator('.ai-row').nth(1).hover()
    await page.locator('#ending').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1800)
    const contact = await page.locator('.nico-ending__contacts').innerText()
    const text = await page.locator('body').innerText()
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    await page.screenshot({ path: `${dir}/${width}-ending.png` })
    const result = { width, status: response.status(), contact, noPublicPhone: !/15609867115|PHONE|WECHAT/i.test(text), overflow, covers, modalOverflow, bodyUnlocked, refreshedAnchor: page.url(), errors }
    if (!result.noPublicPhone || overflow || modalOverflow || !bodyUnlocked || covers.some(valid => !valid) || errors.length || !contact.includes('1821322812@qq.com')) throw new Error(JSON.stringify(result))
    results.push(result)
    await page.close()
  }
  await writeFile(`${dir}/results.json`, JSON.stringify(results, null, 2))
  console.log(JSON.stringify(results))
} finally { await browser.close() }
