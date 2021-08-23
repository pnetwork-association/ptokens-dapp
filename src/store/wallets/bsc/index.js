import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { WALLET_BSC_CONNECTED, WALLET_BSC_DISCONNECTED, WALLET_BSC_ACCOUNT_CHANGED } from '../../../constants'
import WalletConnectProvider from '@walletconnect/web3-provider'
import settings from '../../../settings'
import { setupNetwork } from '../../../utils/wallet'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'
import { getWalletProviderByBlockchain } from '../wallets.selectors'

let web3Modal

const connectWithBscWallet = async _dispatch => {
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
            network: 'binance',
            rpc: {
              56: settings.rpc.mainnet.bsc.endpoint
            }
          }
        }
      }
    })

    const provider = await web3Modal.connect()
    _connectionSuccesfull(provider, _dispatch, {
      type: 'multiWallet'
    })

    /*provider.on('chainChanged', _chainId => {
      if (Number(_chainId) !== 56) {
        toastr.error('Invalid Binance Smart Chain Network. Please use chainId = 56')
        return
      }
    })*/

    provider.on('accountsChanged', _accounts => {
      _dispatch({
        type: WALLET_BSC_ACCOUNT_CHANGED,
        payload: {
          account: _accounts[0]
        }
      })
    })
  } catch (_err) {
    console.error(_err)
  }
}

const disconnectFromBscWallet = async _dispatch => {
  const provider = getWalletProviderByBlockchain('BSC')
  if (provider.close) {
    await provider.close()
  }
  await web3Modal.clearCachedProvider()
  _dispatch({
    type: WALLET_BSC_DISCONNECTED
  })
}

const _connectionSuccesfull = async (_provider, _dispatch) => {
  try {
    const { accounts, chainId } = _provider
    const account = accounts ? accounts[0] : await _getAccount(_provider)

    if (Number(chainId) !== 56 && _provider.isMetaMask) {
      await setupNetwork({
        provider: _provider,
        chainId: 56,
        nativeCurrency: {
          name: 'BNB',
          symbol: 'bnb',
          decimals: 18
        },
        nodes: [settings.rpc.mainnet.bsc.endpoint],
        blockExplorerUrls: [settings.explorers.mainnet.bsc]
      })

      _dispatch({
        type: WALLET_BSC_CONNECTED,
        payload: {
          provider: _provider,
          account,
          network: 'mainnet',
          chainId: 56
        }
      })
      return
    } else if (Number(chainId) === 56) {
      _dispatch({
        type: WALLET_BSC_CONNECTED,
        payload: {
          provider: _provider,
          account,
          network: 'mainnet',
          chainId
        }
      })
    }
  } catch (_err) {
    console.error(_err)
  }
}

const _getAccount = async _provider => {
  try {
    const web3 = new Web3(_provider)
    const accounts = await web3.eth.getAccounts()
    return accounts[0]
  } catch (_err) {
    console.error(`Error during getting Binance Smart Chain account ${_err.message}`)
  }
}

export { connectWithBscWallet, disconnectFromBscWallet }
