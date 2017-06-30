import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {reducer as json} from './json'
import {reducer as user} from './user'

const reducers = {
  ...json,
  ...user,
}

// REDUCERS
export const reducer = (state = {}, action) => {
  if (reducers[action.type]) return reducers[action.type](state, action)
  return state
}


// init
export const initStore = (initialState = {}) => {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
}
