const $ = require('jquery')

$(document).ready(() => {
  const $url = $('#url')
  const $go = $('#go')
  const $web = $('#web')
  const $code = $('#code')

  $web[0].addEventListener('ipc-message', event => {
    // prints "ping"
    console.log(event)
    $code.text(getCode($url.val(),event.channel))
  })

  $web[0].addEventListener('did-stop-loading', ()=>{
    //$web[0].executeJavaScript('pingHost("ping",{a:1})')
  })

  $go.click(()=>{
    $web[0].src = $url.val()
  })

  
  function getCode(url,selector){
    return `
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()

  const page = await browser.newPage()
  await page.goto('${url}')

  await page.waitForSelector('${selector}')
  const $el = await page.$('${selector}')
  let text = await page.evaluate(el => el.textContent, $el)
  console.log(text)

  await browser.close();
})()
    `
  }

})
