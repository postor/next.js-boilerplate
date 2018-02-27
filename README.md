# nextjs-boilerplate

demo:  http://nextjs.i18ntech.com/ （with bootstrap https://github.com/nextjs-boilerplate/bootstrap ）

包含内容 include:

- i18next
- redux
- eslint
- csrf，更好的安全性
- next-routers, 更好看的url，服务端和客户端同时使用同一个route配置
- 导航条组件， 自动判断所处的页面，支持定制逻辑
- http2支持，更好的性能
- cookie透传，更好的安全性，能够在服务端渲染的时候处理接口的cookie设置

----

- i18next
- redux
- eslint
- csrf protect, better security
- next-routes, pritty url, route define for both server side and client side
- navigation component, auto highlite current link
- http2 support, better performance
- cookie pass through, better security, cookie handle for server side rendering 

如果需要一个jwt的版本，可以参考 https://github.com/nextjs-boilerplate/next-express-redux-i18n 

if you want jwt version, refer https://github.com/nextjs-boilerplate/next-express-redux-i18n 

## 为什么要做这个项目 Why need this project?

多国语言和reudx，这东西在React上应该是标配了，我们却还总是需要去单独集成他们，eslint代码规范也是很必要的，还有新潮一点的http2

I18n and Redux should be standard for React, still we need to apply using them for every project, and eslint for code smell, and http2 for future

安全，当所有的逻辑客户端都可以看到（即使你混淆了代码），服务端客户端一套代码让我们更容易维护逻辑，同时，作弊也变得更容易。你的关键接口必须和身份验证紧密合作，才能保证数据安全，csrf+Cookie/csrf+token是最基本最易于定制的身份凭据。

Security, now all your logic are available by the browser (even if you use uglify), one logic for both server side and browser make your easier to maintain your logic while cheating become more easier. You must keep your data api work with user identity closely, to make your data safe, csrf+Cookie/csrf+token is the most basical and efficient way.


## 迁出代码、安装依赖、启动服务 git\install\start

```
git checkout https://github.com/postor/nextjs-cookie-example.git
cd nextjs-cookie-example
npm install
node server.js
```

## 测试 test

- unit 单元测试 [code](./tests/__tests__/tools/i18n-helper.unit.test.js)
- react snap 渲染html代码对比测试 [code](./tests/__tests__/pages/jest.test.js)
- visual 显示截图对比测试 [code](./tests/__tests__/pages/index.visual.test.js)
- functional 功能性测试 [code](./tests/__tests__/pages/index.function.test.js)

```
yarn test
```

显示测试在第一次运行时只会生成对应截图，不进行比对

visual test will only generate screenshots for the first time


你需要根据你的环境配置puppeteer，可以调整[package.json](./package.json)中的`scripts.jest`配置 和 [tests/utils.js](./tests/utils.js)中的`launch`函数

you need to config puppeteer according to your env, in [package.json](./package.json) you can modify `scripts.jest` and in [tests/utils.js](./tests/utils.js) modify `launch` function