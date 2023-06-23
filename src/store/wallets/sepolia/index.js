import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

import {
  WALLET_SEPOLIA_CONNECTED,
  WALLET_SEPOLIA_DISCONNECTED,
  WALLET_SEPOLIA_NETWORK_CHANGED,
  WALLET_SEPOLIA_ACCOUNT_CHANGED,
} from '../../../constants'
import settings from '../../../settings'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { changeNetwork } from '../../../utils/wallet'
import { getTheme } from '../../pages/pages.selectors'
import { getWalletProviderByBlockchain } from '../wallets.selectors'

let web3Modal

const connectWithSepoliaWallet = async (_dispatch) => {
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
            network: 'testnet',
            rpc: {
              11155111: settings.rpc.testnet.sepolia.endpoint,
            },
          },
        },
        walletlink: {
          package: WalletLink,
          options: {
            appName: settings.dappName,
            rpc: settings.rpc.testnet.sepolia.endpoint,
            chainId: 11155111,
            darkMode: getTheme() === 'dark',
          },
        },
      },
    })
    const provider = await web3Modal.connect()

    await _connectionSuccesfull(provider, _dispatch, {
      type: 'multiWallet',
    })

    provider.on('chainChanged', (_chainId) => {
      _dispatch({
        type: WALLET_SEPOLIA_NETWORK_CHANGED,
        payload: {
          network: Number(_chainId) === 1 ? 'mainnet' : 'testnet',
          chainId: _chainId,
        },
      })
    })

    provider.on('accountsChanged', (_accounts) => {
      _dispatch({
        type: WALLET_SEPOLIA_ACCOUNT_CHANGED,
        payload: {
          account: _accounts[0],
        },
      })
    })
  } catch (_err) {
    console.error(_err)
  }
}

const disconnectFromSepoliaWallet = async (_dispatch) => {
  const provider = getWalletProviderByBlockchain('SEPOLIA')
  if (provider.close) {
    await provider.close()
  }
  await web3Modal.clearCachedProvider()
  _dispatch({
    type: WALLET_SEPOLIA_DISCONNECTED,
  })
}

const _connectionSuccesfull = async (_provider, _dispatch) => {
  try {
    const { accounts, chainId } = _provider
    const account = accounts ? accounts[0] : await _getAccount(_provider)

    if (Number(chainId) !== 11155111 && _provider.isMetaMask) {
      await changeNetwork({
        provider: _provider,
        chainId: 11155111,
      })

      _dispatch({
        type: WALLET_SEPOLIA_CONNECTED,
        payload: {
          provider: _provider,
          account,
          network: 'testnet',
          chainId: 11155111,
        },
      })
      return
    } else if (Number(chainId) === 11155111) {
      _dispatch({
        type: WALLET_SEPOLIA_CONNECTED,
        payload: {
          provider: _provider,
          account,
          network: 'testnet',
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

export { connectWithSepoliaWallet, disconnectFromSepoliaWallet }
