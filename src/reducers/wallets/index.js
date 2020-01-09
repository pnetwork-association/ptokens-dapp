import {
  WALLET_ISSUER_CONNECTED,
  WALLET_REDEEMER_CONNECTED,
  WALLET_ISSUER_DISCONNECTED,
  WALLET_REDEEMER_DISCONNECTED
} from '../../constants/index'

const initialState = {
  issuerIsConnected: null,
  redeemerIsConnected: null,
  issuerProvider: null,
  redeemerProvider: null,
  issuerAccount : null,
  redeemerAccount: null,
  issuerWallet: null,
  redeemerWallet: null
}

const walletsReducer = (_state = initialState, _action) => {
  
  if (_action.type === WALLET_ISSUER_CONNECTED) {
    return Object.assign({}, _state, {
      issuerIsConnected: true,
      issuerProvider: _action.payload.provider,
      issuerAccount: _action.payload.account,
      issuerWallet: _action.payload.wallet
    })
  }

  if (_action.type === WALLET_REDEEMER_CONNECTED) {
    return Object.assign({}, _state, {
      redeemerIsConnected: true,
      redeemerProvider: _action.payload.provider,
      redeemerAccount: _action.payload.account,
      redeemerWallet: _action.payload.wallet
    })
  }

  if (_action.type === WALLET_ISSUER_DISCONNECTED) {
    return Object.assign({}, _state, {
      issuerIsConnected: null,
      issuerProvider: null,
      issuerAccount: null,
      issuerWallet: null
    })
  }

  if (_action.type === WALLET_REDEEMER_DISCONNECTED) {
    return Object.assign({}, _state, {
      redeemerIsConnected: null,
      redeemerProvider: null,
      redeemerAccount: null,
      redeemerWallet: null
    })
  }

  return _state
}

export default walletsReducer
