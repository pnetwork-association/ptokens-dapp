import {
  PBTC_ON_ETH_MAINNET_V1_MIGRATION,
  PBTC_ON_ETH_MAINNET_V2_MIGRATION,
} from '../../../constants'

const getDefaultSelection = (_assets, { strategy = 'pBTC-v1-to-v2' }) => {
  let from, to
  switch (strategy) {
    case 'a':
      from = _assets.find(({ id }) => id === PBTC_ON_ETH_MAINNET_V1_MIGRATION)
      to = _assets.find(({ id }) => id === PBTC_ON_ETH_MAINNET_V2_MIGRATION)
      break
    default:
      break
  }

  return [
    {
      ...from,
      defaultFrom: true
    },
    {
      ...to,
      defaultTo: true
    }
  ]
}

export { getDefaultSelection }
