import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Portis from '@portis/web3'
import Fortmatic from 'fortmatic'
import settings from '../../../settings'
import { WALLET_ETH_CONNECTED, WALLET_ETH_NETWORK_CHANGED, WALLET_ETH_ACCOUNT_CHANGED } from '../../../constants'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'

const connectWithEthWallet = async _dispatch => {
  try {
    if (document.getElementById('WEB3_CONNECT_MODAL_ID')) {
      document.getElementById('WEB3_CONNECT_MODAL_ID').remove()
    }

    const web3Modal = new Web3Modal({
      theme: getWeb3ModalTheme(getTheme()),
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            network: 'mainnet',
            rpc: {
              1: settings.rpc.mainnet.eth.endpoint
            }
          }
        },
        portis: {
          package: Portis,
          options: {
            id: settings.portisDappId
          }
        },
        fortmatic: {
          package: Fortmatic,
          options: {
            key: settings.fortmaticKey
          }
        }
      }
    })

    const provider = await web3Modal.connect()
    _connectionSuccesfull(provider, _dispatch, {
      type: 'multiWallet'
    })

    provider.on('chainChanged', _chainId => {
      _dispatch({
        type: WALLET_ETH_NETWORK_CHANGED,
        payload: {
          network: Number(_chainId) === 1 ? 'mainnet' : 'testnet',
          chainId: _chainId
        }
      })
    })

    provider.on('accountsChanged', _accounts => {
      _dispatch({
        type: WALLET_ETH_ACCOUNT_CHANGED,
        payload: {
          account: _accounts[0]
        }
      })
    })
  } catch (_err) {
    console.error(_err)
  }
}

const disconnectFromEthWallet = () => {
  //TODO: disconnect from ETH wallet
}

const _connectionSuccesfull = async (_provider, _dispatch) => {
  try {
    const { accounts, chainId } = _provider
    const account = accounts ? accounts[0] : await _getAccount(_provider)

    if (Number(chainId) === 1) {
      _dispatch({
        type: WALLET_ETH_CONNECTED,
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
    console.error(`Error during getting Ethereum account ${_err.message}`)
  }
}

export { connectWithEthWallet, disconnectFromEthWallet }
