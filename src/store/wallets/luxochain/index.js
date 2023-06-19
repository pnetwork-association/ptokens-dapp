import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
import {
  WALLET_LUXOCHAIN_CONNECTED,
  WALLET_LUXOCHAIN_DISCONNECTED,
  WALLET_LUXOCHAIN_NETWORK_CHANGED,
  WALLET_LUXOCHAIN_ACCOUNT_CHANGED,
  DAPP_NAME,
} from '../../../constants'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'
import { getWalletProviderByBlockchain } from '../wallets.selectors'
import { Blockchain } from '../../../constants'
import { getRpcNodeEndopointByBlockchain } from '../../settings/settings.selectors'

let web3Modal

const connectWithLuxochainWallet = async (_dispatch) => {
  try {
    if (document.getElementById('WEB3_CONNECT_MODAL_ID')) {
      document.getElementById('WEB3_CONNECT_MODAL_ID').remove()
    }

    web3Modal = new Web3Modal({
      theme: getWeb3ModalTheme(getTheme()),
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            network: 'mainnet',
            rpc: {
              110: getRpcNodeEndopointByBlockchain(Blockchain.Luxochain),
            },
          },
        },
        walletlink: {
          package: WalletLink,
          options: {
            appName: DAPP_NAME,
            rpc: getRpcNodeEndopointByBlockchain(Blockchain.Luxochain),
            chainId: 110,
            darkMode: getTheme() === 'dark',
          },
        },
      },
    })

    const provider = await web3Modal.connect()
    _connectionSuccesfull(provider, _dispatch, {
      type: 'multiWallet',
    })

    provider.on('chainChanged', (_chainId) => {
      _dispatch({
        type: WALLET_LUXOCHAIN_NETWORK_CHANGED,
        payload: {
          network: Number(_chainId) === 110 ? 'mainnet' : 'testnet',
          chainId: _chainId,
        },
      })
    })

    provider.on('accountsChanged', (_accounts) => {
      _dispatch({
        type: WALLET_LUXOCHAIN_ACCOUNT_CHANGED,
        payload: {
          account: _accounts[0],
        },
      })
    })
  } catch (_err) {
    console.error(_err)
  }
}

const disconnectFromLuxochainWallet = async (_dispatch) => {
  const provider = getWalletProviderByBlockchain(Blockchain.Ethereum)
  if (provider.close) {
    await provider.close()
  }
  await web3Modal.clearCachedProvider()
  _dispatch({
    type: WALLET_LUXOCHAIN_DISCONNECTED,
  })
}

const _connectionSuccesfull = async (_provider, _dispatch) => {
  try {
    const { accounts, chainId } = _provider
    const account = accounts ? accounts[0] : await _getAccount(_provider)

    if (Number(chainId) === 110) {
      _dispatch({
        type: WALLET_LUXOCHAIN_CONNECTED,
        payload: {
          provider: _provider,
          account,
          network: 'mainnet',
          chainId,
        },
      })
    }
  } catch (_err) {
    console.error(_err)
  }
}

const _getAccount = async (_provider) => {
  try {
    const web3 = new Web3(_provider)
    const accounts = await web3.eth.getAccounts()
    return accounts[0]
  } catch (_err) {
    console.error(`Error during getting Ethereum account ${_err.message}`)
  }
}

export { connectWithLuxochainWallet, disconnectFromLuxochainWallet }
