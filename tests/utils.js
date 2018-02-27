import Differencify from 'differencify'
import devicesPreset from 'puppeteer/DeviceDescriptors'

const iPhone = devicesPreset['iPhone 6']
const iPad = devicesPreset['iPad']

export const browserLangs = [
  {
    evaluate: () => {
      Object.defineProperty(navigator, "languages", {
        get: function () {
          return ["en-US", "en", "bn"]
        }
      })
      Object.defineProperty(navigator, "language", {
        get: function () {
          return "en-US"
        }
      })
    },
    lang: 'en',
    headers: {
      'accept-language': 'en-US,en;q=0.8'
    },
  }, {
    evaluate: () => {
      Object.defineProperty(navigator, "languages", {
        get: function () {
          return ["zh-CN", "zh", "en", "zh-TW"]
        }
      })
      Object.defineProperty(navigator, "language", {
        get: function () {
          return "zh-CN"
        }
      })
    },
    lang: 'zh',
    headers: {
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7'
    },
  },
]

export const cookieLangs = [
  {
    lang: '',
    cookies: []
  }, {
    lang: 'en',
    cookies: [{
      name: "lang",
      value: "en",
      domain: "localhost",
      path: "/",
      expires: Math.floor(new Date() / 1000) + 60000,
    }]
  }, {
    lang: 'zh',
    cookies: [{
      name: "lang",
      value: "zh",
      domain: "localhost",
      path: "/",
      expires: Math.floor(new Date() / 1000) + 60000,
    }]
  }
]

export const devices = [
  {
    name: 'iphone',
    emulate: iPhone
  },
  {
    name: 'pc',
    emulate: {
      viewport: {
        width: 1920,
        height: 1080,
      },
      userAgent: "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
    }
  },
]

export const executablePath = `C:\\Users\\josh\\AppData\\Local\\Google\\Chrome SxS\\Application\\chrome.exe`

export const launch = async (testName) => {
  const differencify = new Differencify()
  const target = differencify.init({ testName, chain: false });
  const browser = await target.launch({
    executablePath,
    //devtools : true,
  })
  return { browser, target, differencify }
}