import getFetch from 'next-fetch'
const cookieFetch = getFetch()

/**
 * 加载本地资源
 * 
 * @export
 * @param {any} url 
 * @param {any} option 
 * @param {any} req 
 * @param {any} res 
 * @returns 
 */
export default function fetch(url,option,req,res){
  return cookieFetch(apiUrls(url, req), option, req, res)
}

/**
 * 获取绑定的fetch
 * 
 * @export
 * @param {any} { req, res } 
 * @returns 
 */
export function getContextedFetch({ req, res }) {
  return ((req, res, url, option) => {
    return fetch(url, option, req, res)
  }).bind(null, req, res)
}

export function apiUrls(path, req) {
  return req ? req.protocol + '://' + req.get('host') + path : path
}