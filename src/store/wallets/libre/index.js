import { getWeb3Settings } from '@p.network/react-web3-settings'
import { toastr } from 'react-redux-toastr'

import { WALLET_LIBRE_CONNECTED, WALLET_LIBRE_DISCONNECTED } from '../../../constants'
import EosConnect from '../../../lib/eosConnect/'
import settings from '../../../settings'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'

const connectWithLibreWallet = (_dispatch) => {
  const configs = getWeb3Settings()

  if (document.getElementById('EOS_CONNECT')) {
    document.getElementById('EOS_CONNECT').remove()
  }

  const eosConnect = new EosConnect({
    dappName: settings.dappName,
    theme: getWeb3ModalTheme(getTheme()),
    providerOptions: {
      libre: {
        settings: { ...settings.rpc.mainnet.libre, endpoint: configs.libre },
      },
      anchor: {
        settings: { ...settings.rpc.mainnet.libre, endpoint: configs.libre },
      },
    },
  })

  eosConnect.on('connect', ({ provider, account }) => {
    _dispatch({
      type: WALLET_LIBRE_CONNECTED,
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

const disconnectFromLibreWallet = (_dispatch) => {
  _dispatch({
    type: WALLET_LIBRE_DISCONNECTED,
  })
}

export { connectWithLibreWallet, disconnectFromLibreWallet }
