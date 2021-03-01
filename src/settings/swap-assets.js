import settings from './index'

const swapAssets = [
  ...settings.pTokensAvailable,
  {
    id: 'ETH',
    name: 'ETH'
  },
  {
    id: 'EOS',
    name: 'EOS'
  },
  {
    id: 'BTC',
    name: 'BTC'
  },
  {
    id: 'LTC',
    name: 'LTC'
  }
]

export default swapAssets
