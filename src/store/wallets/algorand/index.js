import {
  WALLET_ALGORAND_CONNECTED,
  WALLET_ALGORAND_DISCONNECTED,
  WALLET_ALGORAND_ACCOUNT_CHANGED,
  DAPP_NAME,
} from '../../../constants'

import AlgoWalletModal from '../../../lib/algoWalletModal'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'
import { getWalletProviderByBlockchain } from '../wallets.selectors'
import { Blockchain } from '../../../constants'

const connectWithAlgorandWallet = async (_dispatch) => {
  if (document.getElementById('ALGO_WALLET_MODAL')) {
    document.getElementById('ALGO_WALLET_MODAL').remove()
  }

  const algoWalletModal = new AlgoWalletModal({
    dappName: DAPP_NAME,
    theme: getWeb3ModalTheme(getTheme()),
    providerOptions: {
      walletConnect: {
        bridge: 'https://bridge.walletconnect.org',
      },
    },
  })

  try {
    const provider = await algoWalletModal.connect()

    const accounts = await provider.getAccounts()
    _dispatch({
      type: WALLET_ALGORAND_CONNECTED,
      payload: {
        provider,
        account: accounts[0],
        network: 'mainnet',
      },
    })

    provider.on('accountsChanged', (_accounts) => {
      _dispatch({
        type: WALLET_ALGORAND_ACCOUNT_CHANGED,
        payload: {
          account: _accounts[0],
        },
      })
    })
  } catch (err) {
    console.error(err)
  }
}

const disconnectFromAlgorandWallet = async (_dispatch) => {
  const provider = getWalletProviderByBlockchain(Blockchain.Algorand)
  provider.close()
  _dispatch({
    type: WALLET_ALGORAND_DISCONNECTED,
  })
}

export { connectWithAlgorandWallet, disconnectFromAlgorandWallet }
