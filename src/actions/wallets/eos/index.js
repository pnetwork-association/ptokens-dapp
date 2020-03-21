import ScatterJS from '@scatterjs/core'
import ScatterEOS from '@scatterjs/eosjs2'
import settings from '../../../settings'

import {
  WALLET_ISSUER_CONNECTED,
  WALLET_REDEEMER_CONNECTED,
  WALLET_ISSUER_DISCONNECTED,
  WALLET_REDEEMER_DISCONNECTED
} from '../../../constants'

let isInitialized = false
let network = null

const connectWithScatter = async (_pToken, _role, _dispatch, _force = true) => {
  try {
    let connected = false
    if (!isInitialized) {
      ScatterJS.plugins(new ScatterEOS())
      network = ScatterJS.Network.fromJson(settings[_pToken.id].eos)
      connected = await ScatterJS.connect(settings.dappName, { network })
      isInitialized = true
    }

    const scatter = ScatterJS.scatter

    _login(_pToken, scatter, _role, _dispatch)

    if (connected) {
      if (scatter.identity) {
        _connectionSuccesfull(_pToken, _role, _dispatch)
      } else {
        _login(_pToken, scatter, _role, _dispatch)
      }
    } else {
      _login(_pToken, scatter, _role, _dispatch)
    }
  } catch (err) {
    _connectionNotSuccesfull(_pToken, _role, _dispatch)
  }
}

const disconnectFromScatter = async (_pToken, _role, _dispatch) => {
  if (!ScatterJS.logout) {
    isInitialized = false
    _dispatch({
      type:
        _role === 'issuer'
          ? WALLET_ISSUER_DISCONNECTED
          : WALLET_REDEEMER_DISCONNECTED,
      payload: {
        pToken: _pToken
      }
    })
    return
  }

  const isDisconnected = await ScatterJS.logout()
  if (isDisconnected) {
    _dispatch({
      type:
        _role === 'issuer'
          ? WALLET_ISSUER_DISCONNECTED
          : WALLET_REDEEMER_DISCONNECTED,
      payload: {
        pToken: _pToken
      }
    })
  }
}

const _login = async (_pToken, _scatter, _role, _dispatch) => {
  try {
    const isLogged = await _scatter.login()
    if (isLogged) {
      _connectionSuccesfull(_pToken, _role, _dispatch)
    } else {
      _connectionNotSuccesfull(_pToken, _role, _dispatch)
    }
  } catch (err) {
    _connectionNotSuccesfull(_pToken, _role, _dispatch)
  }
}

const _connectionSuccesfull = (_pToken, _role, _dispatch) => {
  const account = _getAccount()
  _dispatch({
    type:
      _role === 'issuer' ? WALLET_ISSUER_CONNECTED : WALLET_REDEEMER_CONNECTED,
    payload: {
      provider: ScatterJS.eosHook(network),
      account: account.name,
      wallet: {
        name: 'Scatter',
        type: 'singleWallet'
      },
      pToken: _pToken
    }
  })
}

const _connectionNotSuccesfull = (_pToken, _role, _dispatch) => {
  _dispatch({
    type:
      _role === 'issuer'
        ? WALLET_ISSUER_DISCONNECTED
        : WALLET_REDEEMER_DISCONNECTED,
    payload: {
      //TODO error message
      pToken: _pToken
    }
  })
}

const _getAccount = () => {
  const account = ScatterJS.identity.accounts.find(x => {
    return x.blockchain === 'eos'
  })
  return account
}

export { connectWithScatter, disconnectFromScatter }
