import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

import { WALLET_FTM_CONNECTED, WALLET_FTM_DISCONNECTED, WALLET_FTM_ACCOUNT_CHANGED } from '../../../constants'
import settings from '../../../settings'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { changeNetwork, setupNetwork } from '../../../utils/wallet'
import { getTheme } from '../../pages/pages.selectors'
import { getWalletProviderByBlockchain } from '../wallets.selectors'
import { createWalletConnect2 } from '../wallets.utils'

let web3Modal

const connectWithFtmWallet = async (_dispatch) => {
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
            network: 'fantom',
            rpc: {
              [settings.rpc.mainnet.ftm.chainId]: settings.rpc.mainnet.ftm.endpoint,
            },
          },
        },
        'custom-walletconnectv2': createWalletConnect2(settings.rpc.mainnet.ftm.chainId),
        walletlink: {
          package: WalletLink,
          options: {
            appName: settings.dappName,
            rpc: settings.rpc.mainnet.ftm.endpoint,
            chainId: settings.rpc.mainnet.ftm.chainId,
            darkMode: getTheme() === 'dark',
          },
        },
      },
    })

    const provider = await web3Modal.connect()
    await _connectionSuccesfull(provider, _dispatch, {
      type: 'multiWallet',
    })

    /*provider.on('chainChanged', _chainId => {
      if (Number(_chainId) !== settings.rpc.mainnet.ftm.chainId) {
        toastr.error('Invalid Fantom Network. Please use chainId = settings.rpc.mainnet.ftm.chainId')
        return
      }
    })*/

    provider.on('accountsChanged', (_accounts) => {
      _dispatch({
        type: WALLET_FTM_ACCOUNT_CHANGED,
        payload: {
          account: _accounts[0],
        },
      })
    })
  } catch (_err) {
    console.error(_err)
  }
}

const disconnectFromFtmWallet = async (_dispatch) => {
  const provider = getWalletProviderByBlockchain('FTM')
  if (provider.close) {
    await provider.close()
  }
  await web3Modal.clearCachedProvider()
  _dispatch({
    type: WALLET_FTM_DISCONNECTED,
  })
}

const _connectionSuccesfull = async (_provider, _dispatch) => {
  try {
    const { accounts, chainId } = _provider
    const account = accounts ? accounts[0] : await _getAccount(_provider)

    if (Number(chainId) !== settings.rpc.mainnet.ftm.chainId && _provider.isMetaMask) {
      try {
        await changeNetwork({
          provider: _provider,
          chainId: settings.rpc.mainnet.ftm.chainId,
        })
      } catch (err) {
        if (err.code === 4902) {
          await setupNetwork({
            provider: _provider,
            chainId: settings.rpc.mainnet.ftm.chainId,
            chainName: 'Fantom',
            nativeCurrency: {
              name: 'FTM',
              symbol: 'ftm',
              decimals: 18,
            },
            nodes: [settings.rpc.mainnet.ftm.endpoint],
            blockExplorerUrls: [settings.explorers.mainnet.ftm],
          })
        }
      }

      _dispatch({
        type: WALLET_FTM_CONNECTED,
        payload: {
          provider: _provider,
          account,
          network: 'mainnet',
          chainId: settings.rpc.mainnet.ftm.chainId,
        },
      })
      return
    } else if (Number(chainId) === settings.rpc.mainnet.ftm.chainId) {
      _dispatch({
        type: WALLET_FTM_CONNECTED,
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
    console.error(`Error during getting Fantom account ${_err.message}`)
  }
}

export { connectWithFtmWallet, disconnectFromFtmWallet }
