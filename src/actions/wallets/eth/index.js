import Web3 from 'web3'
import Web3Connect from 'web3connect'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Portis from '@portis/web3'
import Fortmatic from 'fortmatic'
//import Torus from "@toruslabs/torus-embed";
//import Squarelink from 'squarelink'
import settings from '../../../settings'

import {
  WALLET_ISSUER_CONNECTED,
  WALLET_REDEEMER_CONNECTED
} from '../../../constants'

let web3Connect

const connectWithEthWallet = async (
  _pToken,
  _role,
  _currentProvider,
  _dispatch,
  _force = null
) => {
  web3Connect = new Web3Connect.Core({
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: settings[_pToken.id].infuraProjectId
        }
      },
      portis: {
        package: Portis,
        options: {
          id: settings[_pToken.id].eth.portisDappId
        }
      },
      fortmatic: {
        package: Fortmatic,
        options: {
          key: settings[_pToken.id].eth.fortmaticKey
        }
      }
      /*torus: {
        package: Torus, 
        options: {
          showTorusButton: true,
          enableLogging: true,
          network: {
            host: settings[_pTokenName.toLowerCase()].eth.network,
            chainId: settings[_pTokenName.toLowerCase()].eth.chainId,
          },
        }
      }*/
    }
  })

  if (_currentProvider) {
    return
  }

  if (web3Connect.injectedProvider && !_force) {
    const provider = await Web3Connect.ConnectToInjected()
    const wallet = {
      name: _getWalletNameByProvider(provider),
      type: 'multiWallet'
    }
    _connectionSuccesfull(provider, _dispatch, _role, wallet)
    return
  }

  web3Connect.on('connect', provider => {
    const wallet = {
      name: _getWalletNameByProvider(provider),
      type: 'multiWallet'
    }
    _connectionSuccesfull(provider, _dispatch, _role, wallet)
  })

  if (_force) web3Connect.toggleModal()
}

const disconnectFromEthWallet = () => {
  //TODO: disconnect from ETH wallet
}

const _connectionSuccesfull = async (_provider, _dispatch, _role, _wallet) => {
  const account = await _getAccount(_provider)
  _dispatch({
    type:
      _role === 'issuer' ? WALLET_ISSUER_CONNECTED : WALLET_REDEEMER_CONNECTED,
    payload: {
      provider: _provider,
      account,
      wallet: _wallet
    }
  })
}

const _getAccount = async _provider => {
  const web3 = new Web3(_provider)
  const accounts = await web3.eth.getAccounts()
  return accounts[0]
}

const _getWalletNameByProvider = _provider => {
  if (_provider.isWalletConnect) return 'Wallet Connect'
  if (_provider.isPortis) return 'Portis'
  if (_provider.isFortmatic) return 'Fortmatic'
  else return 'Metamask'
}

export { connectWithEthWallet, disconnectFromEthWallet }
