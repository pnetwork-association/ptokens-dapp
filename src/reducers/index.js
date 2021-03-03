import { combineReducers } from 'redux'
import pNetworkReducer from './pNetwork'
import walletsReducer from './wallets'
import swapReducer from './swap'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  wallets: walletsReducer,
  pNetwork: pNetworkReducer,
  swap: swapReducer,
  toastr: toastrReducer
})

export default rootReducer
