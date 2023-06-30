import { NetworkId } from 'ptokens-constants'
import { validators, stringUtils } from 'ptokens-helpers'

const isValidAccountByBlockchain = (_account, _blockchain) => {
  if (!_account) return false
  switch (_blockchain) {
    case 'ETH':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), NetworkId.EthereumMainnet)
    case 'SEPOLIA':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), NetworkId.SepoliaTestnet)
    case 'GOERLI':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), NetworkId.GoerliTestnet)
    case 'XDAI':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), NetworkId.GnosisMainnet)
    case 'POLYGON':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), NetworkId.PolygonMainnet)
    case 'BSC':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), NetworkId.BscMainnet)
    case 'ARBITRUM':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), NetworkId.ArbitrumMainnet)
    case 'LUXOCHAIN':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), NetworkId.LuxochainMainnet)
    case 'TELOS':
      return validators.isValidAddressByChainId(_account, NetworkId.TelosMainnet)
    case 'LIBRE':
      return validators.isValidAddressByChainId(_account, NetworkId.LibreMainnet)
    case 'EOS':
      return validators.isValidAddressByChainId(_account, NetworkId.EosMainnet)
    case 'ULTRA':
      return validators.isValidAddressByChainId(_account, NetworkId.UltraMainnet)
    case 'ALGORAND':
      return validators.isValidAddressByChainId(_account, NetworkId.AlgorandMainnet)
    case 'FTM':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), NetworkId.FantomMainnet)
    case 'ORE':
      return validators.isValidAddressByChainId(_account, NetworkId.EosMainnet)
    case 'BTC':
      return validators.isValidAddressByChainId(_account, NetworkId.BitcoinMainnet)
    case 'LTC':
      return validators.isValidAddressByChainId(_account, NetworkId.LitecoinMainnet)
    default:
      return false
  }
}

export { isValidAccountByBlockchain }
