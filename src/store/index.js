import { reducer as toastrReducer } from 'react-redux-toastr'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { middleware } from '../middleware'

import pagesReducer from './pages/pages.reducer'
import swapReducer from './swap/swap.reducer'
import walletsReducer from './wallets/wallets.reducer'

const rootReducer = combineReducers({
  wallets: walletsReducer,
  swap: swapReducer,
  pages: pagesReducer,
  toastr: toastrReducer,
})

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(middleware, thunk)))

export default store
