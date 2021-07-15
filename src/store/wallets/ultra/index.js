import settings from '../../../settings'
import { toastr } from 'react-redux-toastr'
import { WALLET_ULTRA_CONNECTED } from '../../../constants'
import EosConnect from '../../../lib/eosConnect/'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'

const connectWithUltraWallet = _dispatch => {
  if (document.getElementById('EOS_CONNECT')) {
    document.getElementById('EOS_CONNECT').remove()
  }

  const eosConnect = new EosConnect({
    dappName: settings.dappName,
    theme: getWeb3ModalTheme(getTheme()),
    providerOptions: {
      scatter: {
        settings: settings.rpc.mainnet.ultra
      },
      tokenPocket: {
        settings: settings.rpc.mainnet.ultra
      },
      anchor: {
        settings: settings.rpc.mainnet.ultra
      }
    }
  })

  eosConnect.on('connect', ({ provider, account }) => {
    _dispatch({
      type: WALLET_ULTRA_CONNECTED,
      payload: {
        provider,
        account: account.actor,
        permission: account.permission,
        network: 'mainnet'
      }
    })
  })
  eosConnect.on('error', message => {
    toastr.error(message)
  })

  eosConnect.toggleModal()
}

const disconnectFromUltraWallet = () => {
  // TODO
}

export { connectWithUltraWallet, disconnectFromUltraWallet }
