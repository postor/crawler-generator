# crawler-generator | 爬虫生成器

wysiwyg crawaler generator using electron and puppeteer | 基于electron和puppeteer的所见即所得爬虫

[screenshot](./screenshot.gif)

## generate code | 生成爬虫代码

```
git clone https://github.com/postor/crawler-generator.git
cd crawler-generator
npm i
npm run start
```

- fill your url and go
- click on data which you want, it's border will turn red
- click on it again to confirm and generate code  


## use code | 使用代码

```
mkdir myapp
cd myapp
npm i puppeteer
vi test.js # copy code into test.js | 拷贝代码到test.js
node test.js

# data will log into console | 数据会被输出到控制台 
```