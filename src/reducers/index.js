import { combineReducers } from 'redux'
import sidebarReducer from './sidebar'
import logReducer from './log'
import pNetworkReducer from './pNetwork'
import pTokensReducer from './pTokens'
import walletsReducer from './wallets'
import networkDetectorReducer from './networkDetector'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  wallets: walletsReducer,
  log: logReducer,
  pNetwork: pNetworkReducer,
  pTokens: pTokensReducer,
  networkDetector: networkDetectorReducer,
  toastr: toastrReducer
})

export default rootReducer
