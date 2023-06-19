import { toastr } from 'react-redux-toastr'
import { Blockchain, DAPP_NAME, WALLET_TELOS_CONNECTED } from '../../../constants'
import EosConnect from '../../../lib/eosConnect/'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'
import { getRpcNodeEndopointByBlockchain } from '../../settings/settings.selectors'

const connectWithTelosWallet = (_dispatch) => {
  if (document.getElementById('EOS_CONNECT')) {
    document.getElementById('EOS_CONNECT').remove()
  }

  const eosConnect = new EosConnect({
    dappName: DAPP_NAME,
    theme: getWeb3ModalTheme(getTheme()),
    providerOptions: {
      tokenPocket: {
        settings: getRpcNodeEndopointByBlockchain(Blockchain.Telos),
      },
      anchor: {
        settings: getRpcNodeEndopointByBlockchain(Blockchain.Telos),
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
    type: WALLET_TELOS_CONNECTED,
  })
}

export { connectWithTelosWallet, disconnectFromTelosWallet }
