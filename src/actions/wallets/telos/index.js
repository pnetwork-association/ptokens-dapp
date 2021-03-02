import settings from '../../../settings'
import { toastr } from 'react-redux-toastr'
import { WALLET_TELOS_CONNECTED } from '../../../constants'
import EosConnect from '../../../lib/eosConnect/'

let eosConnect = null
const connectWithTelosWallet = _dispatch => {
  const configs = {
    dappName: settings.dappName,
    scatter: {
      settings: settings.rpc.telos
    },
    tokenPocket: {
      settings: settings.rpc.telos
    },
    anchor: {
      settings: settings.rpc.telos
    }
  }

  if (!eosConnect) {
    eosConnect = new EosConnect(configs)
  } else {
    eosConnect.setConfigs(configs)
  }

  eosConnect.on('connect', ({ provider, account }) => {
    _dispatch({
      type: WALLET_TELOS_CONNECTED,
      payload: {
        provider,
        account: account.name,
        network: 'mainnet'
      }
    })
  })
  eosConnect.on('error', message => {
    toastr.error(message)
  })

  eosConnect.toggleModal()
}

const disconnectFromTelosWallet = () => {
  // TODO
}

export { connectWithTelosWallet, disconnectFromTelosWallet }
