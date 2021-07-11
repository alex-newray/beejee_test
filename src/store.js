import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducer from './reducers'
import { defaultState } from './default'


const store = createStore(
  reducer,
  defaultState,
  applyMiddleware(thunkMiddleware),
)

if (process.env.NODE_ENV === 'development')
  window.store = store

export default store
