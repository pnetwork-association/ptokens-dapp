import settings from '../../../settings'
import { toastr } from 'react-redux-toastr'
import { WALLET_ORE_CONNECTED } from '../../../constants'
import EosConnect from '../../../lib/eosConnect/'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'

const connectWithOreWallet = _dispatch => {
  if (document.getElementById('EOS_CONNECT')) {
    document.getElementById('EOS_CONNECT').remove()
  }

  const eosConnect = new EosConnect({
    dappName: settings.dappName,
    theme: getWeb3ModalTheme(getTheme()),
    providerOptions: {
      tokenPocket: {
        settings: settings.rpc.mainnet.telos
      },
      anchor: {
        settings: settings.rpc.mainnet.telos
      }
    }
  })

  eosConnect.on('connect', ({ provider, account }) => {
    _dispatch({
      type: WALLET_ORE_CONNECTED,
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

const disconnectFromOreWallet = _dispatch => {
  _dispatch({
    type: WALLET_ORE_CONNECTED
  })
}

export { connectWithOreWallet, disconnectFromOreWallet }
