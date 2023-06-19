import { toastr } from 'react-redux-toastr'
import { Blockchain, DAPP_NAME, WALLET_LIBRE_CONNECTED, WALLET_LIBRE_DISCONNECTED } from '../../../constants'
import EosConnect from '../../../lib/eosConnect/'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'
import { getRpcNodeEndopointByBlockchain } from '../../settings/settings.selectors'

const connectWithLibreWallet = (_dispatch) => {
  if (document.getElementById('EOS_CONNECT')) {
    document.getElementById('EOS_CONNECT').remove()
  }

  const eosConnect = new EosConnect({
    dappName: DAPP_NAME,
    theme: getWeb3ModalTheme(getTheme()),
    providerOptions: {
      libre: {
        settings: getRpcNodeEndopointByBlockchain(Blockchain.Libre),
      },
      anchor: {
        settings: getRpcNodeEndopointByBlockchain(Blockchain.Libre),
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
