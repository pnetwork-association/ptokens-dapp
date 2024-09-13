import { Chain } from '@p.network/ptokens-constants'

export type BlockChain = {
  chain: Chain
  endpoint: string
  image: string
  disabledImage: string
}

const swapChains: Record<Chain, BlockChain> = {
  /* #################   Chains   #################*/
  [Chain.EthereumMainnet]: {
    chain: Chain.EthereumMainnet,
    endpoint: 'https://ethereum.publicnode.com',
    image: 'ETH.svg',
    disabledImage: 'ETH_gray.svg'
  },
  [Chain.BscMainnet]: {
    chain: Chain.BscMainnet,
    endpoint: 'https://endpoints.omniatech.io/v1/bsc/mainnet/public',
    image: 'BSC.svg',
    disabledImage: 'BSC_gray.svg'
  },
  [Chain.GnosisMainnet]: {
    chain: Chain.GnosisMainnet,
    endpoint: 'https://rpc.xdaichain.com/',
    image: 'GNOSIS.svg',
    disabledImage: 'GNOSIS_gray.svg'
  },
  [Chain.PolygonMainnet]: {
    chain: Chain.PolygonMainnet,
    endpoint: 'https://polygon-rpc.com/',
    image: 'POLYGON.svg',
    disabledImage: 'POLYGON_gray.svg'
  },
  [Chain.EosMainnet]: {
    chain: Chain.EosMainnet,
    endpoint: 'placeholder',
    image: 'POLYGON.svg',
    disabledImage: 'POLYGON_gray.svg'
  },
}

export default swapChains