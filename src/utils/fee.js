import {
  PBTC_ON_ETH_MAINNET,
  /*PBTC_ON_EOS_MAINNET,
  PBTC_ON_TELOS_MAINNET,*/
  PLTC_ON_ETH_MAINNET,
  /*PLTC_ON_EOS_MAINNET,
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
  PEOS_ON_ETH_MAINNET,*/
  PBTC_ON_BSC_MAINNET,
  /*PEOS_ON_POLYGON_MAINNET,*/
  PBTC_ON_XDAI_MAINNET,
  /*IQ_ON_ETH_MAINNET,
  TLOS_ON_ETH_MAINNET,
  PNT_ON_BSC_MAINNET,
  POPIUM_ON_BSC_MAINNET,
  PDEFIPLUSPLUS_ON_BSC_MAINNET,
  PTERIA_ON_BSC_MAINNET,
  PBCP_ON_BSC_MAINNET,
  CGG_ON_BSC_MAINNET,
  PETH_ON_TELOS_MAINNET,
  PLINK_ON_TELOS_MAINNET,
  PNT_ON_TELOS_MAINNET,
  PUSDT_ON_TELOS_MAINNET,
  PUSDC_ON_TELOS_MAINNET,
  PNT_ON_XDAI_MAINNET,*/
  PRVN_ON_BSC_MAINNET
} from '../constants'

const getFee = (_ptokenId, _type) => {
  if (_type !== 'pegin' && _type !== 'pegout') throw new Error('Invalid type. Please use (pegin or pegout)')

  switch (_ptokenId) {
    case PBTC_ON_ETH_MAINNET: {
      return _type === 'pegin' ? 0 : 0.25
    }
    case PBTC_ON_BSC_MAINNET: {
      return _type === 'pegin' ? 0 : 0.25
    }
    case PLTC_ON_ETH_MAINNET: {
      return _type === 'pegin' ? 0 : 0.25
    }
    case PBTC_ON_XDAI_MAINNET: {
      return _type === 'pegin' ? 0 : 0.25
    }
    case PRVN_ON_BSC_MAINNET: {
      return _type === 'pegin' ? 0 : 0.25
    }
    default:
      return 0
  }
}

export { getFee }
