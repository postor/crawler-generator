const $ = require('jquery')

$(document).ready(() => {
  const $url = $('#url')
  const $go = $('#go')
  const $web = $('#web')
  const $code = $('#code')
  // 收到webview消息更新代码
  $web[0].addEventListener('ipc-message', event => {
    $code.text(getCode($url.val(),event.channel))
  })  
  $web[0].addEventListener('did-stop-loading', ()=>{
    // $web[0].openDevTools()
  })
  // 页面跳转
  $go.click(()=>{
    $web[0].src = $url.val()
  })
  // 生成代码  
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
