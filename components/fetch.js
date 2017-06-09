
import fetch from 'isomorphic-unfetch'

export default (url, option, req, res) => {
  option = option || {}
  option.credentials = 'include',
  option.headers = Object.assign(option.headers||{}, {
    'Cookie': req ? req.headers.cookie : document.cookie
  })

  return fetch(url, option)
  .then((r)=>{    
    var setCookie = req?r.headers._headers['custom-set-header']:r.headers.get('custom-set-header')
    if(req && res){
      //server side 
      console.log('setcookie:'+setCookie)
      res.header('set-cookie', setCookie)
    }else{
      //client side
      document.cookie = setCookie
    }
    
    return r
  })
}