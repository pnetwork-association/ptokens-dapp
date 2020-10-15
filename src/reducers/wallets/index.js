import {
  WALLET_ISSUER_CONNECTED,
  WALLET_REDEEMER_CONNECTED,
  WALLET_RESET_REDEEMER,
  WALLET_RESET_ISSUER
} from '../../constants/index'

const initialState = {
  issuerIsConnected: null,
  redeemerIsConnected: null,
  issuerProvider: null,
  redeemerProvider: null,
  issuerAccount: null,
  redeemerAccount: null,
  issuerWallet: null,
  redeemerWallet: null,
  walletsPerType: {}
}

const walletsReducer = (_state = initialState, _action) => {
  if (_action.type === WALLET_ISSUER_CONNECTED) {
    const { provider, account, wallet, type } = _action.payload
    return Object.assign({}, _state, {
      issuerIsConnected: true,
      issuerProvider: provider,
      issuerAccount: account,
      issuerWallet: wallet,
      walletsPerType: {
        [type]: {
          provider,
          account
        }
      }
    })
  }

  if (_action.type === WALLET_REDEEMER_CONNECTED) {
    const { provider, account, wallet, type } = _action.payload
    return Object.assign({}, _state, {
      redeemerIsConnected: true,
      redeemerProvider: provider,
      redeemerAccount: account,
      redeemerWallet: wallet,
      walletsPerType: {
        [type]: {
          provider,
          account
        }
      }
    })
  }

  if (_action.type === WALLET_RESET_ISSUER) {
    return Object.assign({}, _state, {
      issuerIsConnected: null,
      issuerProvider: null,
      issuerAccount: null,
      issuerWallet: null
    })
  }

  if (_action.type === WALLET_RESET_REDEEMER) {
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
