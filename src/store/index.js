import { createStore, applyMiddleware, compose } from 'redux'
import { middleware } from '../middleware'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import pNetworkReducer from './pNetwork/pnetwork.reducer'
import walletsReducer from './wallets/wallets.reducer'
import swapReducer from './swap/swap.reducer'
import pagesReducer from './pages/pages.reducer'

const rootReducer = combineReducers({
  wallets: walletsReducer,
  pNetwork: pNetworkReducer,
  swap: swapReducer,
  pages: pagesReducer,
  toastr: toastrReducer
})

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(middleware, thunk)))

export default store
