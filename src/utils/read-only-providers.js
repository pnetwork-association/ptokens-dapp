import { Blockchain, NetworkId } from 'ptokens'
import { getWeb3Settings } from 'react-web3-settings'
import Web3 from 'web3'

export const getReadOnlyProviderByBlockchain = (_blockchain) => {
  const settings = getWeb3Settings()
  switch (_blockchain) {
    case Blockchain.Gnosis:
    case Blockchain.Arbitrum:
      return new Web3.providers.HttpProvider(settings.rpcEndpoints[_blockchain])
    default:
      return null
  }
}

export const getReadOnlyProviderByNetworkId = (_networkId) => {
  const map = new Map([
    [NetworkId.ArbitrumMainnet, Blockchain.Arbitrum],
    [NetworkId.GnosisMainnet, Blockchain.Gnosis],
  ])
  const settings = getWeb3Settings()
  switch (_networkId) {
    case NetworkId.GnosisMainnet:
    case NetworkId.ArbitrumMainnet:
      return new Web3.providers.HttpProvider(settings.rpcEndpoints[map.get(_networkId)])
    default:
      return null
  }
}
