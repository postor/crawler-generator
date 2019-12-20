const puppeteer = require('puppeteer')
const RETRY_LIMIT = 5
const WAIT_SELECTOR_TIME = 10000
const WAIT_CONTENT_TIME = 10000
  ;
(async () => {
  const selector = `##REPLACE_WITH_VARIBLE:selector##`
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto(`##REPLACE_WITH_VARIBLE:url##`)
  let tryTimes = 0
  while (true) {
    tryTimes++
    if (tryTimes > RETRY_LIMIT) {
      console.log(`reach max retry limit (${RETRY_LIMIT}), exiting`)
      break
    }
    try {
      await page.waitForSelector(selector, { timeout: WAIT_SELECTOR_TIME })
      let text = await getText(WAIT_CONTENT_TIME)
      if (!text) {
        console.log(`after wait for ${WAIT_CONTENT_TIME}ms, it's still empty!`, text)
        break
      }
      console.log(`found result: ${text}`)
      break
    } catch (e) {
      console.log(`error happen, retry`, e)
    }
  }

  await browser.close();

  async function getText(wait = WAIT_CONTENT_TIME) {
    let text, start = new Date
    while (true) {
      const $el = await page.$(selector)
      await page.evaluate(el => el.style.border = "1px solid red", $el)
      text = await page.evaluate(el => el.textContent, $el)
      // console.log(text)
      if (text && !/$\S*^/.test(text + '')) return text
      if (new Date() - start > wait) break
    }
    return text
  }

})()