import { bindActionCreators } from 'redux'
import fetch from '../fetch'

export const actionTypes = {
  login: 'login',
  logout: 'logout',
}

export const reducers = {
  [actionTypes.login]: loginReducer,
  [actionTypes.logout]: logoutReducer,
}

/**
 * 登录
 * @param {*} username 
 * @param {*} passwd 
 */
export const login = (username, passwd) => dispatch => {
  var form = JSON.stringify({ username, passwd })

  return fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: form
  })
    .then(r => r.json())
    .then((user) => {
      if (user.error) {
        return Promise.reject(user.error)
      }
      return user
    })
    .then((user) => {
      dispatch({
        type: actionTypes.login,
        user
      })
      return true
    })
}


/**
 * 登出
 */
export const logout = () => dispatch => {
  return fetch('/api/logout')
    .then(r => r.json())
    .then((result) => {
      if (result.error) {
        return Promise.reject(user.error)
      }
      return true
    })
}

/**
 * 用于注册到
 * @param {*} dispatch 
 */
export const getRegister = (lastRegister)=> (dispatch) => {
  return {
    ...lastRegister?lastRegister(dispatch):{},
    login: bindActionCreators(login, dispatch),
    logout: bindActionCreators(logout, dispatch)
  }
}



// reducer
function loginReducer(state = {}, action) {
  var user = Object.assign(action.user, { isGuest: false })
  return Object.assign(state, { user })
}



// reducer
function logoutReducer(state = {}, action) {
  return Object.assign(state, { user: { isGuest: true } })
}