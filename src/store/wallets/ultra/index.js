import { toastr } from 'react-redux-toastr'
import { getWeb3Settings } from 'react-web3-settings'

import { WALLET_ULTRA_CONNECTED, WALLET_ULTRA_DISCONNECTED } from '../../../constants'
import EosConnect from '../../../lib/eosConnect/'
import settings from '../../../settings'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'

const connectWithUltraWallet = (_dispatch) => {
  const configs = getWeb3Settings()

  if (document.getElementById('EOS_CONNECT')) {
    document.getElementById('EOS_CONNECT').remove()
  }

  const eosConnect = new EosConnect({
    dappName: settings.dappName,
    theme: getWeb3ModalTheme(getTheme()),
    providerOptions: {
      tokenPocket: {
        settings: { ...settings.rpc.mainnet.ultra, endpoint: configs.ultra },
      },
      anchor: {
        settings: { ...settings.rpc.mainnet.ultra, endpoint: configs.ultra },
      },
    },
  })

  eosConnect.on('connect', ({ provider, account }) => {
    _dispatch({
      type: WALLET_ULTRA_CONNECTED,
      payload: {
        provider,
        account: account.actor,
        permission: account.permission,
        network: 'mainnet',
      },
    })
  })
  eosConnect.on('error', (message) => {
    toastr.error(message)
  })

  eosConnect.toggleModal()
}

const disconnectFromUltraWallet = (_dispatch) => {
  _dispatch({
    type: WALLET_ULTRA_DISCONNECTED,
  })
}

export { connectWithUltraWallet, disconnectFromUltraWallet }
