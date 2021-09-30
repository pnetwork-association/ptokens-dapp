import settings from '../settings'
import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_TELOS_MAINNET,
  PBTC_ON_EOS_MAINNET,
  PBTC_ON_BSC_MAINNET,
  PBTC_ON_XDAI_MAINNET,
  PBTC_ON_POLYGON_MAINNET,
  PBTC_ON_ARBITRUM_MAINNET,
  PLTC_ON_ETH_MAINNET,
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
  PEOS_ON_POLYGON_MAINNET,
  IQ_ON_ETH_MAINNET,
  TLOS_ON_ETH_MAINNET,
  PNT_ON_BSC_MAINNET,
  POPIUM_ON_BSC_MAINNET,
  PTERIA_ON_BSC_MAINNET,
  PDEFIPLUSPLUS_ON_BSC_MAINNET,
  CGG_ON_BSC_MAINNET,
  PBCP_ON_BSC_MAINNET,
  PETH_ON_TELOS_MAINNET,
  PLINK_ON_TELOS_MAINNET,
  PNT_ON_TELOS_MAINNET,
  PUSDT_ON_TELOS_MAINNET,
  PUSDC_ON_TELOS_MAINNET,
  PNT_ON_XDAI_MAINNET,
  PRVN_ON_BSC_MAINNET,
  TLOS_ON_BSC_MAINNET,
  POPEN_ON_BSC_MAINNET,
  OCP_ON_ETH_MAINNET,
  ANRX_ON_BSC_MAINNET,
  TFF_ON_POLYGON_MAINNET,
  PSAFEMOON_ON_ETH_MAINNET,
  EFX_ON_BSC_MAINNET,
  PSEEDS_ON_ETH_MAINNET,
  PLBC_ON_BSC_MAINNET,
  USDO_ON_POLYGON_MAINNET,
  GALA_ON_BSC_MAINNET,
  PUOS_ON_ULTRA_MAINNET,
  EFX_ON_ETH_MAINNET,
  ZMT_ON_BSC_MAINNET
} from '../constants'

