import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {reducer as json} from './json'
import {reducer as user} from './user'

const isServer = (typeof window ==='undefined')

const reducers = {
  ...json,
  ...user,
}

// REDUCERS
export const reducer = (state = {}, action) => {
  if (reducers[action.type]) return reducers[action.type](state, action)
  console.log('unhandled action:'+JSON.stringify(action))
  return state
}


// init
export const initStore = (initialState = {}) => {
  if(!isServer){
    initialState = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  }
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
}
