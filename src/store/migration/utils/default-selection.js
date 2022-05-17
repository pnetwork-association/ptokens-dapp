import {
  PBTC_ON_ETH_MAINNET_V1_MIGRATION,
  PBTC_ON_ETH_MAINNET_V2_MIGRATION,
  PBTC_SBTC_CRV_GAUGE_DEPOSIT_MIGRATION,
  PBTC_SBTC_CURVE_ON_ETH_MAINNET_V2_MIGRATION,
  IDLE_CDO_AA_TRANCHE_CVX_PBTC_V2_SBTC_CRV_MIGRATION,
  IDLE_CDO_BB_TRANCHE_CVX_PBTC_V2_SBTC_CRV_MIGRATION
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
    case 'c':
      from = _assets.find(({ id }) => id === PBTC_SBTC_CRV_GAUGE_DEPOSIT_MIGRATION)
      to = _assets.find(({ id }) => id === IDLE_CDO_AA_TRANCHE_CVX_PBTC_V2_SBTC_CRV_MIGRATION)
      break
    case 'd':
      from = _assets.find(({ id }) => id === PBTC_SBTC_CRV_GAUGE_DEPOSIT_MIGRATION)
      to = _assets.find(({ id }) => id === IDLE_CDO_BB_TRANCHE_CVX_PBTC_V2_SBTC_CRV_MIGRATION)
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
