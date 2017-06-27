import Cookies from 'js-cookie'
import locale from 'locale'
import i18n from 'i18next'
import { translate } from 'react-i18next'
import XHR from 'i18next-xhr-backend'

/**
 * 多国语言帮助类
 */
class I18nHelper {
  constructor(opt = {}) {
    const { 
      defaultLang = 'en', 
      supportLangs = ['en'], 
      langCookieName = 'lang',
      langCookieExpire = 365, 
      i18nXHROption =  {
        loadPath: '/static/locales/{{lng}}/{{ns}}.json',
        addPath: '/static/locales/{{lng}}/{{ns}}.json',
      },
    } = opt

    this.defaultLang = defaultLang
    this.supportLangs = supportLangs
    this.langCookieName = langCookieName
    this.langCookieExpire = langCookieExpire
    this.i18nXHROption = i18nXHROption
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
      console.log(fromCookie)
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
    
    (req || !this.currentLang) && (this.currentLang = getCurrentLang())
    console.log([!!req,this.currentLang])
    return this.currentLang
  }

  /**
   * 设置cookie（只会在客户端发生）
   * @param {string} lang 
   * @param {instance of I18n} i18n
   * @param {Object} langData
   */
  setCurrentLanguage(lang, i18n) {
    if(typeof window === 'undefined') return
    Cookies.set(this.langCookieName, lang, { expires: this.langCookieExpire })
    this.i18n.changeLanguage(lang)
    this.currentLang = lang
  }

  /**
   * 清除cookie
   */
  clearCurrentLanguage() {
    Cookies.remove(this.langCookieName)
    this.currentLang = null
  }  

  getI18n(translationData){
    const that = this
    const isServerSide = (typeof window === 'undefined')
    if(isServerSide) return innerGetI18n()

    if(this.i18n) return this.i18n

    this.i18n = innerGetI18n()
    return this.i18n

    function innerGetI18n(){
      console.log('new i18n')
      var ns = ['common']
      translationData && translationData[that.currentLang] && (ns = Object.keys(translationData[that.currentLang])) 
      var options = {
        lng: that.getCurrentLanguage(), // active language http://i18next.com/translate/
        fallbackLng: that.defaultLang,
        resources: isServerSide?translationData:undefined,
        ns,
        defaultNS: 'common',
        debug: true,
        initImmediate: isServerSide,
      }

      var i18nInstance = i18n
      .use(XHR)
      .init(
        {
          ...options,
          backend: that.i18nXHROption
        }
      )

      translationData && Object.keys(translationData).forEach((lang)=>{
        Object.keys(translationData[lang]).forEach((ns)=>{          
          i18nInstance.addResourceBundle(lang,ns,translationData[lang][ns])
        })
      })

      return i18nInstance
    }
    
  }
}

export default new I18nHelper({
  supportLangs: ['en','zh']
})