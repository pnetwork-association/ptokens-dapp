import { MigrationAssetId } from '../../../constants'

const getDefaultSelection = (_assets, { strategy = 'pBTC-v1-to-v2' }) => {
  let from, to
  switch (strategy) {
    case 'pBTC-v1-to-v2':
      from = _assets.find(({ id }) => id === MigrationAssetId.PBTC_ON_ETH_MAINNET_V1_MIGRATION)
      to = _assets.find(({ id }) => id === MigrationAssetId.PBTC_ON_ETH_MAINNET_V2_MIGRATION)
      break
    case 'ethPNT-to-PNT':
      from = _assets.find(({ id }) => id === MigrationAssetId.ETHPNT_ON_ETH_MAINNET)
      to = _assets.find(({ id }) => id === MigrationAssetId.PNT_ON_ETH_MAINNET)
      break
    default:
      break
  }

  return [
    {
      ...from,
      defaultFrom: true,
    },
    {
      ...to,
      defaultTo: true,
    },
  ]
}

export { getDefaultSelection }
