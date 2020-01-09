import {
  connectWithScatter,
  disconnectFromScatter
} from './eos'
import {
  connectWithEthWallet,
  disconnectFromEthWallet
} from './eth'

const connectWithCorrectWallets = (_pTokenName, _currentProviders, _force) => {
  return dispatch => {

    const {
      issuer,
      redeemer
    } = _currentProviders

    switch (_pTokenName) {
      case 'pEOS': {
        connectWithScatter(issuer, dispatch)
        connectWithEthWallet('pEOS', 'redeemer', redeemer, dispatch, _force)
        break
      }

      case 'pBTC': {
        connectWithEthWallet('pBTC', 'redeemer', redeemer, dispatch, _force)
        break
      }
      default: break
    }
  }
}

const connectWithSpecificWallet = (_pTokenName, _role, _force) => {
  return dispatch => {
    switch(_pTokenName) {
      case 'pEOS': {
        _role === 'issuer'
          ? connectWithScatter('issuer', dispatch, _force)
          : connectWithEthWallet('pEOS', 'redeemer', null, dispatch, _force)
        break
      }
      case 'pBTC': {
        connectWithEthWallet('pBTC', 'redeemer', null, dispatch, _force)
        break
      }
      default: break
    }
  }
}

const disconnectFromSpecificWallet = (_pTokenName, _role) => {
  return dispatch => {
    switch(_pTokenName) {
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
      default: break
    }
  }
}

const changeSpecificWallet = (_pTokenName, _role) => {
  return dispatch => {
    switch(_pTokenName) {
      case 'pEOS': {
        _role === 'issuer'
          ? console.log('Available only 1 EOS wallet')
          : connectWithEthWallet('pEOS', 'redeemer', null, dispatch, true)
        break
      }
      case 'pBTC': {
        connectWithEthWallet('pBTC', 'redeemer', null, dispatch, true)
        break
      }
      default: break
    }
  }
}

export {
  connectWithCorrectWallets,
  connectWithSpecificWallet,
  disconnectFromSpecificWallet,
  changeSpecificWallet
}