const $ = require('jquery')
const { clipboard } = require('electron')
const getCode = require('./get-code')

$(document).ready(() => {
  const $url = $('#url')
  const $go = $('#go')
  const $web = $('#web')
  const $code = $('#code')
  // 收到webview消息更新代码
  $web[0].addEventListener('console-message', ({ message = '' }) => {
    const match = 'CRAWLER_GENERATOR_SELECTOR:'
    if (!message.startsWith(match)) return
    const code = getCode($url.val(), message.substr(match.length))
    $code.text(code)
    clipboard.writeText(code)
    alert('Code has been copied to your clipboard!')
  })
  // $web[0].addEventListener('did-stop-loading', () => {
  //   $web[0].openDevTools()
  // })
  $url.on('keyup', function (e) {
    if (e.keyCode === 13) {
      // Do something
      $go.click()
    }
  })
  // 页面跳转
  $go.click(() => {
    console.log('go?')
    $web[0].src = $url.val()
  })


})
