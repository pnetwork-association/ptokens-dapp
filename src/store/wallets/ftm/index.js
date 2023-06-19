import Web3 from 'web3'
import Web3Modal from 'web3modal'
import {
  WALLET_FTM_CONNECTED,
  WALLET_FTM_DISCONNECTED,
  WALLET_FTM_ACCOUNT_CHANGED,
  DAPP_NAME,
} from '../../../constants'
import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
import { changeNetwork, setupNetwork } from '../../../utils/wallet'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'
import { getWalletProviderByBlockchain } from '../wallets.selectors'
import { Blockchain } from '../../../constants'
import { getExplorerBaseByBlockchain, getRpcNodeEndopointByBlockchain } from '../../settings/settings.selectors'

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
              250: getRpcNodeEndopointByBlockchain(Blockchain.Fantom),
            },
          },
        },
        walletlink: {
          package: WalletLink,
          options: {
            appName: DAPP_NAME,
            rpc: getRpcNodeEndopointByBlockchain(Blockchain.Fantom),
            chainId: 250,
            darkMode: getTheme() === 'dark',
          },
        },
      },
    })

    const provider = await web3Modal.connect()
    _connectionSuccesfull(provider, _dispatch, {
      type: 'multiWallet',
    })

    /*provider.on('chainChanged', _chainId => {
      if (Number(_chainId) !== 250) {
        toastr.error('Invalid Fantom Network. Please use chainId = 250')
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
  const provider = getWalletProviderByBlockchain(Blockchain.Fantom)
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

    if (Number(chainId) !== 250 && _provider.isMetaMask) {
      try {
        await changeNetwork({
          provider: _provider,
          chainId: 250,
        })
      } catch (err) {
        if (err.code === 4902) {
          await setupNetwork({
            provider: _provider,
            chainId: 250,
            chainName: 'Fantom',
            nativeCurrency: {
              name: Blockchain.Fantom,
              symbol: 'ftm',
              decimals: 18,
            },
            nodes: [getRpcNodeEndopointByBlockchain(Blockchain.Fantom)],
            blockExplorerUrls: [getExplorerBaseByBlockchain(Blockchain.Fantom)],
          })
        }
      }

      _dispatch({
        type: WALLET_FTM_CONNECTED,
        payload: {
          provider: _provider,
          account,
          network: 'mainnet',
          chainId: 250,
        },
      })
      return
    } else if (Number(chainId) === 250) {
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
