import { Blockchain, Network } from 'ptokens-constants'
import { sprintf } from 'sprintf-js'

import settings from '../settings'

const transactionBaseLink: Record<Blockchain, string> = {
  [Blockchain.Gnosis]: `${settings.explorers[Network.Mainnet][Blockchain.Gnosis]}tx/%s`,
  [Blockchain.Arbitrum]: `${settings.explorers[Network.Mainnet][Blockchain.Arbitrum]}tx/%s`,
}

const tokenBaseLink: Record<Blockchain, string> = {
  [Blockchain.Gnosis]: `${settings.explorers[Network.Mainnet][Blockchain.Gnosis]}address/%s`,
  [Blockchain.Arbitrum]: `${settings.explorers[Network.Mainnet][Blockchain.Arbitrum]}token/%s`,
}

const getCorrespondingTxExplorerLinkByBlockchain = (_blockchain: Blockchain, _hash: string) =>
  sprintf(transactionBaseLink[_blockchain], encodeURIComponent(_hash))

const getCorrespondingTokenExplorerLinkByBlockchain = (_blockchain: Blockchain, _address: string) =>
  sprintf(tokenBaseLink[_blockchain], encodeURIComponent(_address))

export { getCorrespondingTxExplorerLinkByBlockchain, getCorrespondingTokenExplorerLinkByBlockchain }
