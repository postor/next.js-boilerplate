import { browserLangs, cookieLangs, devices, launch } from '../../utils'
import { inspect } from 'util'
const webhost = process.env.WEBHOST || 'http://localhost'

describe('index-differencify', () => {
  let done = false
  let lastBrowser
  devices.forEach((device) => {
    browserLangs.forEach((browserLang) => {
      cookieLangs.forEach((cookieLang) => {
        const d = `${device.name}-browser-${browserLang.lang}-cookie-${cookieLang.lang}`
        it(d, async () => {
          const { browser, target, differencify } = await launch(d)
          lastBrowser = browser
          const page = await browser.newPage()
          await page.emulate(device.emulate)
          await page.setCookie(...cookieLang.cookies)
          await page.evaluateOnNewDocument(browserLang.evaluate)
          await page.setExtraHTTPHeaders(browserLang.headers)
          await page.goto(`http://${webhost}?d=${d}`)
          const image = await page.screenshot()
          const result = await target.toMatchSnapshot(image)
          expect(result).toBe(true)
          await page.close()
          await browser.close()
          await differencify.cleanup()
        }, 60000)
      })
    })
  })
  afterEach(() => lastBrowser.close())
});
