import { PSAFEMOON_ON_ETH_MAINNET } from '../constants'

const minimumPeggable = {
  [PSAFEMOON_ON_ETH_MAINNET]: {
    pegin: 10000000,
    pegout: 10000000
  }
}

const getMinimumPeggable = (_id, _type) => (minimumPeggable[_id] ? minimumPeggable[_id][_type] : null)

export default getMinimumPeggable
