import { connectWithEosWallet, disconnectFromEosWallet } from './eos'
import { connectWithEthWallet, disconnectFromEthWallet } from './eth'
import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PBTC_ON_EOS_TESTNET,
  PBTC_ON_EOS_MAINNET,
  PLTC_ON_ETH_MAINNET,
  PLTC_ON_ETH_TESTNET,
  PLTC_ON_EOS_MAINNET,
  PETH_ON_EOS_MAINNET
} from '../../constants'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const connectWithCorrectWallets = (_pToken, _currentProviders, _force) => {
  return async _dispatch => {
    const release = await mutex.acquire()

    const { redeemer, issuer } = _currentProviders

    switch (_pToken.id) {
      case PBTC_ON_ETH_MAINNET: {
        connectWithEthWallet(_pToken, 'redeemer', redeemer, _dispatch, _force)
        break
      }
      case PBTC_ON_ETH_TESTNET: {
        connectWithEthWallet(_pToken, 'redeemer', redeemer, _dispatch, _force)
        break
      }
      case PBTC_ON_EOS_MAINNET: {
        connectWithEosWallet(_pToken, 'redeemer', _dispatch, _force)
        break
      }
      case PLTC_ON_EOS_MAINNET: {
        connectWithEosWallet(_pToken, 'redeemer', _dispatch, _force)
        break
      }
      case PBTC_ON_EOS_TESTNET: {
        connectWithEosWallet(_pToken, 'redeemer', _dispatch, _force)
        break
      }
      case PLTC_ON_ETH_MAINNET: {
        connectWithEthWallet(_pToken, 'redeemer', redeemer, _dispatch, _force)
        break
      }
      case PLTC_ON_ETH_TESTNET: {
        connectWithEthWallet(_pToken, 'redeemer', redeemer, _dispatch, _force)
        break
      }
      case PETH_ON_EOS_MAINNET: {
        connectWithEosWallet(_pToken, 'redeemer', _dispatch)
        connectWithEthWallet(_pToken, 'issuer', issuer, _dispatch, _force)
        break
      }
      default:
        break
    }
    release()
  }
}

const connectWithSpecificWallet = (_pToken, _role, _force) => {
  return async _dispatch => {
    const release = await mutex.acquire()

    switch (_pToken.id) {
      case PBTC_ON_ETH_MAINNET: {
        if (_role === 'redeemer')
          connectWithEthWallet(_pToken, 'redeemer', null, _dispatch, _force)
        break
      }
      case PBTC_ON_ETH_TESTNET: {
        if (_role === 'redeemer')
          connectWithEthWallet(_pToken, 'redeemer', null, _dispatch, _force)
        break
      }
      case PBTC_ON_EOS_MAINNET: {
        if (_role === 'redeemer')
          connectWithEosWallet(_pToken, 'redeemer', _dispatch, _force)
        break
      }
      case PLTC_ON_EOS_MAINNET: {
        if (_role === 'redeemer')
          connectWithEosWallet(_pToken, 'redeemer', _dispatch, _force)
        break
      }
      case PBTC_ON_EOS_TESTNET: {
        if (_role === 'redeemer')
          connectWithEosWallet(_pToken, 'redeemer', _dispatch, _force)
        break
      }
      case PLTC_ON_ETH_MAINNET: {
        if (_role === 'redeemer')
          connectWithEthWallet(_pToken, 'redeemer', null, _dispatch, _force)
        break
      }
      case PLTC_ON_ETH_TESTNET: {
        if (_role === 'redeemer')
          connectWithEthWallet(_pToken, 'redeemer', null, _dispatch, _force)
        break
      }
      case PETH_ON_EOS_MAINNET: {
        if (_role === 'redeemer')
          connectWithEosWallet(_pToken, 'redeemer', _dispatch, _force)
        else if (_role === 'issuer') {
          connectWithEthWallet(_pToken, 'issuer', null, _dispatch, _force)
        }
        break
      }
      default:
        break
    }

    release()
  }
}

const disconnectFromSpecificWallet = (_pToken, _role) => {
  return async _dispatch => {
    const release = await mutex.acquire()

    switch (_pToken.id) {
      case PBTC_ON_ETH_MAINNET: {
        if (_role === 'redeemer')
          disconnectFromEthWallet('redeemer', null, _dispatch)
        break
      }
      case PBTC_ON_ETH_TESTNET: {
        if (_role === 'redeemer')
          disconnectFromEthWallet('redeemer', null, _dispatch)
        break
      }
      case PBTC_ON_EOS_MAINNET: {
        if (_role === 'redeemer')
          disconnectFromEosWallet(_pToken, 'redeemer', _dispatch)
        break
      }
      case PLTC_ON_EOS_MAINNET: {
        if (_role === 'redeemer')
          disconnectFromEosWallet(_pToken, 'redeemer', _dispatch)
        break
      }
      case PBTC_ON_EOS_TESTNET: {
        if (_role === 'redeemer')
          disconnectFromEosWallet(_pToken, 'redeemer', _dispatch)
        break
      }
      case PLTC_ON_ETH_MAINNET: {
        if (_role === 'redeemer')
          disconnectFromEthWallet('redeemer', null, _dispatch)
        break
      }
      case PLTC_ON_ETH_TESTNET: {
        if (_role === 'redeemer')
          disconnectFromEthWallet('redeemer', null, _dispatch)
        break
      }
      case PETH_ON_EOS_MAINNET: {
        if (_role === 'redeemer')
          disconnectFromEosWallet(_pToken, 'redeemer', _dispatch)
        else if (_role === 'issuer') {
          disconnectFromEthWallet('issuer', null, _dispatch)
        }
        break
      }
      default:
        break
    }

    release()
  }
}

const changeSpecificWallet = (_pToken, _role) => {
  return async _dispatch => {
    const release = await mutex.acquire()

    switch (_pToken.id) {
      case PBTC_ON_ETH_MAINNET: {
        connectWithEthWallet(_pToken, 'redeemer', null, _dispatch, true)
        break
      }
      case PBTC_ON_ETH_TESTNET: {
        connectWithEthWallet(_pToken, 'redeemer', null, _dispatch, true)
        break
      }
      case PBTC_ON_EOS_MAINNET: {
        connectWithEosWallet(_pToken, 'redeemer', _dispatch, true)
        break
      }
      case PLTC_ON_EOS_MAINNET: {
        connectWithEosWallet(_pToken, 'redeemer', _dispatch, true)
        break
      }
      case PBTC_ON_EOS_TESTNET: {
        connectWithEosWallet(_pToken, 'redeemer', _dispatch, true)
        break
      }
      case PLTC_ON_ETH_MAINNET: {
        connectWithEthWallet(_pToken, 'redeemer', null, _dispatch, true)
        break
      }
      case PLTC_ON_ETH_TESTNET: {
        connectWithEthWallet(_pToken, 'redeemer', null, _dispatch, true)
        break
      }
      case PETH_ON_EOS_MAINNET: {
        if (_role === 'redeemer')
          connectWithEosWallet(_pToken, 'redeemer', _dispatch, true)
        else if (_role === 'issuer') {
          connectWithEthWallet(_pToken, 'issuer', null, _dispatch, true)
        }
        break
      }
      default:
        break
    }

    release()
  }
}

export {
  connectWithCorrectWallets,
  connectWithSpecificWallet,
  disconnectFromSpecificWallet,
  changeSpecificWallet
}
