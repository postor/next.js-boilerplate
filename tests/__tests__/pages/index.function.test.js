import { browserLangs, cookieLangs, devices, launch } from '../../utils'

describe('index-function', () => {
  const enBrowser = browserLangs.find((x) => x.lang = 'en')
  let browsers = []
  it('change-language', async () => {
    const { browser, differencify } = await launch()
    browsers.push(browser)
    const page = await browser.newPage()
    await page.evaluateOnNewDocument(enBrowser.evaluate)
    await page.setExtraHTTPHeaders(enBrowser.headers)
    await page.goto(`http://localhost?d=change-language`)


    const enTitle = await page.title()
    expect(enTitle).toBe('Home')

    await page.click('select')
    await page.select('select', 'zh')
    await page.waitForFunction('document.title==`首页`', { timeout: 5000 })

    await page.close()
    await browser.close()
    await differencify.cleanup()
  }, 60000)
  
  afterAll(() => {
    browsers.forEach((x) => x.close())
  })
});