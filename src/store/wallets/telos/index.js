import settings from '../../../settings'
import { toastr } from 'react-redux-toastr'
import { WALLET_TELOS_CONNECTED } from '../../../constants'
import EosConnect from '../../../lib/eosConnect/'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'

const connectWithTelosWallet = _dispatch => {
  if (document.getElementById('EOS_CONNECT')) {
    document.getElementById('EOS_CONNECT').remove()
  }

  const eosConnect = new EosConnect({
    dappName: settings.dappName,
    theme: getWeb3ModalTheme(getTheme()),
    providerOptions: {
      scatter: {
        settings: settings.rpc.mainnet.eos
      },
      tokenPocket: {
        settings: settings.rpc.mainnet.eos
      },
      anchor: {
        settings: settings.rpc.mainnet.eos
      }
    }
  })

  eosConnect.on('connect', ({ provider, account }) => {
    _dispatch({
      type: WALLET_TELOS_CONNECTED,
      payload: {
        provider,
        account: account.name,
        network: 'mainnet'
      }
    })
  })
  eosConnect.on('error', message => {
    toastr.error(message)
  })

  eosConnect.toggleModal()
}

const disconnectFromTelosWallet = () => {
  // TODO
}

export { connectWithTelosWallet, disconnectFromTelosWallet }