import { Blockchain, Network } from 'ptokens-constants'

import settings from '../settings'

const transactionBaseLink: Record<Blockchain, string> = {
  [Blockchain.Gnosis]: `${settings.explorers[Network.Mainnet][Blockchain.Gnosis]}tx/`,
  [Blockchain.Arbitrum]: `${settings.explorers[Network.Mainnet][Blockchain.Arbitrum]}tx/`,
  [Blockchain.Ethereum]: `${settings.explorers[Network.Mainnet][Blockchain.Ethereum]}tx/`,
  [Blockchain.Sepolia]: '',
  [Blockchain.Goerli]: '',
  [Blockchain.Bitcoin]: '',
  [Blockchain.Eos]: '',
  [Blockchain.Telos]: '',
  [Blockchain.Bsc]: `${settings.explorers[Network.Mainnet][Blockchain.Bsc]}tx/`,
  [Blockchain.Xdai]: '',
  [Blockchain.Polygon]: `${settings.explorers[Network.Mainnet][Blockchain.Polygon]}tx/`,
  [Blockchain.Ultra]: '',
  [Blockchain.Fio]: '',
  [Blockchain.Luxochain]: '',
  [Blockchain.Fantom]: '',
  [Blockchain.Algorand]: '',
  [Blockchain.Libre]: '',
  [Blockchain.Litecoin]: ''
}

const tokenBaseLink: Record<Blockchain, string> = {
  [Blockchain.Gnosis]: `${settings.explorers[Network.Mainnet][Blockchain.Gnosis]}address/`,
  [Blockchain.Arbitrum]: `${settings.explorers[Network.Mainnet][Blockchain.Arbitrum]}token/`,
  [Blockchain.Ethereum]: `${settings.explorers[Network.Mainnet][Blockchain.Ethereum]}token/`,
  [Blockchain.Sepolia]: '',
  [Blockchain.Goerli]: '',
  [Blockchain.Bitcoin]: '',
  [Blockchain.Eos]: '',
  [Blockchain.Telos]: '',
  [Blockchain.Bsc]: `${settings.explorers[Network.Mainnet][Blockchain.Bsc]}token/`,
  [Blockchain.Xdai]: '',
  [Blockchain.Polygon]: `${settings.explorers[Network.Mainnet][Blockchain.Polygon]}address/`,
  [Blockchain.Ultra]: '',
  [Blockchain.Fio]: '',
  [Blockchain.Luxochain]: '',
  [Blockchain.Fantom]: '',
  [Blockchain.Algorand]: '',
  [Blockchain.Libre]: '',
  [Blockchain.Litecoin]: ''
}

const getCorrespondingTxExplorerLinkByBlockchain = (_blockchain: Blockchain, _hash: string) => {
  const baseLink = transactionBaseLink[_blockchain]
  const encodedHash = encodeURIComponent(_hash)
  return `${baseLink}${encodedHash}`
}

const getCorrespondingTokenExplorerLinkByBlockchain = (_blockchain: Blockchain, _address: string) => {
  const baseLink = tokenBaseLink[_blockchain]
  const encodedHash = encodeURIComponent(_address)
  return `${baseLink}${encodedHash}`
}

export { getCorrespondingTxExplorerLinkByBlockchain, getCorrespondingTokenExplorerLinkByBlockchain }