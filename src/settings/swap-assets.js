import settings from './index'

const swapAssets = [
  ...settings.pTokensAvailable,
  {
    id: 'ETH',
    symbol: 'ETH',
    name: 'Ethereum',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: false,
    isPtoken: false
  },
  {
    id: 'EOS',
    symbol: 'EOS',
    name: 'EOS',
    network: 'mainnet',
    blockchain: 'EOS',
    skipNodeSelection: true,
    decimals: 8,
    withMiniImage: false,
    isPtoken: false
  },
  {
    id: 'BTC',
    symbol: 'BTC',
    name: 'Bitcoin',
    network: 'mainnet',
    blockchain: 'BTC',
    skipNodeSelection: true,
    withMiniImage: false,
    isPtoken: false
  },
  {
    id: 'LTC',
    symbol: 'LTC',
    name: 'Litecoin',
    network: 'mainnet',
    blockchain: 'LTC',
    skipNodeSelection: true,
    withMiniImage: false,
    isPtoken: false
  },
  {
    id: 'DOGE',
    symbol: 'DOGE',
    name: 'Dogecoin',
    network: 'mainnet',
    blockchain: 'DOGE',
    skipNodeSelection: true,
    withMiniImage: false,
    isPtoken: false
  },
  {
    id: 'UNI',
    symbol: 'UNI',
    name: 'Uniswap',
    network: 'mainnet',
    blockchain: 'ETH',
    skipNodeSelection: true,
    decimals: 18,
    withMiniImage: true,
    isPtoken: false
  }
]

export default swapAssets
