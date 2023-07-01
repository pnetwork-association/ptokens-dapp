import { Blockchain, Network } from 'ptokens'
import { sprintf } from 'sprintf-js'

import settings from '../settings'

const transactionBaseLink = {
  [Blockchain.Gnosis]: `${settings.explorers[Network.Mainnet][Blockchain.Gnosis]}tx/%s`,
  [Blockchain.Arbitrum]: `${settings.explorers[Network.Mainnet][Blockchain.Arbitrum]}tx/%s`,
}

const tokenBaseLink = {
  [Blockchain.Gnosis]: `${settings.explorers[Network.Mainnet][Blockchain.Gnosis]}address/%s`,
  [Blockchain.Arbitrum]: `${settings.explorers[Network.Mainnet][Blockchain.Arbitrum]}token/%s`,
}

const getCorrespondingTxExplorerLinkByBlockchain = (_blockchain, _hash) =>
  sprintf(transactionBaseLink[_blockchain], encodeURIComponent(_hash))

const getCorrespondingTokenExplorerLinkByBlockchain = (_blockchain, _address) =>
  sprintf(tokenBaseLink[_blockchain], encodeURIComponent(_address))

export { getCorrespondingTxExplorerLinkByBlockchain, getCorrespondingTokenExplorerLinkByBlockchain }
