
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

export default (url, option, req, res) => {
  var oldCsrf = Cookies.get('csrftoken')

  option = option || {}
  option.credentials = 'include',
  option.headers = Object.assign({
    'Cookie': req ? req.headers.cookie : document.cookie,
    'csrf-token': oldCsrf,
    ...option.headers
  })

  return fetch(url, option)
  .then((r)=>{    
    //cookie
    var setCookie = req?r.headers._headers['custom-set-cookie']:r.headers.get('custom-set-cookie')
    if(req && res){
      //server side 
      setCookie && res.header('set-cookie', setCookie)
    }else{
      //client side
      setCookie && (document.cookie = setCookie)
    }
    
    //csrf
    var csrf = r.headers.get('csrf-token')
    if(res){
      //server side, cookie
      csrf && res.cookie('csrftoken', csrf)
    }else{
      //client side 
      csrf && Cookies.set('csrftoken', csrf)
    }
    
    return r
  })
}