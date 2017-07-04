import reduxHelper from 'next.js-redux-helper'
import wrapper from 'next.js-redux-helper/dest/wrapper'
import { reducer as json } from './json'
import { reducer as user } from './user'

const reducers = {
  ...json,
  ...user,
}

var initialState = {}
if (typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  initialState = window.__REDUX_DEVTOOLS_EXTENSION__()
}
/**
 * get initStore function
 */
const initStore = reduxHelper(reducers, initialState)
export default initStore

export const reduxWrapper = wrapper(initStore)