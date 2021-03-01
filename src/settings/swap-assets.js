import settings from './index'

const swapAssets = [
  ...settings.pTokensAvailable,
  {
    id: 'ETH',
    name: 'ETH',
    network: 'mainnet',
    skipNodeSelection: true
  },
  {
    id: 'EOS',
    name: 'EOS',
    network: 'mainnet',
    skipNodeSelection: true
  },
  {
    id: 'BTC',
    name: 'BTC',
    network: 'mainnet',
    skipNodeSelection: true
  },
  {
    id: 'LTC',
    name: 'LTC',
    network: 'mainnet',
    skipNodeSelection: true
  }
]

export default swapAssets
