import settings from '../../../settings'
import { toastr } from 'react-redux-toastr'
import { WALLET_EOS_CONNECTED } from '../../../constants'
import EosConnect from '../../../lib/eosConnect/'

let eosConnect = null
const connectWithEosWallet = _dispatch => {
  const configs = {
    dappName: settings.dappName,
    scatter: {
      settings: settings.rpc.eos
    },
    tokenPocket: {
      settings: settings.rpc.eos
    },
    anchor: {
      settings: settings.rpc.eos
    }
  }

  if (!eosConnect) {
    eosConnect = new EosConnect(configs)
  } else {
    eosConnect.setConfigs(configs)
  }

  eosConnect.on('connect', ({ provider, account }) => {
    _dispatch({
      type: WALLET_EOS_CONNECTED,
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

const disconnectFromEosWallet = () => {
  // TODO
}

export { connectWithEosWallet, disconnectFromEosWallet }
