import settings from '../../../settings'
import { toastr } from 'react-redux-toastr'
import {
  PEOS_ON_ETH_MAINNET,
  PEOS_ON_POLYGON_MAINNET,
  WALLET_ISSUER_CONNECTED,
  WALLET_REDEEMER_CONNECTED
} from '../../../constants'
import EosConnect from '../../../lib/eosConnect/'

let eosConnect = null
const connectWithEosWallet = async (_pToken, _role, _dispatch, _force = true) => {
  const configs = {
    dappName: settings.dappName,
    scatter: {
      settings:
        settings[_pToken.id][
          _pToken.id === PEOS_ON_POLYGON_MAINNET || _pToken.id === PEOS_ON_ETH_MAINNET
            ? _pToken.issueFrom.toLowerCase()
            : _pToken.redeemFrom.toLowerCase()
        ]
    },
    tokenPocket: {
      settings:
        settings[_pToken.id][
          _pToken.id === PEOS_ON_POLYGON_MAINNET || _pToken.id === PEOS_ON_ETH_MAINNET
            ? _pToken.issueFrom.toLowerCase()
            : _pToken.redeemFrom.toLowerCase()
        ]
    },
    anchor: {
      settings:
        settings[_pToken.id][
          _pToken.id === PEOS_ON_POLYGON_MAINNET || _pToken.id === PEOS_ON_ETH_MAINNET
            ? _pToken.issueFrom.toLowerCase()
            : _pToken.redeemFrom.toLowerCase()
        ]
    }
  }

  if (!eosConnect) {
    eosConnect = new EosConnect(configs)
  } else {
    eosConnect.setConfigs(configs)
  }

  eosConnect.on('connect', ({ provider, account }) => {
    _dispatch({
      type: _role === 'issuer' ? WALLET_ISSUER_CONNECTED : WALLET_REDEEMER_CONNECTED,
      payload: {
        provider,
        account: account.name,
        wallet: {
          name: 'Scatter',
          type: 'multiWallet'
        },
        pToken: _pToken,
        type: _pToken.redeemfrom,
        network: 'mainnet'
      }
    })
  })
  eosConnect.on('error', message => {
    toastr.error(message)
  })

  if (_force) {
    eosConnect.toggleModal()
  }
}

const disconnectFromEosWallet = () => {
  // TODO
}

export { connectWithEosWallet, disconnectFromEosWallet }
