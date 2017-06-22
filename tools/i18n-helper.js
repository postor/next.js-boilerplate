import Cookies from 'js-cookie'
import locale from 'locale'
import fetch from './fetch'
import apiUrls from './api-urls'
/**
 * 多国语言帮助类
 */
export default class I18nHelper {
  constructor(opt = {}) {
    const { 
      defaultLang = 'en', 
      supportLangs = ['en'], 
      langCookieName = 'lang',
      langCookieExpire = 365, 
      translateBaseUrl = '/', 
      translateIncludeFiles = ['common'] 
    } = opt

    this.defaultLang = defaultLang
    this.supportLangs = supportLangs
    this.langCookieName = langCookieName
    this.langCookieExpire = langCookieExpire
    this.translateBaseUrl = translateBaseUrl
    this.translateIncludeFiles = translateIncludeFiles
  }


  /**
   * 获取当前语言
   * @param {Request} req Request 对象来自express 
   */
  getCurrentLanguage(req) {
    //from cookie
    var fromCookie = req ? req.cookies[this.langCookieName] : Cookies.get(this.langCookieName)
    if (this.supportLangs.includes(fromCookie)) return fromCookie


    var supported = new locale.Locales(this.supportLangs, this.defaultLang)
    if (req) {
      var locales = new locale.Locales(req.headers["accept-language"])
      return locales.best(supported)
    } else {
      var locales = new locale.Locales(navigator.language || navigator.userLanguage)
      return locales.best(supported)
    }
  }

  /**
   * 设置cookie
   * @param {string} lang 
   */
  setCurrentLanguage(lang) {
    Cookies.set(this.langCookieName, { expires: this.langCookieExpire })
  }

  /**
   * 清除cookie
   */
  clearCurrentLanguage() {
    Cookies.remove(this.langCookieName)
  }

  /**
   * 
   * @param {Request} req Request 对象来自express
   * @param {string} page translate filepath
   * @return {i18n}  
   */
  async getTranslation(req, page) {
    const lang = this.getCurrentLanguage(req)
    const response = await fetch(this.getTranslationPath(lang,page))
    const json = await response.json()

    return {
      [lang]: {
        [file]: json
      }
    }
  }

  getTranslationPath(lang,page) {
    const baseUrl = apiUrl(`${this.translateBaseUrl}${lang}/${page}.json`)

  }
}