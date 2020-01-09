import { combineReducers } from 'redux'
import sidebarReducer from './sidebar'
import logReducer from './log'
import enclaveReducer from './enclave'
import pTokensReducer from './pTokens'
import walletsReducer from './wallets'

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  wallets: walletsReducer,
  log: logReducer,
  enclave: enclaveReducer,
  pTokens: pTokensReducer
})

export default rootReducer
