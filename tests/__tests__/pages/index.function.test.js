import { browserLangs, cookieLangs, devices, launch } from '../../utils'
const webhost = process.env.WEBHOST || 'localhost'

describe('index-function', () => {
  const enBrowser = browserLangs.find((x) => x.lang = 'en')
  let lastBrowser
  it('change-language', async () => {
    const { browser, differencify } = await launch()
    lastBrowser = browser
    const page = await browser.newPage()
    await page.evaluateOnNewDocument(enBrowser.evaluate)
    await page.setExtraHTTPHeaders(enBrowser.headers)
    console.log(`http://${webhost}?d=change-language`)
    await page.goto(`http://${webhost}?d=change-language`)

    await page.waitForFunction('document.title==`Home`', { timeout: 5000 })

    await page.click('select')
    await page.select('select', 'zh')
    await page.waitForFunction('document.title==`首页`', { timeout: 5000 })

    await page.close()
    await browser.close()
    await differencify.cleanup()
  }, 60000)
  afterEach(() => lastBrowser.close())
});