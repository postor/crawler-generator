const finder = require('@medv/finder').default

// 定义通知主窗口的函数
pingHost = (channel, args) => {
  console.log('CRAWLER_GENERATOR_SELECTOR:' + channel)
}

// 页面加载后
document.addEventListener("DOMContentLoaded", function (event) {
  let cur // 当前选择元素
  document.addEventListener('click', function (event) {
    if (!cur) { // 尚未选择元素
      cur = event.target // 赋值当前元素
      highlight(cur) // 当前元素高亮
      return
    }
    // 已经选了当前元素
    if (event.target == cur) { // 重复点击同一个元素表示生成代码
      offHighlight(cur) // 去掉高亮
      pingHost(finder(cur)) // 获取DOM路径并通知给主窗口
      cur = undefined
      return
    }
    // 换元素
    offHighlight(cur) // 去掉旧元素高亮
    cur = event.target // 变更当前选择
    highlight(cur) // 新元素高亮
  })


  function highlight(el) {
    el.setAttribute('data-style', el.getAttribute('style') || '')
    el.setAttribute('style', el.getAttribute('style') + ';border: 1px solid red;')
  }

  function offHighlight(el) {
    el.setAttribute('style', el.getAttribute('data-style'))
  }
});
