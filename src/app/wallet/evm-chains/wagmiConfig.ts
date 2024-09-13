import { createConfig, http } from 'wagmi'
import { mainnet, bsc, gnosis, polygon } from '@wagmi/core/chains'
import { getWeb3Settings } from '@p.network/react-web3-settings'
import { Chain, chainToProtocolMap, Protocol } from '@p.network/ptokens-constants'

import settings from '../../../settings'

const setting = getWeb3Settings()

const getRpcEndpoint = (chain: Chain) => setting.rpcEndpoints ? setting.rpcEndpoints[chain] : settings.rpc[chainToProtocolMap.get(chain) as Protocol][chain]?.endpoint

const wagmiConfig = createConfig({
  chains: [mainnet, bsc, gnosis, polygon],
  transports: {
    [mainnet.id]: http(getRpcEndpoint(Chain.EthereumMainnet)),
    [bsc.id]: http(getRpcEndpoint(Chain.BscMainnet)),
    [gnosis.id]: http(getRpcEndpoint(Chain.GnosisMainnet)),
    [polygon.id]: http(getRpcEndpoint(Chain.PolygonMainnet)),
  },
})

export default wagmiConfig