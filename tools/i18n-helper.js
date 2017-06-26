import Cookies from 'js-cookie'
import locale from 'locale'
import i18n from 'i18next'
import { translate } from 'react-i18next'

/**
 * 多国语言帮助类
 */
class I18nHelper {
  constructor(opt = {}) {
    const { 
      defaultLang = 'en', 
      supportLangs = ['en'], 
      langCookieName = 'lang',
      langCookieExpire = 365
    } = opt

    this.defaultLang = defaultLang
    this.supportLangs = supportLangs
    this.langCookieName = langCookieName
    this.langCookieExpire = langCookieExpire

    this.i18n = null
    this.currentLang = null
  }


  /**
   * 获取当前语言
   * @param {Request} req Request 对象来自express 
   */
  getCurrentLanguage(req) {
    var getCurrentLang = ()=>{
      //from cookie
      var fromCookie = req ? req.cookies[this.langCookieName] : Cookies.get(this.langCookieName)
      if (this.supportLangs.includes(fromCookie)) return fromCookie


      var supported = new locale.Locales(this.supportLangs, this.defaultLang)
      if (req) {
        var locales = new locale.Locales(req.headers["accept-language"])
        return locales.best(supported).language
      } else {
        var locales = new locale.Locales(navigator.language || navigator.userLanguage)
        return locales.best(supported).language
      }
    }
    
    !this.currentLang && (this.currentLang = getCurrentLang())
    
    return this.currentLang
  }

  /**
   * 设置cookie（只会在客户端发生）
   * @param {string} lang 
   */
  setCurrentLanguage(lang) {
    Cookies.set(this.langCookieName, { expires: this.langCookieExpire })
    this.currentLang = lang
    this.i18n.setLng(lang)
  }

  /**
   * 清除cookie
   */
  clearCurrentLanguage() {
    Cookies.remove(this.langCookieName)
    this.currentLang = null
  }  

  getI18n(translationData){
    var that = this
    if(!this.i18n){
      var ns = ['common']
      translationData && translationData[this.currentLang] && (ns = Object.keys(translationData[this.currentLang]))

      this.i18n = i18n.init({
        lng: that.getCurrentLanguage(), // active language http://i18next.com/translate/
        fallbackLng: that.defaultLang,
        resources: translationData,
        ns,
        defaultNS: 'common',
        debug: false
      })
    }
    return this.i18n
  }

  /**
   * 获取翻译
   * 
   * @param {any} str 
   * @param {string} [ns='common'] 
   * @memberof I18nHelper
   * @return {Component} react
   */
  t(str,data){
    return this.i18n.t(str,data)
  }

  getFixedT(ns){
    return this.i18n.getFixedT(this.getCurrentLanguage(),ns)
  }
}

export default new I18nHelper({
  supportLangs: ['en','zh']
})