import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletLink from 'walletlink'
import settings from '../../../settings'
import { changeNetwork } from '../../../utils/wallet'
import {
  WALLET_ETH_CONNECTED,
  WALLET_ETH_DISCONNECTED,
  WALLET_ETH_NETWORK_CHANGED,
  WALLET_ETH_ACCOUNT_CHANGED,
} from '../../../constants'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'
import { getWalletProviderByBlockchain } from '../wallets.selectors'
import { createWalletConnect2 } from '../wallets.utils'

let web3Modal

const connectWithEthWallet = async (_dispatch) => {
  try {
    if (document.getElementById('WEB3_CONNECT_MODAL_ID')) {
      document.getElementById('WEB3_CONNECT_MODAL_ID').remove()
    }

    web3Modal = new Web3Modal({
      theme: getWeb3ModalTheme(getTheme()),
      cacheProvider: false,
      providerOptions: {
        'custom-walletconnectv2': createWalletConnect2(settings.rpc.mainnet.eth.chainId),
        walletlink: {
          package: WalletLink,
          options: {
            appName: settings.dappName,
            rpc: settings.rpc.mainnet.eth.endpoint,
            chainId: settings.rpc.mainnet.eth.chainId,
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
        type: WALLET_ETH_NETWORK_CHANGED,
        payload: {
          network: Number(_chainId) === settings.rpc.mainnet.eth.chainId ? 'mainnet' : 'testnet',
          chainId: _chainId,
        },
      })
    })

    provider.on('accountsChanged', (_accounts) => {
      _dispatch({
        type: WALLET_ETH_ACCOUNT_CHANGED,
        payload: {
          account: _accounts[0],
        },
      })
    })
  } catch (_err) {
    console.error(_err)
  }
}

const disconnectFromEthWallet = async (_dispatch) => {
  const provider = getWalletProviderByBlockchain('ETH')
  if (provider.close) {
    await provider.close()
  }
  await web3Modal.clearCachedProvider()
  _dispatch({
    type: WALLET_ETH_DISCONNECTED,
  })
}

const _connectionSuccesfull = async (_provider, _dispatch) => {
  try {
    const { accounts, chainId } = _provider
    const account = accounts ? accounts[0] : await _getAccount(_provider)

    if (Number(chainId) !== settings.rpc.mainnet.eth.chainId && _provider.isMetaMask) {
      await changeNetwork({
        provider: _provider,
        chainId: settings.rpc.mainnet.eth.chainId,
      })

      _dispatch({
        type: WALLET_ETH_CONNECTED,
        payload: {
          provider: _provider,
          account,
          network: 'mainnet',
          chainId: settings.rpc.mainnet.eth.chainId,
        },
      })
      return
    } else if (Number(chainId) === settings.rpc.mainnet.eth.chainId) {
      _dispatch({
        type: WALLET_ETH_CONNECTED,
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

export { connectWithEthWallet, disconnectFromEthWallet }
