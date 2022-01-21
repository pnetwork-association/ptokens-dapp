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
  ZMT_ON_BSC_MAINNET,
  BIST_ON_BSC_MAINNET,
  PNT_ON_POLYGON_MAINNET,
  PVAI_ON_ETH_MAINNET,
  WSB_ON_ETH_MAINNET,
  PNT_ON_ARBITRUM_MAINNET,
  LUXO_ON_LUXOCHAIN_MAINNET
} from '../constants'

const minimumPeggable = {
  [PBTC_ON_BSC_MAINNET]: {
    pegin: 0.0015,
    pegout: 0.0015
  },
  [PBTC_ON_POLYGON_MAINNET]: {
    pegin: 0.0015,
    pegout: 0.0015
  },
  [PBTC_ON_EOS_MAINNET]: {
    pegin: 0.0015,
    pegout: 0.0015
  },
  [PBTC_ON_TELOS_MAINNET]: {
    pegin: 0.0015,
    pegout: 0.0015
  },
  [PBTC_ON_XDAI_MAINNET]: {
    pegin: 0.0015,
    pegout: 0.0015
  },
  [PBTC_ON_ETH_MAINNET]: {
    pegin: 0.0015,
    pegout: 0.0015
  },
  [PBTC_ON_ARBITRUM_MAINNET]: {
    pegin: 0.0015,
    pegout: 0.0015
  },
  [PETH_ON_EOS_MAINNET]: {
    pegin: 0.025,
    pegout: 0.025
  },
  [PMKR_ON_EOS_MAINNET]: {
    pegin: 0.03,
    pegout: 0.03
  },
  [PLINK_ON_EOS_MAINNET]: {
    pegin: 4,
    pegout: 4
  },
  [PYFI_ON_EOS_MAINNET]: {
    pegin: 0.004,
    pegout: 0.004
  },
  [PNT_ON_EOS_MAINNET]: {
    pegin: 100,
    pegout: 100
  },
  [PTERIA_ON_EOS_MAINNET]: {
    pegin: 5000,
    pegout: 5000
  },
  [PBAL_ON_EOS_MAINNET]: {
    pegin: 5,
    pegout: 5
  },
  [PBAND_ON_EOS_MAINNET]: {
    pegin: 15,
    pegout: 15
  },
  [PCOMP_ON_EOS_MAINNET]: {
    pegin: 0.35,
    pegout: 0.35
  },
  [PSNX_ON_EOS_MAINNET]: {
    pegin: 12,
    pegout: 12
  },
  [PUNI_ON_EOS_MAINNET]: {
    pegin: 5,
    pegout: 5
  },
  [PANT_ON_EOS_MAINNET]: {
    pegin: 20,
    pegout: 20
  },
  [PDAI_ON_EOS_MAINNET]: {
    pegin: 100,
    pegout: 100
  },
  [PLRC_ON_EOS_MAINNET]: {
    pegin: 30,
    pegout: 30
  },
  [POMG_ON_EOS_MAINNET]: {
    pegin: 12,
    pegout: 12
  },
  [PUOS_ON_EOS_MAINNET]: {
    pegin: 50,
    pegout: 50
  },
  [PBAT_ON_EOS_MAINNET]: {
    pegin: 100,
    pegout: 100
  },
  [PREP_ON_EOS_MAINNET]: {
    pegin: 5,
    pegout: 5
  },
  [PZRX_ON_EOS_MAINNET]: {
    pegin: 100,
    pegout: 100
  },
  [PPNK_ON_EOS_MAINNET]: {
    pegin: 1000,
    pegout: 1000
  },
  [PLTC_ON_EOS_MAINNET]: {
    pegin: 0.05,
    pegout: 0.05
  },
  [PLTC_ON_ETH_MAINNET]: {
    pegin: 0.5,
    pegout: 0.5
  },
  [PDOGE_ON_ETH_MAINNET]: {
    pegin: 500,
    pegout: 500
  },
  [PLBC_ON_BSC_MAINNET]: {
    pegin: 200,
    pegout: 200
  },
  [PRVN_ON_BSC_MAINNET]: {
    pegin: 100,
    pegout: 100
  },
  [PEOS_ON_ETH_MAINNET]: {
    pegin: 25,
    pegout: 25
  },
  [PEOS_ON_POLYGON_MAINNET]: {
    pegin: 12.5,
    pegout: 12.5
  },
  [PSEEDS_ON_ETH_MAINNET]: {
    pegin: 1000,
    pegout: 1000
  },
  [IQ_ON_ETH_MAINNET]: {
    pegin: 5500,
    pegout: 5500
  },
  [TLOS_ON_BSC_MAINNET]: {
    pegin: 10,
    pegout: 10
  },
  [TLOS_ON_ETH_MAINNET]: {
    pegin: 100,
    pegout: 100
  },
  [EFX_ON_BSC_MAINNET]: {
    pegin: 300,
    pegout: 300
  },
  [ANRX_ON_BSC_MAINNET]: {
    pegin: 300,
    pegout: 300
  },
  [PNT_ON_BSC_MAINNET]: {
    pegin: 100,
    pegout: 100
  },
  [POPIUM_ON_BSC_MAINNET]: {
    pegin: 50,
    pegout: 50
  },
  [POPEN_ON_BSC_MAINNET]: {
    pegin: 500,
    pegout: 500
  },
  [PDEFIPLUSPLUS_ON_BSC_MAINNET]: {
    pegin: 20,
    pegout: 20
  },
  [PBCP_ON_BSC_MAINNET]: {
    pegin: 25,
    pegout: 25
  },
  [PTERIA_ON_BSC_MAINNET]: {
    pegin: 5000,
    pegout: 5000
  },
  [CGG_ON_BSC_MAINNET]: {
    pegin: 40,
    pegout: 40
  },
  [PNT_ON_TELOS_MAINNET]: {
    pegin: 100,
    pegout: 100
  },
  [PNT_ON_XDAI_MAINNET]: {
    pegin: 100,
    pegout: 100
  },
  [PETH_ON_TELOS_MAINNET]: {
    pegin: 0.025,
    pegout: 0.025
  },
  [PLINK_ON_TELOS_MAINNET]: {
    pegin: 4,
    pegout: 4
  },
  [PUSDC_ON_TELOS_MAINNET]: {
    pegin: 100,
    pegout: 100
  },
  [PUSDT_ON_TELOS_MAINNET]: {
    pegin: 100,
    pegout: 100
  },
  [PSAFEMOON_ON_ETH_MAINNET]: {
    pegin: 30000000,
    pegout: 30000000
  },
  [GALA_ON_BSC_MAINNET]: {
    pegin: 200,
    pegout: 200
  },
  [PUOS_ON_ULTRA_MAINNET]: {
    pegin: 50,
    pegout: 50
  },
  [EFX_ON_ETH_MAINNET]: {
    pegin: 3000,
    pegout: 3000
  },
  [ZMT_ON_BSC_MAINNET]: {
    pegin: 50,
    pegout: 50
  },
  [BIST_ON_BSC_MAINNET]: {
    pegin: 700,
    pegout: 700
  },
  [PNT_ON_POLYGON_MAINNET]: {
    pegin: 100,
    pegout: 100
  },
  [TFF_ON_POLYGON_MAINNET]: {
    pegin: 65000,
    pegout: 65000
  },
  [USDO_ON_POLYGON_MAINNET]: {
    pegin: 50,
    pegout: 50
  },
  [PVAI_ON_ETH_MAINNET]: {
    pegin: 100,
    pegout: 100
  },
  [OCP_ON_ETH_MAINNET]: {
    pegin: 1500,
    pegout: 1500
  },
  /*[ORE_ON_ETH_MAINNET]: {
    pegin: 700,
    pegout: 700
  },*/
  [WSB_ON_ETH_MAINNET]: {
    pegin: 10000,
    pegout: 10000
  },
  [PNT_ON_ARBITRUM_MAINNET]: {
    pegin: 100,
    pegout: 100
  },
  [LUXO_ON_LUXOCHAIN_MAINNET]: {
    pegin: 100,
    pegout: 100
  }
}

const getMinimumPeggable = (_id, _type) => (minimumPeggable[_id] ? minimumPeggable[_id][_type] : null)

export default getMinimumPeggable
