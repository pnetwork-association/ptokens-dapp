import settings from '../settings'
import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PBTC_ON_EOS_TESTNET,
  PBTC_ON_EOS_MAINNET,
  PLTC_ON_ETH_MAINNET,
  PLTC_ON_ETH_TESTNET
} from '../constants'

const getCorrespondingExplorerLink = (_pToken, _role, _address) => {
  switch (_pToken.id) {
    case PBTC_ON_ETH_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PBTC_ON_ETH_MAINNET].btc.explorer}address/${_address}`
        : `${settings[PBTC_ON_ETH_MAINNET].eth.explorer}address/${_address}`
    }
    case PBTC_ON_ETH_TESTNET: {
      return _role === 'issuer'
        ? `${settings[PBTC_ON_ETH_TESTNET].btc.explorer}address/${_address}`
        : `${settings[PBTC_ON_ETH_TESTNET].eth.explorer}address/${_address}`
    }
    case PBTC_ON_EOS_TESTNET: {
      return _role === 'issuer'
        ? `${settings[PBTC_ON_EOS_TESTNET].btc.explorer}address/${_address}`
        : `${settings[PBTC_ON_EOS_TESTNET].eos.explorer}accounts/${_address}`
    }
    case PBTC_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PBTC_ON_EOS_MAINNET].btc.explorer}address/${_address}`
        : `${settings[PBTC_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PLTC_ON_ETH_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PLTC_ON_ETH_MAINNET].ltc.explorer}address/${_address}`
        : `${settings[PLTC_ON_ETH_MAINNET].eth.explorer}address/${_address}`
    }
    case PLTC_ON_ETH_TESTNET: {
      return _role === 'issuer'
        ? `${settings[PLTC_ON_ETH_MAINNET].ltc.explorer}address/${_address}`
        : `${settings[PLTC_ON_ETH_MAINNET].eth.explorer}address/${_address}`
    }
    default:
      break
  }
}

const getCorrespondingBaseTxExplorerLink = (_pToken, _role) => {
  switch (_pToken.id) {
    case PBTC_ON_ETH_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PBTC_ON_ETH_MAINNET].btc.explorer}tx/`
        : `${settings[PBTC_ON_ETH_MAINNET].eth.explorer}tx/`
    }
    case PBTC_ON_ETH_TESTNET: {
      return _role === 'issuer'
        ? `${settings[PBTC_ON_ETH_TESTNET].btc.explorer}tx/`
        : `${settings[PBTC_ON_ETH_TESTNET].eth.explorer}tx/`
    }
    case PBTC_ON_EOS_TESTNET: {
      return _role === 'issuer'
        ? `${settings[PBTC_ON_EOS_TESTNET].btc.explorer}tx/`
        : `${settings[PBTC_ON_EOS_TESTNET].eos.explorer}transaction/`
    }
    case PBTC_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PBTC_ON_EOS_MAINNET].btc.explorer}tx/`
        : `${settings[PBTC_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PLTC_ON_ETH_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PLTC_ON_ETH_MAINNET].ltc.explorer}tx/`
        : `${settings[PLTC_ON_ETH_MAINNET].eth.explorer}tx/`
    }
    case PLTC_ON_ETH_TESTNET: {
      return _role === 'issuer'
        ? `${settings[PLTC_ON_ETH_MAINNET].ltc.explorer}tx/`
        : `${settings[PLTC_ON_ETH_MAINNET].eth.explorer}tx/`
    }
    default:
      break
  }
}

export { getCorrespondingExplorerLink, getCorrespondingBaseTxExplorerLink }
