import update from 'react/lib/update'
import { bindActionCreators } from 'redux'

import fetch from '../fetch'


export const actionTypes = {
  SET_JSON:'SET_JSON',
}


// REDUCERS
export const reducer = {
  [actionTypes.SET_JSON]: (state = {}, action) => {
    if(!action.path) return action.json
    
    var toMerge = pathMerge({},action.path,action.json)
      return update(state, toMerge)
  },
}

// ACTIONS
export const fetchJSON = (url, path, fetchMethod = fetch, store = false, forceLoad = false) => async (dispatch) => {
  if(forceLoad || checkNeedLoad(store, path)){    
    var r = await fetchMethod(url)
    var json = await r.json()
    return dispatch({
      type: actionTypes.SET_JSON,
      path,
      json,
    })
  }
  return false
}

// ACTIONS
export const setJSON = (json, path) => {
  return {
    type: actionTypes.SET_JSON,
    path,
    json,
  }
}


/**
 * 按路径合入数据 
 * 
 * @param {any} obj 
 * @param {any} pathStr 
 * @param {any} toMerge 
 * @returns 
 */
function pathMerge(obj, pathStr, toMerge) {
  const pathArr = pathStr.split('.')
  const lastPath = pathArr.pop()
  const lastBranch = pathArr.reduce((o, p) => {
    !o[p] && (o[p] = {})
    return o[p]
  }, obj)
  lastBranch[lastPath] = {$set:toMerge}
  return obj
}

/**
 * 检查对象路径是否存在
 *  
 * @param {any} obj 
 * @param {any} pathStr 
 * @returns 
 */
function pathExists(obj,pathStr){
  const pathArr = pathStr.split('.')
  var tmp = obj
  return pathArr.every((p) => {
    if(typeof tmp[p] === 'undefined') return false
    tmp = tmp[p]
    return true
  })
}

/**
 * 检查是否需要重新加载
 * 
 * @param {any} store 
 * @param {any} path 
 * @returns 
 */
function checkNeedLoad(store, path) {
  if (!store) return true  
  const state = store.getState()
  return !pathExists(state,path)

}