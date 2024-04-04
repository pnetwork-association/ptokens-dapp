import { getWeb3Settings } from '@p.network/react-web3-settings'
import { toastr } from 'react-redux-toastr'

import { WALLET_TELOS_CONNECTED, WALLET_TELOS_DISCONNECTED } from '../../../constants'
import EosConnect from '../../../lib/eosConnect/'
import settings from '../../../settings'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'

const connectWithTelosWallet = (_dispatch) => {
  const configs = getWeb3Settings()

  if (document.getElementById('EOS_CONNECT')) {
    document.getElementById('EOS_CONNECT').remove()
  }

  const eosConnect = new EosConnect({
    dappName: settings.dappName,
    theme: getWeb3ModalTheme(getTheme()),
    providerOptions: {
      tokenPocket: {
        settings: { ...settings.rpc.mainnet.telos, endpoint: configs.telos },
      },
      anchor: {
        settings: { ...settings.rpc.mainnet.telos, endpoint: configs.telos },
      },
    },
  })

  eosConnect.on('connect', ({ provider, account }) => {
    _dispatch({
      type: WALLET_TELOS_CONNECTED,
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

const disconnectFromTelosWallet = (_dispatch) => {
  _dispatch({
    type: WALLET_TELOS_DISCONNECTED,
  })
}

export { connectWithTelosWallet, disconnectFromTelosWallet }
