import { ChainId } from 'ptokens-constants'
import { validators, stringUtils } from 'ptokens-helpers'
import { Blockchain } from '../constants'

const isValidAccountByBlockchain = (_account, _blockchain) => {
  if (!_account) return false
  switch (_blockchain) {
    case Blockchain.Ethereum:
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.EthereumMainnet)
    case Blockchain.XDAI:
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.XdaiMainnet)
    case Blockchain.Polygon:
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.PolygonMainnet)
    case Blockchain.BSC:
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.BscMainnet)
    case Blockchain.Arbitrum:
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.ArbitrumMainnet)
    case Blockchain.Luxochain:
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.LuxochainMainnet)
    case Blockchain.Telos:
      return validators.isValidAddressByChainId(_account, ChainId.TelosMainnet)
    case Blockchain.Libre:
      return validators.isValidAddressByChainId(_account, ChainId.LibreMainnet)
    case Blockchain.EOS:
      return validators.isValidAddressByChainId(_account, ChainId.EosMainnet)
    case Blockchain.Ultra:
      return validators.isValidAddressByChainId(_account, ChainId.UltraMainnet)
    case Blockchain.Algorand:
      return validators.isValidAddressByChainId(_account, ChainId.AlgorandMainnet)
    case Blockchain.Fantom:
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.FantomMainnet)
    case Blockchain.Ore:
      return validators.isValidAddressByChainId(_account, ChainId.EosMainnet)
    case Blockchain.Bitcoin:
      return validators.isValidAddressByChainId(_account, ChainId.BitcoinMainnet)
    case Blockchain.Litecoin:
      return validators.isValidAddressByChainId(_account, ChainId.LitecoinMainnet)
    default:
      return false
  }
}

export { isValidAccountByBlockchain }
