import settings from '../settings'
import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PBTC_ON_EOS_TESTNET
} from '../constants'

const getCorrespondingExplorerLink = (_pToken, _role, _address) => {
  switch (_pToken.id) {
    case PBTC_ON_ETH_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PBTC_ON_ETH_MAINNET].btc.explorer}`
        : `${settings[PBTC_ON_ETH_MAINNET].eth.explorer}address/${_address}`
    }
    case PBTC_ON_ETH_TESTNET: {
      return _role === 'issuer'
        ? `${settings[PBTC_ON_ETH_TESTNET].btc.explorer}`
        : `${settings[PBTC_ON_ETH_TESTNET].eth.explorer}address/${_address}`
    }
    case PBTC_ON_EOS_TESTNET: {
      return _role === 'issuer'
        ? `${settings[PBTC_ON_EOS_TESTNET].btc.explorer}tx/`
        : `${settings[PBTC_ON_EOS_TESTNET].eos.explorer}transaction/`
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
    default:
      break
  }
}

export { getCorrespondingExplorerLink, getCorrespondingBaseTxExplorerLink }

/*
return _role === 'issuer'
        ? `${settings.peos.eos.explorer}account/${_address}`
        : `${settings.peos.eth.explorer}address/${_address}`
    case 'pBTC':
      return _role === 'issuer'
        ? `${settings.pbtc[_network].btc.explorer}`
        : `${settings.pbtc[_network].eth.explorer}address/${_address}`
    case 'pLTC':
      return _role === 'issuer'
        ? `${settings.pltc.ltc.explorer}`
        : `${settings.pltc.eth.explorer}address/${_address}`
    default:
      break*/

/*

switch (_pTokenName) {
    case 'pEOS':
      return _role === 'issuer'
        ? `${settings.peos.eos.explorer}transaction/`
        : `${settings.peos.eth.explorer}tx/`
    case 'pBTC':
      return _role === 'issuer'
        ? `${settings.pbtc[_network].btc.explorer}tx/`
        : `${settings.pbtc[_network].eth.explorer}tx/`
    case 'pLTC':
      return _role === 'issuer'
        ? `${settings.pltc.ltc.explorer}tx/`
        : `${settings.pltc.eth.explorer}tx/`
    default:
      break
  }*/
