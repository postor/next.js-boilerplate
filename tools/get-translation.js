import path from 'path'
import loadJsonFile from 'load-json-file'
import apiUrls from './api-urls'
import i18nHelper from './i18n-helper'
import fetch from './fetch'
/**
 * 
 * @param {string} lang 目标语言
 * @param {string|string[]} files translate filepath
 * @param {Request} req Request 对象来自express
 * @return {i18n}  
 */
export default async function getTranslation(lang, files, req) {
  
  const baseUrl = '/static/locales'
  if(!Array.isArray(files)) files = [files]

  var langData = {}
  await Promise.all(files.map((file)=>{     
    return fetch(apiUrls(`${baseUrl}/${lang}/${file}.json`,req),{},req)
    .then(r=>r.json())
    .then((obj)=>{
      langData[file] = obj
    })
    
  }))

  return {
    [lang]: langData
  }
}