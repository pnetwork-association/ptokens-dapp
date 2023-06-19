import { toastr } from 'react-redux-toastr'
import { Blockchain, DAPP_NAME, WALLET_ULTRA_CONNECTED, WALLET_ULTRA_DISCONNECTED } from '../../../constants'
import EosConnect from '../../../lib/eosConnect/'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'
import { getRpcNodeEndopointByBlockchain } from '../../settings/settings.selectors'

const connectWithUltraWallet = (_dispatch) => {
  if (document.getElementById('EOS_CONNECT')) {
    document.getElementById('EOS_CONNECT').remove()
  }

  const eosConnect = new EosConnect({
    dappName: DAPP_NAME,
    theme: getWeb3ModalTheme(getTheme()),
    providerOptions: {
      tokenPocket: {
        settings: getRpcNodeEndopointByBlockchain(Blockchain.Ultra),
      },
      anchor: {
        settings: getRpcNodeEndopointByBlockchain(Blockchain.Ultra),
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
