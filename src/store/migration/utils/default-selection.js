import {
  PBTC_ON_ETH_MAINNET_V1_MIGRATION,
  PBTC_ON_ETH_MAINNET_V2_MIGRATION,
  PBTC_SBTC_CRV_GAUGE_DEPOSIT_MIGRATION,
  PBTC_SBTC_CURVE_ON_ETH_MAINNET_V2_MIGRATION,
} from '../../../constants'

const getDefaultSelection = (_assets, { strategy = 'a' }) => {
  let from, to
  switch (strategy) {
    case 'a':
      from = _assets.find(({ id }) => id === PBTC_ON_ETH_MAINNET_V1_MIGRATION)
      to = _assets.find(({ id }) => id === PBTC_ON_ETH_MAINNET_V2_MIGRATION)
      break
    case 'b':
      from = _assets.find(({ id }) => id === PBTC_SBTC_CRV_GAUGE_DEPOSIT_MIGRATION)
      to = _assets.find(({ id }) => id === PBTC_SBTC_CURVE_ON_ETH_MAINNET_V2_MIGRATION)
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
