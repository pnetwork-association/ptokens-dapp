import { Blockchain, NetworkId } from 'ptokens-constants'
import { validators, stringUtils } from 'ptokens-helpers'

const isValidAccountByBlockchain = (_account, _blockchain) => {
  if (!_account) return false
  switch (_blockchain) {
    case Blockchain.Gnosis:
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), NetworkId.GnosisMainnet)
    case Blockchain.Arbitrum:
      return validators.isValidAddressByChainId(stringUtils.addHexPrefix(_account), NetworkId.ArbitrumMainnet)
    default:
      return false
  }
}

export { isValidAccountByBlockchain }
