import { createConfig, http } from 'wagmi'
import { mainnet, bsc, gnosis, polygon } from '@wagmi/core/chains'
import { getWeb3Settings } from '@p.network/react-web3-settings'
import { Chain } from '@p.network/ptokens-constants'

import settings from '../../../settings'

const setting = getWeb3Settings()

const getRpcEndpoint = (chain: Chain) => setting.rpcEndpoints ? setting.rpcEndpoints[chain] : settings.rpc[chain].endpoint

const wagmiConfig = createConfig({
  chains: [mainnet, bsc, gnosis, polygon],
  transports: {
    [mainnet.id]: http(getRpcEndpoint(Chain.Mainnet)),
    [bsc.id]: http(getRpcEndpoint(Chain.Bsc)),
    [gnosis.id]: http(getRpcEndpoint(Chain.Gnosis)),
    [polygon.id]: http(getRpcEndpoint(Chain.Polygon)),
  },
})

export default wagmiConfig