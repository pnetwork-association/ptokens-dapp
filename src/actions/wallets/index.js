import { connectWithScatter, disconnectFromScatter } from './eos'
import { connectWithEthWallet, disconnectFromEthWallet } from './eth'

const connectWithCorrectWallets = (_pToken, _currentProviders, _force) => {
  return dispatch => {
    const { redeemer } = _currentProviders

    switch (_pToken.name) {
      case 'pEOS': {
        connectWithScatter('issuer', dispatch)
        connectWithEthWallet(_pToken, 'redeemer', redeemer, dispatch, _force)
        break
      }
      case 'pBTC': {
        connectWithEthWallet(_pToken, 'redeemer', redeemer, dispatch, _force)
        break
      }
      case 'pLTC': {
        connectWithEthWallet(_pToken, 'redeemer', redeemer, dispatch, _force)
        break
      }
      default:
        break
    }
  }
}

const connectWithSpecificWallet = (_pToken, _role, _force) => {
  return dispatch => {
    switch (_pToken.name) {
      case 'pEOS': {
        _role === 'issuer'
          ? connectWithScatter('issuer', dispatch, _force)
          : connectWithEthWallet(_pToken, 'redeemer', null, dispatch, _force)
        break
      }
      case 'pBTC': {
        //issuer not present in pbtc
        if (_role === 'redeemer')
          connectWithEthWallet(_pToken, 'redeemer', null, dispatch, _force)

        break
      }
      case 'pLTC': {
        //issuer not present in pbtc
        if (_role === 'redeemer')
          connectWithEthWallet(_pToken, 'redeemer', null, dispatch, _force)

        break
      }
      default:
        break
    }
  }
}

const disconnectFromSpecificWallet = (_pToken, _role) => {
  return dispatch => {
    switch (_pToken.name) {
      case 'pEOS': {
        _role === 'issuer'
          ? disconnectFromScatter('issuer', dispatch)
          : disconnectFromEthWallet('redeemer', null, dispatch)
        break
      }
      case 'pBTC': {
        disconnectFromEthWallet('redeemer', null, dispatch)
        break
      }
      case 'pLTC': {
        disconnectFromEthWallet('redeemer', null, dispatch)
        break
      }
      default:
        break
    }
  }
}

const changeSpecificWallet = (_pToken, _role) => {
  return dispatch => {
    switch (_pToken.name) {
      case 'pEOS': {
        _role === 'issuer'
          ? console.log('Available only 1 EOS wallet')
          : connectWithEthWallet(_pToken, 'redeemer', null, dispatch, true)
        break
      }
      case 'pBTC': {
        connectWithEthWallet(_pToken, 'redeemer', null, dispatch, true)
        break
      }
      case 'pLTC': {
        connectWithEthWallet(_pToken, 'redeemer', null, dispatch, true)
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
