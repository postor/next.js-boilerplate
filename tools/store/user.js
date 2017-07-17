import fetch from '../fetch'
import { fetchJSON } from './json'

export const actionTypes = {
  login: 'login',
  logout: 'logout',
}

export const reducer = {
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
      return dispatch({
        type: actionTypes.login,
        user
      })
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
        return Promise.reject(result.error)
      }
      return dispatch({
        type: actionTypes.logout
      })
    })
}

export const getUser = (contextFetch, store) => fetchJSON('/api/auth', 'user', contextFetch, store)


// reducer
function loginReducer(state = {}, action) {
  var user = Object.assign(action.user, { isGuest: false })
  return Object.assign({}, state, { user })
}



// reducer
function logoutReducer(state = {}) {
  return Object.assign({}, state, { user: { isGuest: true } })
}