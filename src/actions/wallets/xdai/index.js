import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { toastr } from 'react-redux-toastr'
import {
  WALLET_ISSUER_CONNECTED,
  WALLET_REDEEMER_CONNECTED,
  WALLET_ISSUER_ACCOUNT_CHANGED,
  WALLET_REDEEMER_ACCOUNT_CHANGED,
  WALLET_ISSUER_NETWORK_CHANGED,
  WALLET_REDEEMER_NETWORK_CHANGED
} from '../../../constants'

const connectWithXdaiWallet = async (_pToken, _role, _currentProvider, _dispatch, _force = null) => {
  try {
    if (!_force) return

    if (document.getElementById('WEB3_CONNECT_MODAL_ID')) {
      document.getElementById('WEB3_CONNECT_MODAL_ID').remove()
    }

    const web3Modal = new Web3Modal({})

    const provider = await web3Modal.connect()
    _connectionSuccesfull(_pToken, provider, _dispatch, _role, {
      type: 'multiWallet'
    })

    provider.on('chainChanged', _chainId => {
      if (Number(_chainId) !== 100) {
        toastr.error('Invalid Ethereum Network. Please switch on Mainnet!')
      }

      // NOTE: store network even if is not used for possible future uses
      _dispatch({
        type: _role === 'issuer' ? WALLET_ISSUER_NETWORK_CHANGED : WALLET_REDEEMER_NETWORK_CHANGED,
        payload: {
          network: Number(_chainId) === 100 ? 'mainnet' : 'testnet'
        }
      })
    })

    provider.on('accountsChanged', _accounts => {
      _dispatch({
        type: _role === 'issuer' ? WALLET_ISSUER_ACCOUNT_CHANGED : WALLET_REDEEMER_ACCOUNT_CHANGED,
        payload: {
          account: _accounts[0]
        }
      })
    })
  } catch (_err) {
    console.error(_err)
  }
}

const disconnectFromXdaiWallet = () => {
  //TODO: disconnect from ETH wallet
}

const _connectionSuccesfull = async (_pToken, _provider, _dispatch, _role, _wallet) => {
  try {
    const { accounts, chainId } = _provider
    if (Number(chainId) !== 100 && _pToken.redeemFrom === 'XDAI') {
      toastr.error('Invalid xDai Network. Please use chain id = 100')
    }

    const account = accounts ? accounts[0] : await _getAccount(_provider)
    _dispatch({
      type: _role === 'issuer' ? WALLET_ISSUER_CONNECTED : WALLET_REDEEMER_CONNECTED,
      payload: {
        provider: _provider,
        account,
        wallet: _wallet,
        pToken: _pToken,
        type: _pToken.redeemFrom,
        network: Number(chainId) === 100 ? 'mainnet' : 'testnet'
      }
    })
  } catch (_err) {
    toastr.error('Error during connection with xDai wallet')
  }
}

const _getAccount = async _provider => {
  try {
    const web3 = new Web3(_provider)
    const accounts = await web3.eth.getAccounts()
    return accounts[0]
  } catch (_err) {
    console.error(`Error during getting xDai account ${_err.message}`)
  }
}

export { connectWithXdaiWallet, disconnectFromXdaiWallet }
