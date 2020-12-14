import settings from '../settings'
import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PBTC_ON_EOS_TESTNET,
  PBTC_ON_TELOS_MAINNET,
  PBTC_ON_EOS_MAINNET,
  PLTC_ON_ETH_MAINNET,
  PLTC_ON_ETH_TESTNET,
  PLTC_ON_EOS_MAINNET,
  PETH_ON_EOS_MAINNET,
  PNT_ON_EOS_MAINNET,
  PMKR_ON_EOS_MAINNET,
  PLINK_ON_EOS_MAINNET,
  PYFI_ON_EOS_MAINNET,
  PTERIA_ON_EOS_MAINNET,
  PUNI_ON_EOS_MAINNET,
  PBAL_ON_EOS_MAINNET,
  PBAND_ON_EOS_MAINNET,
  PCOMP_ON_EOS_MAINNET,
  PSNX_ON_EOS_MAINNET,
  POMG_ON_EOS_MAINNET,
  PDAI_ON_EOS_MAINNET,
  PANT_ON_EOS_MAINNET,
  PLRC_ON_EOS_MAINNET
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
    case PBTC_ON_TELOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PBTC_ON_TELOS_MAINNET].btc.explorer}address/${_address}`
        : `${settings[PBTC_ON_TELOS_MAINNET].telos.explorer}accounts/${_address}`
    }
    case PLTC_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PLTC_ON_EOS_MAINNET].ltc.explorer}address/${_address}`
        : `${settings[PLTC_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PLTC_ON_ETH_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PLTC_ON_ETH_MAINNET].ltc.explorer}address/${_address}`
        : `${settings[PLTC_ON_ETH_MAINNET].eth.explorer}address/${_address}`
    }
    case PLTC_ON_ETH_TESTNET: {
      return _role === 'issuer'
        ? `${settings[PLTC_ON_ETH_TESTNET].ltc.explorer}address/${_address}`
        : `${settings[PLTC_ON_ETH_TESTNET].eth.explorer}address/${_address}`
    }
    case PETH_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PETH_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PETH_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PMKR_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PMKR_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PMKR_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PNT_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PNT_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PNT_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PLINK_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PLINK_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PLINK_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PYFI_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PYFI_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PYFI_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PTERIA_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PTERIA_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PTERIA_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PUNI_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PUNI_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PUNI_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PBAND_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PBAND_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PBAND_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PBAL_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PBAL_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PBAL_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PCOMP_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PCOMP_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PCOMP_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PSNX_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PSNX_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PSNX_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case POMG_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[POMG_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[POMG_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PDAI_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PDAI_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PDAI_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PANT_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PANT_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PANT_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PLRC_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PLRC_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PLRC_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
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
    case PBTC_ON_TELOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PBTC_ON_TELOS_MAINNET].btc.explorer}tx/`
        : `${settings[PBTC_ON_TELOS_MAINNET].telos.explorer}transaction/`
    }
    case PLTC_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PLTC_ON_EOS_MAINNET].ltc.explorer}tx/`
        : `${settings[PLTC_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PLTC_ON_ETH_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PLTC_ON_ETH_MAINNET].ltc.explorer}tx/`
        : `${settings[PLTC_ON_ETH_MAINNET].eth.explorer}tx/`
    }
    case PLTC_ON_ETH_TESTNET: {
      return _role === 'issuer'
        ? `${settings[PLTC_ON_ETH_TESTNET].ltc.explorer}tx/`
        : `${settings[PLTC_ON_ETH_TESTNET].eth.explorer}tx/`
    }
    case PETH_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PETH_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PETH_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PLINK_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PLINK_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PLINK_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PMKR_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PMKR_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PMKR_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PYFI_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PYFI_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PYFI_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PNT_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PNT_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PNT_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PTERIA_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PTERIA_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PTERIA_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PUNI_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PUNI_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PUNI_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PBAND_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PBAND_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PBAND_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PBAL_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PBAL_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PBAL_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PCOMP_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PCOMP_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PCOMP_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PSNX_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PSNX_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PSNX_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case POMG_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[POMG_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[POMG_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PDAI_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PDAI_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PDAI_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PANT_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PANT_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PANT_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PLRC_ON_EOS_MAINNET: {
      return _role === 'issuer'
        ? `${settings[PLRC_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PLRC_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    default:
      break
  }
}

export { getCorrespondingExplorerLink, getCorrespondingBaseTxExplorerLink }
