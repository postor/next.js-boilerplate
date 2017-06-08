
import fetch from 'isomorphic-unfetch'

export default (url, option, req) => {
  option = option || {}
  option.headers = Object.assign(option.headers||{}, {
    'Cookie': req ? req.headers['Cookie'] : document.cookie
  })
  return fetch(url, option)
  .then(r=>r.json())
}