const getCorrespondingExplorerLink = (_id, _role, _address) => {
  switch (_id) {
    case PBTC_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.btc}address/${_address}`
        : `${settings.explorers.mainnet.eth}address/${_address}`
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
    case PBTC_ON_ARBITRUM_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.btc}address/${_address}`
        : `${settings.explorers.mainnet.arbitrum}address/${_address}`
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
        ? `${settings.explorers.mainnet.eos}accounts/${_address}`
        : `${settings.explorers.mainnet.eth}address/${_address}`
    }
    case TLOS_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.telos}accounts/${_address}`
        : `${settings.explorers.mainnet.eth}address/${_address}`
    }
    case PNT_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.bsc}address/${_address}`
    }
    case POPIUM_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.bsc}address/${_address}`
    }
    case PTERIA_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.bsc}address/${_address}`
    }
    case PDEFIPLUSPLUS_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.bsc}address/${_address}`
    }
    case PBCP_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.bsc}address/${_address}`
    }
    case CGG_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.bsc}address/${_address}`
    }
    case PETH_ON_TELOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.telos}accounts/${_address}`
    }
    case PLINK_ON_TELOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.telos}accounts/${_address}`
    }
    case PNT_ON_TELOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.telos}accounts/${_address}`
    }
    case PUSDT_ON_TELOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.telos}accounts/${_address}`
    }
    case PUSDC_ON_TELOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.telos}accounts/${_address}`
    }
    case PNT_ON_XDAI_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.xdai}address/${_address}`
    }
    case PRVN_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.rvn}address/${_address}`
        : `${settings.explorers.mainnet.bsc}address/${_address}`
    }
    case TLOS_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.telos}accounts/${_address}`
        : `${settings.explorers.mainnet.bsc}address/${_address}`
    }
    case POPEN_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.bsc}address/${_address}`
    }
    case OCP_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.bsc}address/${_address}`
        : `${settings.explorers.mainnet.eth}address/${_address}`
    }
    case ANRX_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.bsc}address/${_address}`
    }
    case PBTC_ON_POLYGON_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.btc}address/${_address}`
        : `${settings.explorers.mainnet.polygon}address/${_address}`
    }
    case TFF_ON_POLYGON_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.bsc}address/${_address}`
        : `${settings.explorers.mainnet.polygon}address/${_address}`
    }
    case PSAFEMOON_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.bsc}address/${_address}`
        : `${settings.explorers.mainnet.eth}address/${_address}`
    }
    case EFX_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eos}accounts/${_address}`
        : `${settings.explorers.mainnet.bsc}address/${_address}`
    }
    case PSEEDS_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.telos}accounts/${_address}`
        : `${settings.explorers.mainnet.eth}address/${_address}`
    }
    case PLBC_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.lbc}address/${_address}`
        : `${settings.explorers.mainnet.bsc}address/${_address}`
    }
    case USDO_ON_POLYGON_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.bsc}address/${_address}`
        : `${settings.explorers.mainnet.polygon}address/${_address}`
    }
    case GALA_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.bsc}address/${_address}`
        : `${settings.explorers.mainnet.eth}address/${_address}`
    }
    case PUOS_ON_ULTRA_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.ultra}account/${_address}`
    }
    case EFX_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eos}accounts/${_address}`
        : `${settings.explorers.mainnet.eth}address/${_address}`
    }
    case ZMT_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}address/${_address}`
        : `${settings.explorers.mainnet.bsc}address/${_address}`
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
    case PBTC_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.btc}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PBTC_ON_TELOS_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.btc}tx/` : `${settings.telos.explorer}transaction/`
    }
    case PBTC_ON_ARBITRUM_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.btc}tx/` : `${settings.explorers.mainnet.arbitrum}tx/`
    }
    case PLTC_ON_EOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.ltc}tx/`
        : `${settings.explorers.mainnet.eos}transaction/`
    }
    case PLTC_ON_ETH_MAINNET: {
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
        ? `${settings.explorers.mainnet.eos}transaction/`
        : `${settings.explorers.mainnet.eth}tx/`
    }
    case TLOS_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.telos}transaction/`
        : `${settings.explorers.mainnet.eth}tx/`
    }
    case PNT_ON_BSC_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.eth}tx/` : `${settings.explorers.mainnet.bsc}tx/`
    }
    case POPIUM_ON_BSC_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.eth}tx/` : `${settings.explorers.mainnet.bsc}tx/`
    }
    case PTERIA_ON_BSC_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.eth}tx/` : `${settings.explorers.mainnet.bsc}tx/`
    }
    case PDEFIPLUSPLUS_ON_BSC_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.eth}tx/` : `${settings.explorers.mainnet.bsc}tx/`
    }
    case PBCP_ON_BSC_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.eth}tx/` : `${settings.explorers.mainnet.bsc}tx/`
    }
    case CGG_ON_BSC_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.eth}tx/` : `${settings.explorers.mainnet.bsc}tx/`
    }
    case PETH_ON_TELOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.telos}transaction/`
    }
    case PLINK_ON_TELOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.telos}transaction/`
    }
    case PNT_ON_TELOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.telos}transaction/`
    }
    case PUSDC_ON_TELOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.telos}transaction/`
    }
    case PUSDT_ON_TELOS_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eth}tx/`
        : `${settings.explorers.mainnet.telos}transaction/`
    }
    case PNT_ON_XDAI_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.eth}tx/` : `${settings.explorers.mainnet.xdai}tx/`
    }
    case PRVN_ON_BSC_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.rvn}tx/` : `${settings.explorers.mainnet.bsc}tx/`
    }
    case TLOS_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.telos}transaction/`
        : `${settings.explorers.mainnet.bsc}tx/`
    }
    case POPEN_ON_BSC_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.eth}tx/` : `${settings.explorers.mainnet.bsc}tx/`
    }
    case OCP_ON_ETH_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.bsc}tx/` : `${settings.explorers.mainnet.eth}tx/`
    }
    case ANRX_ON_BSC_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.eth}tx/` : `${settings.explorers.mainnet.bsc}tx/`
    }
    case PBTC_ON_POLYGON_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.btc}tx/` : `${settings.explorers.mainnet.polygon}tx/`
    }
    case TFF_ON_POLYGON_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.bsc}tx/` : `${settings.explorers.mainnet.polygon}tx/`
    }
    case PSAFEMOON_ON_ETH_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.bsc}tx/` : `${settings.explorers.mainnet.eth}tx/`
    }
    case EFX_ON_BSC_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eos}transaction/`
        : `${settings.explorers.mainnet.bsc}tx/`
    }
    case PSEEDS_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.telos}transaction/`
        : `${settings.explorers.mainnet.eth}tx/`
    }
    case PLBC_ON_BSC_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.lbc}tx/` : `${settings.explorers.mainnet.bsc}tx/`
    }
    case USDO_ON_POLYGON_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.bsc}tx/` : `${settings.explorers.mainnet.polygon}tx/`
    }
    case GALA_ON_BSC_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.bsc}tx/` : `${settings.explorers.mainnet.eth}tx/`
    }
    case PUOS_ON_ULTRA_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.eth}tx/` : `${settings.explorers.mainnet.ultra}tx/`
    }
    case EFX_ON_ETH_MAINNET: {
      return _role === 'native'
        ? `${settings.explorers.mainnet.eos}transaction/`
        : `${settings.explorers.mainnet.eth}tx/`
    }
    case ZMT_ON_BSC_MAINNET: {
      return _role === 'native' ? `${settings.explorers.mainnet.eth}tx/` : `${settings.explorers.mainnet.bsc}tx/`
    }
    default:
      break
  }
}

export { getCorrespondingExplorerLink, getCorrespondingBaseTxExplorerLink }
