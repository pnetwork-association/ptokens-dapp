import { connectWithScatter, disconnectFromScatter } from './eos'
import { connectWithEthWallet, disconnectFromEthWallet } from './eth'
import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PBTC_ON_EOS_TESTNET,
  PBTC_ON_EOS_MAINNET,
  PLTC_ON_ETH_MAINNET,
  PLTC_ON_ETH_TESTNET,
  PLTC_ON_EOS_MAINNET
} from '../../constants'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const connectWithCorrectWallets = (_pToken, _currentProviders, _force) => {
  return async dispatch => {
    const release = await mutex.acquire()

    const { redeemer } = _currentProviders

    switch (_pToken.id) {
      case PBTC_ON_ETH_MAINNET: {
        connectWithEthWallet(_pToken, 'redeemer', redeemer, dispatch, _force)
        break
      }
      case PBTC_ON_ETH_TESTNET: {
        connectWithEthWallet(_pToken, 'redeemer', redeemer, dispatch, _force)
        break
      }
      case PBTC_ON_EOS_MAINNET: {
        connectWithScatter(_pToken, 'redeemer', dispatch)
        break
      }
      case PLTC_ON_EOS_MAINNET: {
        connectWithScatter(_pToken, 'redeemer', dispatch)
        break
      }
      case PBTC_ON_EOS_TESTNET: {
        connectWithScatter(_pToken, 'redeemer', dispatch)
        break
      }
      case PLTC_ON_ETH_MAINNET: {
        connectWithEthWallet(_pToken, 'redeemer', redeemer, dispatch, _force)
        break
      }
      case PLTC_ON_ETH_TESTNET: {
        connectWithEthWallet(_pToken, 'redeemer', redeemer, dispatch, _force)
        break
      }
      default:
        break
    }
    release()
  }
}

const connectWithSpecificWallet = (_pToken, _role, _force) => {
  return async dispatch => {
    const release = await mutex.acquire()

    switch (_pToken.id) {
      case PBTC_ON_ETH_MAINNET: {
        if (_role === 'redeemer')
          connectWithEthWallet(_pToken, 'redeemer', null, dispatch, _force)
        break
      }
      case PBTC_ON_ETH_TESTNET: {
        if (_role === 'redeemer')
          connectWithEthWallet(_pToken, 'redeemer', null, dispatch, _force)
        break
      }
      case PBTC_ON_EOS_MAINNET: {
        if (_role === 'redeemer')
          connectWithScatter(_pToken, 'redeemer', dispatch)
        break
      }
      case PLTC_ON_EOS_MAINNET: {
        if (_role === 'redeemer')
          connectWithScatter(_pToken, 'redeemer', dispatch)
        break
      }
      case PBTC_ON_EOS_TESTNET: {
        if (_role === 'redeemer')
          connectWithScatter(_pToken, 'redeemer', dispatch)
        break
      }
      case PLTC_ON_ETH_MAINNET: {
        if (_role === 'redeemer')
          connectWithEthWallet(_pToken, 'redeemer', null, dispatch, _force)
        break
      }
      case PLTC_ON_ETH_TESTNET: {
        if (_role === 'redeemer')
          connectWithEthWallet(_pToken, 'redeemer', null, dispatch, _force)
        break
      }
      default:
        break
    }

    release()
  }
}

const disconnectFromSpecificWallet = (_pToken, _role) => {
  return async dispatch => {
    const release = await mutex.acquire()

    switch (_pToken.id) {
      case PBTC_ON_ETH_MAINNET: {
        if (_role === 'redeemer')
          disconnectFromEthWallet('redeemer', null, dispatch)
        break
      }
      case PBTC_ON_ETH_TESTNET: {
        if (_role === 'redeemer')
          disconnectFromEthWallet('redeemer', null, dispatch)
        break
      }
      case PBTC_ON_EOS_MAINNET: {
        if (_role === 'redeemer')
          disconnectFromScatter(_pToken, 'redeemer', dispatch)
        break
      }
      case PLTC_ON_EOS_MAINNET: {
        if (_role === 'redeemer')
          disconnectFromScatter(_pToken, 'redeemer', dispatch)
        break
      }
      case PBTC_ON_EOS_TESTNET: {
        if (_role === 'redeemer')
          disconnectFromScatter(_pToken, 'redeemer', dispatch)
        break
      }
      case PLTC_ON_ETH_MAINNET: {
        if (_role === 'redeemer')
          disconnectFromEthWallet('redeemer', null, dispatch)
        break
      }
      case PLTC_ON_ETH_TESTNET: {
        if (_role === 'redeemer')
          disconnectFromEthWallet('redeemer', null, dispatch)
        break
      }
      default:
        break
    }

    release()
  }
}

const changeSpecificWallet = (_pToken, _role) => {
  return async dispatch => {
    const release = await mutex.acquire()

    switch (_pToken.id) {
      case PBTC_ON_ETH_MAINNET: {
        connectWithEthWallet(_pToken, 'redeemer', null, dispatch, true)
        break
      }
      case PBTC_ON_ETH_TESTNET: {
        connectWithEthWallet(_pToken, 'redeemer', null, dispatch, true)
        break
      }
      case PBTC_ON_EOS_MAINNET: {
        connectWithScatter(_pToken, 'redeemer', dispatch)
        break
      }
      case PLTC_ON_EOS_MAINNET: {
        connectWithScatter(_pToken, 'redeemer', dispatch)
        break
      }
      case PBTC_ON_EOS_TESTNET: {
        connectWithScatter(_pToken, 'redeemer', dispatch)
        break
      }
      case PLTC_ON_ETH_MAINNET: {
        connectWithEthWallet(_pToken, 'redeemer', null, dispatch, true)
        break
      }
      case PLTC_ON_ETH_TESTNET: {
        connectWithEthWallet(_pToken, 'redeemer', null, dispatch, true)
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
