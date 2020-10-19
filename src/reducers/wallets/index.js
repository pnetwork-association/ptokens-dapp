import {
  WALLET_ISSUER_CONNECTED,
  WALLET_REDEEMER_CONNECTED,
  WALLET_RESET_REDEEMER,
  WALLET_RESET_ISSUER,
  WALLET_ISSUER_ACCOUNT_CHANGED,
  WALLET_REDEEMER_ACCOUNT_CHANGED,
  WALLET_ISSUER_NETWORK_CHANGED,
  WALLET_REDEEMER_NETWORK_CHANGED
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
  issuerNetwork: null,
  redeemerNetwork: null,
  walletsPerType: {}
}

const walletsReducer = (_state = initialState, _action) => {
  if (_action.type === WALLET_ISSUER_CONNECTED) {
    const { provider, account, wallet, type, network } = _action.payload
    return Object.assign({}, _state, {
      issuerIsConnected: true,
      issuerProvider: provider,
      issuerAccount: account,
      issuerWallet: wallet,
      issuerNetwork: network,
      walletsPerType: {
        [type]: {
          provider,
          account
        }
      }
    })
  }

  if (_action.type === WALLET_REDEEMER_CONNECTED) {
    const { provider, account, wallet, type, network } = _action.payload
    return Object.assign({}, _state, {
      redeemerIsConnected: true,
      redeemerProvider: provider,
      redeemerAccount: account,
      redeemerWallet: wallet,
      redeemerNetwork: network,
      walletsPerType: {
        [type]: {
          provider,
          account
        }
      }
    })
  }

  if (_action.type === WALLET_ISSUER_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      issuerIsConnected: true,
      issuerAccount: account
    })
  }

  if (_action.type === WALLET_REDEEMER_ACCOUNT_CHANGED) {
    const { account } = _action.payload
    return Object.assign({}, _state, {
      redeemerIsConnected: true,
      redeemerAccount: account
    })
  }

  if (_action.type === WALLET_ISSUER_NETWORK_CHANGED) {
    const { network } = _action.payload
    return Object.assign({}, _state, {
      issuerNetwork: network
    })
  }

  if (_action.type === WALLET_REDEEMER_NETWORK_CHANGED) {
    const { network } = _action.payload
    return Object.assign({}, _state, {
      redeemerNetwork: network
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
