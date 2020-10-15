import Web3 from 'web3'
import Web3Connect from 'web3connect'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Portis from '@portis/web3'
import Fortmatic from 'fortmatic'
import settings from '../../../settings'

import {
  WALLET_ISSUER_CONNECTED,
  WALLET_REDEEMER_CONNECTED
} from '../../../constants'

const web3Connect = new Web3Connect.Core({
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: settings[0].eth.infuraProjectId
      }
    },
    portis: {
      package: Portis,
      options: {
        id: settings[0].eth.portisDappId
      }
    },
    fortmatic: {
      package: Fortmatic,
      options: {
        key: settings[0].eth.fortmaticKey
      }
    }
  }
})

const connectWithEthWallet = async (
  _pToken,
  _role,
  _currentProvider,
  _dispatch,
  _force = null
) => {
  if (_currentProvider) {
    return
  }

  if (web3Connect.providerController.injectedProvider && !_force) {
    const provider = await web3Connect.connectTo('injected')
    const wallet = {
      name: _getWalletNameByProvider(provider),
      type: 'multiWallet'
    }
    _connectionSuccesfull(_pToken, provider, _dispatch, _role, wallet)
    return
  }

  web3Connect.on('connect', provider => {
    const wallet = {
      name: _getWalletNameByProvider(provider),
      type: 'multiWallet'
    }
    _connectionSuccesfull(_pToken, provider, _dispatch, _role, wallet)
  })

  if (_force) web3Connect.toggleModal()
}

const disconnectFromEthWallet = () => {
  //TODO: disconnect from ETH wallet
}

const _connectionSuccesfull = async (
  _pToken,
  _provider,
  _dispatch,
  _role,
  _wallet
) => {
  const account = await _getAccount(_provider)
  _dispatch({
    type:
      _role === 'issuer' ? WALLET_ISSUER_CONNECTED : WALLET_REDEEMER_CONNECTED,
    payload: {
      provider: _provider,
      account,
      wallet: _wallet,
      pToken: _pToken
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
