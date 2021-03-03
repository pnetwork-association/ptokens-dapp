import { combineReducers } from 'redux'
import sidebarReducer from './sidebar'
import pNetworkReducer from './pNetwork'
import pTokensReducer from './pTokens'
import walletsReducer from './wallets'
import swapReducer from './swap'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  wallets: walletsReducer,
  pNetwork: pNetworkReducer,
  pTokens: pTokensReducer,
  swap: swapReducer,
  toastr: toastrReducer
})

export default rootReducer
