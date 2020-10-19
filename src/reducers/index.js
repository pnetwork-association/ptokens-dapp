import { combineReducers } from 'redux'
import sidebarReducer from './sidebar'
import logReducer from './log'
import pNetworkReducer from './pNetwork'
import pTokensReducer from './pTokens'
import walletsReducer from './wallets'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  wallets: walletsReducer,
  log: logReducer,
  pNetwork: pNetworkReducer,
  pTokens: pTokensReducer,
  toastr: toastrReducer
})

export default rootReducer
