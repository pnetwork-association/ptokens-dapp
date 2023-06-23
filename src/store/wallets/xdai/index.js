import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

import { WALLET_XDAI_CONNECTED, WALLET_XDAI_ACCOUNT_CHANGED, WALLET_XDAI_DISCONNECTED } from '../../../constants'
import settings from '../../../settings'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { changeNetwork, setupNetwork } from '../../../utils/wallet'
import { getTheme } from '../../pages/pages.selectors'
import { getWalletProviderByBlockchain } from '../wallets.selectors'
import { createWalletConnect2 } from '../wallets.utils'

let web3Modal

const connectWithXdaiWallet = async (_dispatch) => {
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
            network: 'xdai',
            rpc: {
              [settings.rpc.mainnet.xdai.chainId]: settings.rpc.mainnet.xdai.endpoint,
            },
          },
        },
        'custom-walletconnectv2': createWalletConnect2(settings.rpc.mainnet.xdai.chainId),
        walletlink: {
          package: WalletLink,
          options: {
            appName: settings.dappName,
            rpc: settings.rpc.mainnet.xdai.endpoint,
            chainId: settings.rpc.mainnet.xdai.chainId,
            darkMode: getTheme() === 'dark',
          },
        },
      },
    })

    const provider = await web3Modal.connect()
    await _connectionSuccesfull(provider, _dispatch, {
      type: 'multiWallet',
    })

    provider.on('accountsChanged', (_accounts) => {
      _dispatch({
        type: WALLET_XDAI_ACCOUNT_CHANGED,
        payload: {
          account: _accounts[0],
        },
      })
    })
  } catch (_err) {
    console.error(_err)
  }
}

const disconnectFromXdaiWallet = async (_dispatch) => {
  const provider = getWalletProviderByBlockchain('XDAI')
  if (provider.close) {
    await provider.close()
  }
  await web3Modal.clearCachedProvider()
  _dispatch({
    type: WALLET_XDAI_DISCONNECTED,
  })
}

const _connectionSuccesfull = async (_provider, _dispatch) => {
  try {
    const { accounts, chainId } = _provider
    const account = accounts ? accounts[0] : await _getAccount(_provider)

    if (Number(chainId) !== settings.rpc.mainnet.xdai.chainId && _provider.isMetaMask) {
      try {
        await changeNetwork({
          provider: _provider,
          chainId: settings.rpc.mainnet.xdai.chainId,
        })
      } catch (err) {
        if (err.code === 4902) {
          await setupNetwork({
            provider: _provider,
            chainId: settings.rpc.mainnet.xdai.chainId,
            chainName: 'XDAI',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'matic',
              decimals: 18,
            },
            nodes: [settings.rpc.mainnet.xdai.endpoint],
            blockExplorerUrls: [settings.explorers.mainnet.xdai],
          })
        }
      }

      _dispatch({
        type: WALLET_XDAI_CONNECTED,
        payload: {
          provider: _provider,
          account,
          network: 'mainnet',
          chainId: settings.rpc.mainnet.xdai.chainId,
        },
      })
      return
    } else if (Number(chainId) === settings.rpc.mainnet.xdai.chainId) {
      _dispatch({
        type: WALLET_XDAI_CONNECTED,
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
    console.error(`Error during getting xDai account ${_err.message}`)
  }
}

export { connectWithXdaiWallet, disconnectFromXdaiWallet }
