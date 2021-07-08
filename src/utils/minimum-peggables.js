import {
  PSAFEMOON_ON_ETH_MAINNET,
  PBTC_ON_BSC_MAINNET,
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
  [PSAFEMOON_ON_ETH_MAINNET]: {
    pegin: 10000000,
    pegout: 10000000
  }
}

const getMinimumPeggable = (_id, _type) => (minimumPeggable[_id] ? minimumPeggable[_id][_type] : null)

export default getMinimumPeggable
