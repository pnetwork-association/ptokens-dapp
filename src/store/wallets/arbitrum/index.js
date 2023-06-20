import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

import {
  WALLET_ARBITRUM_CONNECTED,
  WALLET_ARBITRUM_DISCONNECTED,
  WALLET_ARBITRUM_NETWORK_CHANGED,
  WALLET_ARBITRUM_ACCOUNT_CHANGED,
} from '../../../constants'
import settings from '../../../settings'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { changeNetwork, setupNetwork } from '../../../utils/wallet'
import { getTheme } from '../../pages/pages.selectors'
import { getWalletProviderByBlockchain } from '../wallets.selectors'

let web3Modal

const connectWithArbitrumWallet = async (_dispatch) => {
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
              42161: settings.rpc.mainnet.arbitrum.endpoint,
            },
          },
        },
        walletlink: {
          package: WalletLink,
          options: {
            appName: settings.dappName,
            rpc: settings.rpc.mainnet.arbitrum.endpoint,
            chainId: 42161,
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
        type: WALLET_ARBITRUM_NETWORK_CHANGED,
        payload: {
          network: Number(_chainId) === 42161 ? 'mainnet' : 'testnet',
          chainId: _chainId,
        },
      })
    })

    provider.on('accountsChanged', (_accounts) => {
      _dispatch({
        type: WALLET_ARBITRUM_ACCOUNT_CHANGED,
        payload: {
          account: _accounts[0],
        },
      })
    })
  } catch (_err) {
    console.error(_err)
  }
}

const disconnectFromArbitrumWallet = async (_dispatch) => {
  const provider = getWalletProviderByBlockchain('ARBITRUM')
  if (provider.close) {
    await provider.close()
  }
  await web3Modal.clearCachedProvider()
  _dispatch({
    type: WALLET_ARBITRUM_DISCONNECTED,
  })
}

const _connectionSuccesfull = async (_provider, _dispatch) => {
  try {
    const { accounts, chainId } = _provider
    const account = accounts ? accounts[0] : await _getAccount(_provider)

    if (Number(chainId) !== 42161 && _provider.isMetaMask) {
      try {
        await changeNetwork({
          provider: _provider,
          chainId: 42161,
        })
      } catch (err) {
        if (err.code === 4902) {
          await setupNetwork({
            provider: _provider,
            chainId: 42161,
            chainName: 'Arbitrum',
            nativeCurrency: {
              name: 'AETH',
              symbol: 'AETH',
              decimals: 18,
            },
            nodes: [settings.rpc.mainnet.arbitrum.endpoint],
            blockExplorerUrls: [settings.explorers.mainnet.arbitrum],
          })
        }
      }

      _dispatch({
        type: WALLET_ARBITRUM_CONNECTED,
        payload: {
          provider: _provider,
          account,
          network: 'mainnet',
          chainId: 42161,
        },
      })
      return
    } else if (Number(chainId) === 42161) {
      _dispatch({
        type: WALLET_ARBITRUM_CONNECTED,
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

export { connectWithArbitrumWallet, disconnectFromArbitrumWallet }
