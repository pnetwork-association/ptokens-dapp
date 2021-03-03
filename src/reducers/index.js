import { combineReducers } from 'redux'
import pNetworkReducer from './pNetwork'
import walletsReducer from './wallets'
import swapReducer from './swap'
import pagesReducer from './pages'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  wallets: walletsReducer,
  pNetwork: pNetworkReducer,
  swap: swapReducer,
  pages: pagesReducer,
  toastr: toastrReducer
})

export default rootReducer
