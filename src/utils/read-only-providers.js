import { Blockchain } from 'ptokens'
import { getWeb3Settings } from 'react-web3-settings'
import Web3 from 'web3'

const getReadOnlyProviderByBlockchain = (_blockchain) => {
  const settings = getWeb3Settings()
  switch (_blockchain) {
    case Blockchain.Gnosis:
    case Blockchain.Arbitrum:
      return new Web3.providers.HttpProvider(settings.rpcEndpoints[_blockchain])
    default:
      return null
  }
}

export { getReadOnlyProviderByBlockchain }
