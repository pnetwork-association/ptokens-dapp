import { createStore, applyMiddleware, compose } from 'redux'
import { middleware } from '../middleware'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import walletsReducer from './wallets/wallets.reducer'
import swapReducer from './swap/swap.reducer'
import pagesReducer from './pages/pages.reducer'
import nftsReducer from './nfts/nfts.reducer'

const rootReducer = combineReducers({
  wallets: walletsReducer,
  swap: swapReducer,
  pages: pagesReducer,
  nfts: nftsReducer,
  toastr: toastrReducer
})

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(middleware, thunk)))

export default store
