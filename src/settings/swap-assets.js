import settings from './index'

const swapAssets = [
  ...settings.pTokensAvailable,
  {
    id: 'ETH',
    name: 'ETH',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18
  },
  {
    id: 'EOS',
    name: 'EOS',
    network: 'mainnet',
    skipNodeSelection: true,
    decimals: 8
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
  },
  {
    id: 'UNI',
    name: 'UNI',
    network: 'mainnet',
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18
  }
]

export default swapAssets
