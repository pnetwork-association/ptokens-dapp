import {
  PSAFEMOON_ON_ETH_MAINNET,
  PBTC_ON_BSC_MAINNET,
  PBTC_ON_ARBITRUM_MAINNET,
  PBTC_ON_POLYGON_MAINNET,
  PBTC_ON_EOS_MAINNET,
  PBTC_ON_TELOS_MAINNET,
  PBTC_ON_XDAI_MAINNET,
  PBTC_ON_ETH_MAINNET,
  PDOGE_ON_ETH_MAINNET,
  PLBC_ON_BSC_MAINNET,
  PLTC_ON_EOS_MAINNET,
  PLTC_ON_ETH_MAINNET,
  PRVN_ON_BSC_MAINNET,
  PEOS_ON_ETH_MAINNET,
  PEOS_ON_POLYGON_MAINNET,
  PSEEDS_ON_ETH_MAINNET,
  IQ_ON_ETH_MAINNET,
  TLOS_ON_BSC_MAINNET,
  TLOS_ON_ETH_MAINNET,
  EFX_ON_BSC_MAINNET,
  PNT_ON_TELOS_MAINNET,
  PETH_ON_TELOS_MAINNET,
  PLINK_ON_TELOS_MAINNET,
  PUSDC_ON_TELOS_MAINNET,
  PUSDT_ON_TELOS_MAINNET,
  GALA_ON_BSC_MAINNET,
  PUOS_ON_ULTRA_MAINNET,
  EFX_ON_ETH_MAINNET,
  ZMT_ON_BSC_MAINNET
} from '../constants'

const minimumPeggable = {
  [PBTC_ON_BSC_MAINNET]: {
    pegin: 0.00005,
    pegout: 0
  },
  [PBTC_ON_POLYGON_MAINNET]: {
    pegin: 0.00005,
    pegout: 0
  },
  [PBTC_ON_EOS_MAINNET]: {
    pegin: 0.00005,
    pegout: 0
  },
  [PBTC_ON_TELOS_MAINNET]: {
    pegin: 0.00005,
    pegout: 0
  },
  [PBTC_ON_XDAI_MAINNET]: {
    pegin: 0.00005,
    pegout: 0
  },
  [PBTC_ON_ETH_MAINNET]: {
    pegin: 0.00005,
    pegout: 0
  },
  [PBTC_ON_ARBITRUM_MAINNET]: {
    pegin: 0.00005,
    pegout: 0
  },
  [PLTC_ON_EOS_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [PLTC_ON_ETH_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [PDOGE_ON_ETH_MAINNET]: {
    pegin: 100,
    pegout: 0
  },
  [PLBC_ON_BSC_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [PRVN_ON_BSC_MAINNET]: {
    pegin: 0.001,
    pegout: 0
  },
  [PEOS_ON_ETH_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [PEOS_ON_POLYGON_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [PSEEDS_ON_ETH_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [IQ_ON_ETH_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [TLOS_ON_BSC_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [TLOS_ON_ETH_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [EFX_ON_BSC_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [PNT_ON_TELOS_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [PETH_ON_TELOS_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [PLINK_ON_TELOS_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [PUSDC_ON_TELOS_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [PUSDT_ON_TELOS_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [PSAFEMOON_ON_ETH_MAINNET]: {
    pegin: 10000000,
    pegout: 10000000
  },
  [GALA_ON_BSC_MAINNET]: {
    pegin: 0.00000001,
    pegout: 0.00000001
  },
  [PUOS_ON_ULTRA_MAINNET]: {
    pegin: 50,
    pegout: 50
  },
  [EFX_ON_ETH_MAINNET]: {
    pegin: 0.0001,
    pegout: 0
  },
  [ZMT_ON_BSC_MAINNET]: {
    pegin: 0.001,
    pegout: 0
  }
}

const getMinimumPeggable = (_id, _type) => (minimumPeggable[_id] ? minimumPeggable[_id][_type] : null)

export default getMinimumPeggable
