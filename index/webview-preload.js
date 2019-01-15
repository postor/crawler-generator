const { ipcRenderer } = require('electron')
window.pingHost = (channel, args) => {
  ipcRenderer.sendToHost(channel, args)
}

document.addEventListener("DOMContentLoaded", function (event) {
  let cur
  document.addEventListener('click', function (event) {
    if (!cur) {
      cur = event.target
      highlight(cur)
      return
    }

    if (event.target == cur) {
      offHighlight(cur)
      window.pingHost(getDomPath(cur))
      cur = undefined
      return
    }

    offHighlight(cur)
    cur = event.target
    highlight(cur)
  })


  function highlight(el) {
    el.setAttribute('data-style', el.getAttribute('style') || '')
    el.setAttribute('style', el.getAttribute('style') + ';border: 1px solid red;')
  }

  function offHighlight(el) {
    el.setAttribute('style', el.getAttribute('data-style'))
  }

  function getDomPath(el) {
    var stack = [];
    while ( el.parentNode != null ) {
      console.log(el.nodeName);
      var sibCount = 0;
      var sibIndex = 0;
      for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
        var sib = el.parentNode.childNodes[i];
        if ( sib.nodeName == el.nodeName ) {
          if ( sib === el ) {
            sibIndex = sibCount;
          }
          sibCount++;
        }
      }
      if ( el.hasAttribute('id') && el.id != '' ) {
        stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
      } else if ( sibCount > 1 ) {
        stack.unshift(el.nodeName.toLowerCase() + ':nth-child(' + (sibIndex+1) + ')');
      } else {
        stack.unshift(el.nodeName.toLowerCase());
      }
      el = el.parentNode;
    }
    return stack.slice(1).join(' > '); // removes the html element
  }
});