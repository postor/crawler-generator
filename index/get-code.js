const { readFileSync } = require('fs')
const { join } = require('path')
const template = readFileSync(join(__dirname, 'code.js'), 'utf-8')

module.exports = (url, selector) => {
  return template
    .replace(`##REPLACE_WITH_VARIBLE:selector##`, selector)
    .replace(`##REPLACE_WITH_VARIBLE:url##`, url)
}