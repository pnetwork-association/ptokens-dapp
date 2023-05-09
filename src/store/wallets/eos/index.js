import settings from '../../../settings'
import { WALLET_EOS_CONNECTED, WALLET_EOS_DISCONNECTED } from '../../../constants'
import EosConnect from '../../../lib/eosConnect/'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'

const connectWithEosWallet = (_dispatch) => {
  if (document.getElementById('EOS_CONNECT')) {
    document.getElementById('EOS_CONNECT').remove()
  }

  const eosConnect = new EosConnect({
    dappName: settings.dappName,
    theme: getWeb3ModalTheme(getTheme()),
    providerOptions: {
      tokenPocket: {
        settings: settings.rpc.mainnet.eos,
      },
      anchor: {
        settings: settings.rpc.mainnet.eos,
      },
    },
  })

  eosConnect.on('connect', ({ provider, account }) => {
    _dispatch({
      type: WALLET_EOS_CONNECTED,
      payload: {
        provider,
        account: account.actor,
        permission: account.permission,
        network: 'mainnet',
      },
    })
  })
  eosConnect.on('error', (message) => {
    console.error(message)
  })

  eosConnect.toggleModal()
}

const disconnectFromEosWallet = (_dispatch) => {
  _dispatch({
    type: WALLET_EOS_DISCONNECTED,
  })
}

export { connectWithEosWallet, disconnectFromEosWallet }
