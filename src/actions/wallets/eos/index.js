import ScatterJS from '@scatterjs/core'
import ScatterEOS from '@scatterjs/eosjs2'
import { JsonRpc, Api } from 'eosjs'
import settings from '../../../settings'

import {
  WALLET_ISSUER_CONNECTED,
  WALLET_REDEEMER_CONNECTED,
  WALLET_ISSUER_DISCONNECTED,
  WALLET_REDEEMER_DISCONNECTED
} from '../../../constants'

ScatterJS.plugins(new ScatterEOS())

const network = ScatterJS.Network.fromJson(settings.peos.eos)
const rpc = new JsonRpc(network.fullhost())
const eosjs = new Api({
  rpc,
  signatureProvider:ScatterJS.eosHook(network) 
})

const connectWithScatter = async (_role, _dispatch, _force = true) => {
  try {

    const scatter = ScatterJS.scatter

    let connected = false
    if (_force) {
      connected = await ScatterJS.connect(
        settings.dappName,
        { network }
      )
    } else {
      _login(scatter, _role, _dispatch)
      return
    }

    if (connected) {
      if (scatter.identity) {
        _connectionSuccesfull(_role, _dispatch)
      } else {
        _login(scatter, _role, _dispatch)
      }
    } else {
      _login(scatter, _role, _dispatch)
    }

  } catch (err) {
    _connectionNotSuccesfull(_role, _dispatch)
  }
}

const disconnectFromScatter = async (_role, _dispatch) => {

  //already disconnected
  if (!ScatterJS.logout){
    _dispatch({
      type: _role === 'issuer' 
        ? WALLET_ISSUER_DISCONNECTED 
        : WALLET_REDEEMER_DISCONNECTED
    })
    return
  }

  const isDisconnected = await ScatterJS.logout()
  if (isDisconnected) {
    _dispatch({
      type: _role === 'issuer' 
        ? WALLET_ISSUER_DISCONNECTED 
        : WALLET_REDEEMER_DISCONNECTED
    })
  }
}

const _login = async (_scatter, _role, _dispatch) => {
  try {
    const isLogged = await _scatter.login()
    if (isLogged) {
      _connectionSuccesfull(_role, _dispatch)
    } else {
      _connectionNotSuccesfull(_role, _dispatch)
    }
  } catch (err) {
    _connectionNotSuccesfull(_role, _dispatch)
  }
}

const _connectionSuccesfull = (_role, _dispatch) => {
  const account = _getAccount()
  _dispatch({
    type: _role === 'issuer' ? WALLET_ISSUER_CONNECTED : WALLET_REDEEMER_CONNECTED,
    payload: {
      provider: eosjs,
      account: account.name,
      wallet: {
        name: 'Scatter',
        type: 'singleWallet'
      }
    }
  })
}

const _connectionNotSuccesfull = (_role, _dispatch) => {
  _dispatch({
    type: _role === 'issuer' ? WALLET_ISSUER_DISCONNECTED : WALLET_REDEEMER_DISCONNECTED,
    payload: {
      //TODO error message
    }
  })
}

const _getAccount = () => {
  const account = ScatterJS.identity.accounts.find(x => {
    return x.blockchain === 'eos'
  })
  return account
}

export {
  connectWithScatter,
  disconnectFromScatter,
}

