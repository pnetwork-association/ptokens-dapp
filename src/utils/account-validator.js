import { ChainId } from 'ptokens-constants'
import { validators, stringUtils } from 'ptokens-helpers'

const isValidAccountByBlockchain = (_account, _blockchain) => {
  if (!_account) return false
  switch (_blockchain) {
    case 'ETH':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.EthereumMainnet)
    case 'XDAI':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.XdaiMainnet)
    case 'POLYGON':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.PolygonMainnet)
    case 'BSC':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.BscMainnet)
    case 'ARBITRUM':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.ArbitrumMainnet)
    case 'LUXOCHAIN':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.LuxochainMainnet)
    case 'TELOS':
      return validators.isValidAddressByChainId(_account, ChainId.TelosMainnet)
    case 'EOS':
      return validators.isValidAddressByChainId(_account, ChainId.EosMainnet)
    case 'ULTRA':
      return validators.isValidAddressByChainId(_account, ChainId.UltraMainnet)
    case 'ALGORAND':
      return validators.isValidAddressByChainId(_account, ChainId.AlgorandMainnet)
    case 'FTM':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.FantomMainnet)
    case 'ORE':
      return validators.isValidAddressByChainId(_account, ChainId.EosMainnet)
    case 'BTC':
      return validators.isValidAddressByChainId(_account, ChainId.BitcoinMainnet)
    default:
      return false
  }
}

export { isValidAccountByBlockchain }
