import { ChainId } from 'ptokens-constants'
import { validators, stringUtils } from 'ptokens-helpers'

const isValidAccountByBlockchain = (_account, _blockchain) => {
  if (!_account) return false
  switch (_blockchain) {
    case 'ETH':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.EthereumMainnet)
    case 'GNOSIS':
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
    case 'LIBRE':
      return validators.isValidAddressByChainId(_account, ChainId.LibreMainnet)
    case 'EOS':
      return validators.isValidAddressByChainId(_account, ChainId.EosMainnet)
    case 'ULTRA':
      return validators.isValidAddressByChainId(_account, ChainId.UltraMainnet)
    case 'ALGORAND':
      return validators.isValidAddressByChainId(_account, ChainId.AlgorandMainnet)
    case 'FTM':
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), ChainId.FantomMainnet)
    case 'BTC':
      return validators.isValidAddressByChainId(_account, ChainId.BitcoinMainnet)
    case 'LTC':
      return validators.isValidAddressByChainId(_account, ChainId.LitecoinMainnet)
    default:
      return false
  }
}

const isSmartContract = async (account, web3) => {
  const code = await web3.eth.getCode(account)
  if (code !== '0x') return false
  else return true
}

export { isValidAccountByBlockchain, isSmartContract }
