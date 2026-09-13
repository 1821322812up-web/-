import {chromium} from '../.design-tools/.shared/visual-runtime/node_modules/playwright/index.mjs'
import {writeFile} from 'node:fs/promises'
const b=await chromium.launch({headless:true,channel:'msedge'}),results=[]
try{const p=await b.newPage();await p.goto('http://localhost:4173/');await p.locator('#hero[data-ready=true]').waitFor();await p.locator('.floating-company').first().scrollIntoViewIfNeeded();await p.waitForTimeout(700);await p.locator('.floating-company').first().click();await p.waitForTimeout(500)
for(let i=0;i<5;i++){const link=p.locator('.work-case a:not(.work-case__cover)').nth(i),expected=await link.getAttribute('href');const opened=p.waitForEvent('popup');await link.click();const tab=await opened;let navigation='started';try{await tab.waitForURL(u=>u.href.startsWith('https://'),{waitUntil:'commit',timeout:15000})}catch(e){navigation=e.message.split('\n')[0]};results.push({expected,actual:tab.url(),navigation,newTab:true});await tab.close()}
await writeFile('docs/qa/release/link-results.json',JSON.stringify(results,null,2));console.log(results)}finally{await b.close()}
