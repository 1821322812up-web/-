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
    await page.locator('#ending').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1800)
    const contact = await page.locator('.nico-ending__contacts').innerText()
    const text = await page.locator('body').innerText()
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    await page.screenshot({ path: `${dir}/${width}-ending.png` })
    const result = { width, status: response.status(), contact, noPublicPhone: !/15609867115|PHONE|WECHAT/i.test(text), overflow, errors }
    if (!result.noPublicPhone || overflow || errors.length || !contact.includes('1821322812@qq.com')) throw new Error(JSON.stringify(result))
    results.push(result)
    await page.close()
  }
  await writeFile(`${dir}/results.json`, JSON.stringify(results, null, 2))
  console.log(JSON.stringify(results))
} finally { await browser.close() }
