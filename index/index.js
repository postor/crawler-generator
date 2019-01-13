const $ = require('jquery')

$(document).ready(() => {
  const $url = $('#url')
  const $go = $('#go')
  const $web = $('#web')

  $web[0].addEventListener('ipc-message', event => {
    // prints "ping"
    console.log(event)
  })

  $web[0].addEventListener('did-stop-loading', ()=>{
    $web[0].executeJavaScript('pingHost("ping",{a:1})')
  })
})
