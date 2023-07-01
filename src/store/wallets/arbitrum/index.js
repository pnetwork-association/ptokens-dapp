import WalletConnectProvider from '@walletconnect/web3-provider'
import { Blockchain, Network } from 'ptokens'
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
import { createWalletConnect2 } from '../wallets.utils'

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
              [settings.rpc[Network.Mainnet][Blockchain.Arbitrum].chainId]:
                settings.rpc[Network.Mainnet][Blockchain.Arbitrum].endpoint,
            },
          },
        },
        'custom-walletconnectv2': createWalletConnect2(settings.rpc[Network.Mainnet][Blockchain.Arbitrum].chainId),
        walletlink: {
          package: WalletLink,
          options: {
            appName: settings.dappName,
            rpc: settings.rpc[Network.Mainnet][Blockchain.Arbitrum].endpoint,
            chainId: settings.rpc[Network.Mainnet][Blockchain.Arbitrum].chainId,
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
        type: WALLET_ARBITRUM_NETWORK_CHANGED,
        payload: {
          network:
            Number(_chainId) === settings.rpc[Network.Mainnet][Blockchain.Arbitrum].chainId ? 'mainnet' : 'testnet',
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
  const provider = getWalletProviderByBlockchain(Blockchain.Arbitrum)
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

    if (Number(chainId) !== settings.rpc[Network.Mainnet][Blockchain.Arbitrum].chainId && _provider.isMetaMask) {
      try {
        await changeNetwork({
          provider: _provider,
          chainId: settings.rpc[Network.Mainnet][Blockchain.Arbitrum].chainId,
        })
      } catch (err) {
        if (err.code === 4902) {
          await setupNetwork({
            provider: _provider,
            chainId: settings.rpc[Network.Mainnet][Blockchain.Arbitrum].chainId,
            chainName: 'Arbitrum',
            nativeCurrency: {
              name: 'AETH',
              symbol: 'AETH',
              decimals: 18,
            },
            nodes: [settings.rpc[Network.Mainnet][Blockchain.Arbitrum].endpoint],
            blockExplorerUrls: [settings.explorers[Network.Mainnet][Blockchain.Arbitrum]],
          })
        }
      }

      _dispatch({
        type: WALLET_ARBITRUM_CONNECTED,
        payload: {
          provider: _provider,
          account,
          network: 'mainnet',
          chainId: settings.rpc[Network.Mainnet][Blockchain.Arbitrum].chainId,
        },
      })
      return
    } else if (Number(chainId) === settings.rpc[Network.Mainnet][Blockchain.Arbitrum].chainId) {
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
