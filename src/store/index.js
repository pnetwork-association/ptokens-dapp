import { reducer as toastrReducer } from 'react-redux-toastr'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { middleware } from '../middleware'

import migrationReducer from './migration/migration.reducer'
import nftsReducer from './nfts/nfts.reducer'
import pagesReducer from './pages/pages.reducer'
import swapReducer from './swap/swap.reducer'
import swapOldPntReducer from './swap-old-pnt/swap-old-pnt.reducer'
import walletsReducer from './wallets/wallets.reducer'

const rootReducer = combineReducers({
  migration: migrationReducer,
  wallets: walletsReducer,
  swap: swapReducer,
  swapOldPnt: swapOldPntReducer,
  pages: pagesReducer,
  nfts: nftsReducer,
  toastr: toastrReducer,
})

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(middleware, thunk)))

export default store
