import { Blockchain, Network } from 'ptokens-constants'

import settings from '../settings'

const transactionBaseLink: Record<Blockchain, string> = {
  [Blockchain.Gnosis]: `${settings.explorers[Network.Mainnet][Blockchain.Gnosis]}tx/%s`,
  [Blockchain.Arbitrum]: `${settings.explorers[Network.Mainnet][Blockchain.Arbitrum]}tx/%s`,
  [Blockchain.Ethereum]: '',
  [Blockchain.Sepolia]: '',
  [Blockchain.Goerli]: '',
  [Blockchain.Bitcoin]: '',
  [Blockchain.Eos]: '',
  [Blockchain.Telos]: '',
  [Blockchain.Bsc]: '',
  [Blockchain.Xdai]: '',
  [Blockchain.Polygon]: '',
  [Blockchain.Ultra]: '',
  [Blockchain.Fio]: '',
  [Blockchain.Luxochain]: '',
  [Blockchain.Fantom]: '',
  [Blockchain.Algorand]: '',
  [Blockchain.Libre]: '',
  [Blockchain.Litecoin]: ''
}

const tokenBaseLink: Record<Blockchain, string> = {
  [Blockchain.Gnosis]: `${settings.explorers[Network.Mainnet][Blockchain.Gnosis]}address/%s`,
  [Blockchain.Arbitrum]: `${settings.explorers[Network.Mainnet][Blockchain.Arbitrum]}token/%s`,
  [Blockchain.Ethereum]: '',
  [Blockchain.Sepolia]: '',
  [Blockchain.Goerli]: '',
  [Blockchain.Bitcoin]: '',
  [Blockchain.Eos]: '',
  [Blockchain.Telos]: '',
  [Blockchain.Bsc]: '',
  [Blockchain.Xdai]: '',
  [Blockchain.Polygon]: '',
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