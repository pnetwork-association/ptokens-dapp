const migrationAssets = [
  {
    address: '5228a22e72ccc52d415ecfd199f99d0665e7733b',
    id: 'PBTC_ON_ETH_MAINNET_V1',
    name: 'pNetwork BTC',
    workingName: 'pbtc',
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    miniImage: 'ETH',
    decimals: 18,
    withMiniImage: false,
    symbol: 'PBTC',
    isBase: true,
    image: 'pBTC.svg',
    version: 1,
    titleLabel: 'pBTC V1',
    formattedName: 'pBTC V1',
    strategy: 'migratePbtcV1ToPbtcV2',
    compatibleWith: ['PBTC_ON_ETH_MAINNET_V2'],
    type: 'v1'
  },
  {
    address: '5228a22e72ccc52d415ecfd199f99d0665e7733b',
    id: 'PBTC_CURVE_ON_ETH_MAINNET_V1',
    name: 'pNetwork BTC',
    workingName: 'pbtc',
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    miniImage: 'CURVE',
    decimals: 18,
    withMiniImage: true,
    symbol: 'PBTC',
    isBase: true,
    image: 'pBTC.svg',
    version: 1,
    titleLabel: 'pBTC V1 Staked on Curve',
    formattedName: 'pBTC V1 Staked on Curve',
    compatibleWith: ['PBTC_ON_ETH_MAINNET_V2'],
    type: 'todo'
  },
  {
    address: '5228a22e72ccc52d415ecfd199f99d0665e7733b', // TODO: change
    id: 'PBTC_ON_ETH_MAINNET_V2',
    name: 'pNetwork BTC',
    workingName: 'pbtc',
    network: 'mainnet',
    isHidden: false,
    blockchain: 'ETH',
    miniImage: 'ETH',
    decimals: 18,
    withMiniImage: false,
    symbol: 'PBTC',
    isBase: false,
    image: 'pBTC.svg',
    version: 2,
    titleLabel: 'pBTC V2',
    formattedName: 'pBTC V2',
    type: 'v2'
  }
]

export default migrationAssets
