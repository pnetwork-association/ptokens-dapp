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
  PBTC_ON_XDAI_MAINNET,
  PEOS_ON_POLYGON_MAINNET,
  IQ_ON_ETH_MAINNET,
  TLOS_ON_ETH_MAINNET,
  PNT_ON_BSC_MAINNET,
  POPIUM_ON_BSC_MAINNET,
  PTERIA_ON_BSC_MAINNET,
  PDEFIPLUSPLUS_ON_BSC_MAINNET,
  CGG_ON_BSC_MAINNET,
  PBCP_ON_BSC_MAINNET
} from '../constants'

const getCorrespondingExplorerLink = (_id, _role, _address) => {
  switch (_id) {
    case PBTC_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.btc}address/${_address}`
        : `${settings.explorers.mainnet.eth}address/${_address}`
    }
    case PBTC_ON_ETH_TESTNET: {
      return _role === 'native'
        ? `${settings.explorers.testnet.btc}address/${_address}`
        : `${settings.explorers.mainnet.eth}address/${_address}`
    }
    case PBTC_ON_EOS_TESTNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.btc}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PBTC_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.btc}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PBTC_ON_TELOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.btc}address/${_address}`
        : `${settings.explorers.mainnet.telos}accounts/${_address}`
    }
    case PLTC_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.ltc}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PLTC_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.ltc}address/${_address}`
        : `${settings.explorers.mainnet.eth}address/${_address}`
    }
    case PLTC_ON_ETH_TESTNET: {
      return _role === 'native'
        ? `${settings.explorers.testnet.ltc}address/${_address}`
        : `${settings.explorers.mainnet.eth}address/${_address}`
    }
    case PETH_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PMKR_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PNT_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PLINK_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PYFI_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PTERIA_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PUNI_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PBAND_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PBAL_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PCOMP_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PSNX_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case POMG_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PDAI_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PANT_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PLRC_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PUOS_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PBAT_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PREP_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PZRX_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PPNK_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.eos}accounts/${_address}`
    }
    case PDOGE_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings.doge.explorer}address/${_address}`
        : `${settings.explorers.mainnet.eth}address/${_address}`
    }
    case PEOS_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eos}accounts/${_address}`
        : `${settings.explorers.mainnet.eth}address/${_address}`
    }
    case PBTC_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.btc}address/${_address}`
        : `${settings.explorers.mainnet.bsc}address/${_address}`
    }
    case PEOS_ON_POLYGON_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eos}accounts/${_address}`
        : `${settings.explorers.mainnet.polygon}address/${_address}`
    }
    case PBTC_ON_XDAI_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.btc}address/${_address}`
        : `${settings.explorers.mainnet.xdai}address/${_address}`
    }
    case IQ_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings[IQ_ON_ETH_MAINNET].eos.explorer}accounts/${_address}`
        : `${settings[IQ_ON_ETH_MAINNET].eth.explorer}address/${_address}`
    }
    case TLOS_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings[TLOS_ON_ETH_MAINNET].telos.explorer}accounts/${_address}`
        : `${settings[TLOS_ON_ETH_MAINNET].eth.explorer}address/${_address}`
    }
    case PNT_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings[PNT_ON_BSC_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PNT_ON_BSC_MAINNET].bsc.explorer}address/${_address}`
    }
    case POPIUM_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings[POPIUM_ON_BSC_MAINNET].eth.explorer}address/${_address}`
        : `${settings[POPIUM_ON_BSC_MAINNET].bsc.explorer}address/${_address}`
    }
    case PTERIA_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings[PTERIA_ON_BSC_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PTERIA_ON_BSC_MAINNET].bsc.explorer}address/${_address}`
    }
    case PDEFIPLUSPLUS_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings[PDEFIPLUSPLUS_ON_BSC_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PDEFIPLUSPLUS_ON_BSC_MAINNET].bsc.explorer}address/${_address}`
    }
    case PBCP_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings[PBCP_ON_BSC_MAINNET].eth.explorer}address/${_address}`
        : `${settings[PBCP_ON_BSC_MAINNET].bsc.explorer}address/${_address}`
    }
    case CGG_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings[CGG_ON_BSC_MAINNET].eth.explorer}address/${_address}`
        : `${settings[CGG_ON_BSC_MAINNET].bsc.explorer}address/${_address}`
    }
    default:
      break
  }
}

const getCorrespondingBaseTxExplorerLink = (_id, _role) => {
  switch (_id) {
    case PBTC_ON_ETH_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.btc}tx/` : `${settings.explorers.mainnet.eth}tx/`
    }
    case PBTC_ON_ETH_TESTNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.btc}tx/` : `${settings.explorers.mainnet.eth}tx/`
    }
    case PBTC_ON_EOS_TESTNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.btc}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PBTC_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.btc}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PBTC_ON_TELOS_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.btc}tx/` : `${settings.telos.explorer}transaction/`
    }
    case PLTC_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.ltc}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PLTC_ON_ETH_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.ltc}tx/` : `${settings.explorers.mainnet.eth}tx/`
    }
    case PLTC_ON_ETH_TESTNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.ltc}tx/` : `${settings.explorers.mainnet.eth}tx/`
    }
    case PETH_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PLINK_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PMKR_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PYFI_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PNT_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PTERIA_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PUNI_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PBAND_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PBAL_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PCOMP_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PSNX_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case POMG_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PDAI_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PANT_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PLRC_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PUOS_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PBAT_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PREP_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PZRX_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PPNK_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PDOGE_ON_ETH_MAINNET: {
      return _role === 'native' ? `${settings.doge.explorer}tx/` : `${settings.explorers.mainnet.eth}tx/`
    }
    case PEOS_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eos}transaction/`
        : `${settings.explorers.mainnet.eth}tx/`
    }
    case PBTC_ON_BSC_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.btc}tx/` : `${settings.explorers.mainnet.bsc}tx/`
    }
    case PEOS_ON_POLYGON_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eos}transaction/`
        : `${settings.explorers.mainnet.polygon}tx/`
    }
    case PBTC_ON_XDAI_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.btc}tx/` : `${settings.explorers.mainnet.xdai}tx/`
    }
    case IQ_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings[IQ_ON_ETH_MAINNET].eos.explorer}transaction/`
        : `${settings[IQ_ON_ETH_MAINNET].eth.explorer}tx/`
    }
    case TLOS_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings[TLOS_ON_ETH_MAINNET].telos.explorer}transaction/`
        : `${settings[TLOS_ON_ETH_MAINNET].eth.explorer}tx/`
    }
    case PNT_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings[PNT_ON_BSC_MAINNET].eth.explorer}tx/`
        : `${settings[PNT_ON_BSC_MAINNET].bsc.explorer}tx/`
    }
    case POPIUM_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings[POPIUM_ON_BSC_MAINNET].eth.explorer}tx/`
        : `${settings[POPIUM_ON_BSC_MAINNET].bsc.explorer}tx/`
    }
    case PTERIA_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings[PTERIA_ON_BSC_MAINNET].eth.explorer}tx/`
        : `${settings[PTERIA_ON_BSC_MAINNET].bsc.explorer}tx/`
    }
    case PDEFIPLUSPLUS_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings[PDEFIPLUSPLUS_ON_BSC_MAINNET].eth.explorer}tx/`
        : `${settings[PDEFIPLUSPLUS_ON_BSC_MAINNET].bsc.explorer}tx/`
    }
    case PBCP_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings[PBCP_ON_BSC_MAINNET].eth.explorer}tx/`
        : `${settings[PBCP_ON_BSC_MAINNET].bsc.explorer}tx/`
    }
    case CGG_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings[CGG_ON_BSC_MAINNET].eth.explorer}tx/`
        : `${settings[CGG_ON_BSC_MAINNET].bsc.explorer}tx/`
    }
    default:
      break
  }
}

const getCorrespondingBaseTxExplorerLinkByBlockchain = _blockchain => {
  switch (_blockchain) {
    case 'ETH':
      return `${settings.explorers.mainnet.eth}tx/`
    case 'XDAI':
      return `${settings.explorers.mainnet.xdai}tx/`
    case 'POLYGON':
      return `${settings.explorers.mainnet.polygon}tx/`
    case 'BSC':
      return `${settings.explorers.mainnet.bsc}tx/`
    case 'EOS':
      return `${settings.explorers.mainnet.eos}tx/`
    case 'TELOS':
      return `${settings.explorers.mainnet.telos}transaction/`
    default:
      throw new Error('Invalid blockchain')
  }
}

export {
  getCorrespondingExplorerLink,
  getCorrespondingBaseTxExplorerLink,
  getCorrespondingBaseTxExplorerLinkByBlockchain
}
