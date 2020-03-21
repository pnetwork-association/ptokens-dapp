import { connectWithScatter, disconnectFromScatter } from './eos'
import { connectWithEthWallet, disconnectFromEthWallet } from './eth'
import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PBTC_ON_EOS_TESTNET
} from '../../constants'

const connectWithCorrectWallets = (_pToken, _currentProviders, _force) => {
  return dispatch => {
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
      case PBTC_ON_EOS_TESTNET: {
        connectWithScatter(_pToken, 'redeemer', dispatch, _force)
        break
      }
      default:
        break
    }
  }
}

const connectWithSpecificWallet = (_pToken, _role, _force) => {
  return dispatch => {
    switch (_pToken.id) {
      /*case 'pEOS': {
        _role === 'issuer'
          ? connectWithScatter('issuer', dispatch, _force)
          : connectWithEthWallet(_pToken, 'redeemer', null, dispatch, _force)
        break
      }*/

      case PBTC_ON_ETH_MAINNET: {
        //issuer not present in pbtc
        if (_role === 'redeemer')
          connectWithEthWallet(_pToken, 'redeemer', null, dispatch, _force)
        break
      }
      case PBTC_ON_ETH_TESTNET: {
        if (_role === 'redeemer')
          connectWithEthWallet(_pToken, 'redeemer', null, dispatch, _force)
        break
      }
      case PBTC_ON_EOS_TESTNET: {
        if (_role === 'redeemer')
          connectWithScatter(_pToken, 'redeemer', dispatch, _force)
        break
      }
      default:
        break
    }
  }
}

const disconnectFromSpecificWallet = (_pToken, _role) => {
  return dispatch => {
    switch (_pToken.id) {
      /*case 'pEOS': {
        _role === 'issuer'
          ? disconnectFromScatter('issuer', dispatch)
          : disconnectFromEthWallet('redeemer', null, dispatch)
        break
      }*/
      case 'pBTC': {
        disconnectFromEthWallet('redeemer', null, dispatch)
        break
      }
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
      case PBTC_ON_EOS_TESTNET: {
        if (_role === 'redeemer') disconnectFromScatter('redeemer', dispatch)
        break
      }
      default:
        break
    }
  }
}

const changeSpecificWallet = (_pToken, _role) => {
  return dispatch => {
    switch (_pToken.id) {
      /*case 'pEOS': {
        _role === 'issuer'
          ? console.log('Available only PBTC_ON_ETH_TESTNET EOS wallet')
          : connectWithEthWallet(_pToken, 'redeemer', null, dispatch, true)
        break
      }*/
      case PBTC_ON_ETH_MAINNET: {
        connectWithEthWallet(_pToken, 'redeemer', null, dispatch, true)
        break
      }
      case PBTC_ON_ETH_TESTNET: {
        connectWithEthWallet(_pToken, 'redeemer', null, dispatch, true)
        break
      }
      case PBTC_ON_EOS_TESTNET: {
        connectWithScatter(_pToken, 'redeemer', dispatch, true)
        break
      }
      default:
        break
    }
  }
}

export {
  connectWithCorrectWallets,
  connectWithSpecificWallet,
  disconnectFromSpecificWallet,
  changeSpecificWallet
}
