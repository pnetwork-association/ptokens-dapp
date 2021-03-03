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
  PLRC_ON_EOS_MAINNET,
  PUOS_ON_EOS_MAINNET,
  PBAT_ON_EOS_MAINNET,
  PREP_ON_EOS_MAINNET,
  PZRX_ON_EOS_MAINNET,
  PPNK_ON_EOS_MAINNET,
  PDOGE_ON_ETH_MAINNET,
  PEOS_ON_ETH_MAINNET,
  PBTC_ON_BSC_MAINNET,
  PEOS_ON_POLYGON_MAINNET,
  PBTC_ON_XDAI_MAINNET
} from '../constants'

const getCorrespondingExplorerLink = (_id, _role, _address) => {
  switch (_id) {
    case PBTC_ON_ETH_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBTC_ON_ETH_MAINNET].btc.explorer}address/${_address}`
        : `${settings[PBTC_ON_ETH_MAINNET].eth.explorer}address/${_address}`
    }
    case PBTC_ON_ETH_TESTNET: {
      return _role === 'pegin'
        ? `${settings[PBTC_ON_ETH_TESTNET].btc.explorer}address/${_address}`
        : `${settings[PBTC_ON_ETH_TESTNET].eth.explorer}address/${_address}`
    }
    case PBTC_ON_EOS_TESTNET: {
      return _role === 'pegin'
        ? `${settings[PBTC_ON_EOS_TESTNET].btc.explorer}address/${_address}`
        : `${settings[PBTC_ON_EOS_TESTNET].eos.explorer}accounts/${_address}`
    }
    case PBTC_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBTC_ON_EOS_MAINNET].btc.explorer}address/${_address}`
        : `${settings[PBTC_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PBTC_ON_TELOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBTC_ON_TELOS_MAINNET].btc.explorer}address/${_address}`
        : `${settings[PBTC_ON_TELOS_MAINNET].telos.explorer}accounts/${_address}`
    }
    case PLTC_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PLTC_ON_EOS_MAINNET].ltc.explorer}address/${_address}`
        : `${settings[PLTC_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PLTC_ON_ETH_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PLTC_ON_ETH_MAINNET].ltc.explorer}address/${_address}`
        : `${settings[PLTC_ON_ETH_MAINNET].eth.explorer}address/${_address}`
    }
    case PLTC_ON_ETH_TESTNET: {
      return _role === 'pegin'
        ? `${settings[PLTC_ON_ETH_TESTNET].ltc.explorer}address/${_address}`
        : `${settings[PLTC_ON_ETH_TESTNET].eth.explorer}address/${_address}`
    }
    case PETH_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PETH_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PETH_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PMKR_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PMKR_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PMKR_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PNT_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PNT_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PNT_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PLINK_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PLINK_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PLINK_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PYFI_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PYFI_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PYFI_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PTERIA_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PTERIA_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PTERIA_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PUNI_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PUNI_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PUNI_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PBAND_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBAND_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PBAND_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PBAL_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBAL_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PBAL_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PCOMP_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PCOMP_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PCOMP_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PSNX_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PSNX_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PSNX_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case POMG_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[POMG_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[POMG_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PDAI_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PDAI_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PDAI_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PANT_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PANT_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PANT_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PLRC_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PLRC_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PLRC_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PUOS_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PUOS_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PUOS_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PBAT_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBAT_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PBAT_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PREP_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PREP_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PREP_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PZRX_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PZRX_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PZRX_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PPNK_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PPNK_ON_EOS_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PPNK_ON_EOS_MAINNET].eos.explorer}accounts/${_address}`
    }
    case PDOGE_ON_ETH_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PDOGE_ON_ETH_MAINNET].doge.explorer}address/${_address}`
        : `${settings[PDOGE_ON_ETH_MAINNET].eth.explorer}address/${_address}`
    }
    case PEOS_ON_ETH_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PEOS_ON_ETH_MAINNET].eos.explorer}accounts/${_address}`
        : `${settings[PEOS_ON_ETH_MAINNET].eth.explorer}address/${_address}`
    }
    case PBTC_ON_BSC_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBTC_ON_BSC_MAINNET].btc.explorer}address/${_address}`
        : `${settings[PBTC_ON_BSC_MAINNET].bsc.explorer}address/${_address}`
    }
    case PEOS_ON_POLYGON_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PEOS_ON_POLYGON_MAINNET].eos.explorer}accounts/${_address}`
        : `${settings[PEOS_ON_POLYGON_MAINNET].polygon.explorer}address/${_address}`
    }
    case PBTC_ON_XDAI_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBTC_ON_XDAI_MAINNET].btc.explorer}address/${_address}`
        : `${settings[PBTC_ON_XDAI_MAINNET].xdai.explorer}address/${_address}`
    }
    default:
      break
  }
}

const getCorrespondingBaseTxExplorerLink = (_id, _role) => {
  switch (_id) {
    case PBTC_ON_ETH_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBTC_ON_ETH_MAINNET].btc.explorer}tx/`
        : `${settings[PBTC_ON_ETH_MAINNET].eth.explorer}tx/`
    }
    case PBTC_ON_ETH_TESTNET: {
      return _role === 'pegin'
        ? `${settings[PBTC_ON_ETH_TESTNET].btc.explorer}tx/`
        : `${settings[PBTC_ON_ETH_TESTNET].eth.explorer}tx/`
    }
    case PBTC_ON_EOS_TESTNET: {
      return _role === 'pegin'
        ? `${settings[PBTC_ON_EOS_TESTNET].btc.explorer}tx/`
        : `${settings[PBTC_ON_EOS_TESTNET].eos.explorer}transaction/`
    }
    case PBTC_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBTC_ON_EOS_MAINNET].btc.explorer}tx/`
        : `${settings[PBTC_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PBTC_ON_TELOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBTC_ON_TELOS_MAINNET].btc.explorer}tx/`
        : `${settings[PBTC_ON_TELOS_MAINNET].telos.explorer}transaction/`
    }
    case PLTC_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PLTC_ON_EOS_MAINNET].ltc.explorer}tx/`
        : `${settings[PLTC_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PLTC_ON_ETH_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PLTC_ON_ETH_MAINNET].ltc.explorer}tx/`
        : `${settings[PLTC_ON_ETH_MAINNET].eth.explorer}tx/`
    }
    case PLTC_ON_ETH_TESTNET: {
      return _role === 'pegin'
        ? `${settings[PLTC_ON_ETH_TESTNET].ltc.explorer}tx/`
        : `${settings[PLTC_ON_ETH_TESTNET].eth.explorer}tx/`
    }
    case PETH_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PETH_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PETH_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PLINK_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PLINK_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PLINK_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PMKR_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PMKR_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PMKR_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PYFI_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PYFI_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PYFI_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PNT_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PNT_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PNT_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PTERIA_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PTERIA_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PTERIA_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PUNI_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PUNI_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PUNI_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PBAND_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBAND_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PBAND_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PBAL_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBAL_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PBAL_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PCOMP_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PCOMP_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PCOMP_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PSNX_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PSNX_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PSNX_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case POMG_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[POMG_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[POMG_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PDAI_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PDAI_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PDAI_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PANT_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PANT_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PANT_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PLRC_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PLRC_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PLRC_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PUOS_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PUOS_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PUOS_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PBAT_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBAT_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PBAT_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PREP_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PREP_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PREP_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PZRX_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PZRX_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PZRX_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PPNK_ON_EOS_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PPNK_ON_EOS_MAINNET].eth.explorer}tx/`
        : `${settings[PPNK_ON_EOS_MAINNET].eos.explorer}transaction/`
    }
    case PDOGE_ON_ETH_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PDOGE_ON_ETH_MAINNET].doge.explorer}tx/`
        : `${settings[PDOGE_ON_ETH_MAINNET].eth.explorer}tx/`
    }
    case PEOS_ON_ETH_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PEOS_ON_ETH_MAINNET].eos.explorer}transaction/`
        : `${settings[PEOS_ON_ETH_MAINNET].eth.explorer}tx/`
    }
    case PBTC_ON_BSC_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBTC_ON_BSC_MAINNET].btc.explorer}tx/`
        : `${settings[PBTC_ON_BSC_MAINNET].bsc.explorer}tx/`
    }
    case PEOS_ON_POLYGON_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PEOS_ON_POLYGON_MAINNET].eos.explorer}transaction/`
        : `${settings[PEOS_ON_POLYGON_MAINNET].polygon.explorer}tx/`
    }
    case PBTC_ON_XDAI_MAINNET: {
      return _role === 'pegin'
        ? `${settings[PBTC_ON_XDAI_MAINNET].btc.explorer}tx/`
        : `${settings[PBTC_ON_XDAI_MAINNET].xdai.explorer}tx/`
    }
    default:
      break
  }
}

export { getCorrespondingExplorerLink, getCorrespondingBaseTxExplorerLink }
