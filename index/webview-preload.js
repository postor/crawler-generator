const $ = require('jquery')
const { ipcRenderer } = require('electron')

window.pingHost = (channel, args) => {
  ipcRenderer.sendToHost(channel, args)
}

$(document).ready(() => {
  let cur;
  $(document).on("mouseenter", "*", function (e) {
    if (!cur) {
      highlight(cur)
      return
    }

    if(cur === e.target){
      return
    }

    offHighlight(cur)
    cur = e.target
    highlight(cur)
  })

  $(document).on("click", "*", function (e) {
    
  })

  function highlight(el) {
    $(el).css({
      border: '1px solid red'
    })
  }

  function offHighlight(el) {
    $(el).attr('style', '')
  }
})