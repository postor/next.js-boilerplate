import path from 'path'
import i18nHelper from './i18n-helper'
import fetch from './fetch'
import cacheGet from './temp-cache'
/**
 * 
 * @param {string} lang 目标语言
 * @param {string|string[]} files translate filepath / namespaces / ns
 * @param {Request} req Request 对象来自express
 * @return {i18n}  
 */
export default async function getTranslation(lang, files, req) {

  if (!Array.isArray(files)) files = [files]

  var langData = {}
  await Promise.all(files.map(async (file) => {
    var getNS1 = () => getNS(lang, file, req)
    var json = await cacheGet(`translations.${lang}.${file}`, getNS1)
    langData[file] = json
    return true
  }))

  return {
    [lang]: langData
  }
}

async function getNS(lang, ns, req) {
  const baseUrl = '/static/locales'
  var r = await fetch(`${baseUrl}/${lang}/${ns}.json`, {}, req)
  var json = await r.json()
  return json
}