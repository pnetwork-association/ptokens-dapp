import { Blockchain, NetworkId } from 'ptokens'
import { getWeb3Settings } from 'react-web3-settings'
import { Web3 } from 'web3'

export const getReadOnlyProviderByBlockchain = (_blockchain: Blockchain | null | undefined) => {
  const settings = getWeb3Settings() as { rpcEndpoints: Record<Blockchain, string> }
  switch (_blockchain) {
    case Blockchain.Gnosis:
    case Blockchain.Arbitrum:
      return new Web3.providers.HttpProvider(settings.rpcEndpoints[_blockchain])
    default:
      return null
  }
}

export const getReadOnlyProviderByNetworkId = (_networkId: NetworkId) => {
  const map = new Map<NetworkId, Blockchain>([
    [NetworkId.ArbitrumMainnet, Blockchain.Arbitrum],
    [NetworkId.GnosisMainnet, Blockchain.Gnosis],
  ])
  switch (_networkId) {
    case NetworkId.GnosisMainnet:
    case NetworkId.ArbitrumMainnet:
      return getReadOnlyProviderByBlockchain(map.get(_networkId))
    default:
      return null
  }
}
