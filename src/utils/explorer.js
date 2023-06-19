import { sprintf } from 'sprintf-js'
import settings from '../settings'
import { Blockchain } from '../constants'

const transactionBaseLink = {
  [Blockchain.Ethereum]: `${settings.explorers.mainnet.eth}tx/%s`,
  [Blockchain.XDAI]: `${settings.explorers.mainnet.xdai}tx/%s`,
  [Blockchain.Polygon]: `${settings.explorers.mainnet.polygon}tx/%s`,
  [Blockchain.BSC]: `${settings.explorers.mainnet.bsc}tx/%s`,
  [Blockchain.EOS]: `${settings.explorers.mainnet.eos}tx/%s`,
  [Blockchain.Telos]: `${settings.explorers.mainnet.telos}transaction/%s`,
  [Blockchain.Libre]: `${settings.explorers.mainnet.libre}transaction/%s`,
  [Blockchain.Bitcoin]: `${settings.explorers.mainnet.btc}tx/%s`,
  [Blockchain.Litecoin]: `${settings.explorers.mainnet.ltc}tx/%s`,
  [Blockchain.Dogecoin]: `${settings.explorers.mainnet.doge}tx/%s`,
  [Blockchain.Ultra]: `${settings.explorers.mainnet.ultra}tx/%s`,
  [Blockchain.Arbitrum]: `${settings.explorers.mainnet.arbitrum}tx/%s`,
  [Blockchain.Luxochain]: `${settings.explorers.mainnet.luxochain}tx/%s`,
  [Blockchain.Algorand]: `${settings.explorers.mainnet.algorand}tx/group/%s`,
  [Blockchain.Fantom]: `${settings.explorers.mainnet.ftm}tx/%s`,
  [Blockchain.Ore]: `${settings.explorers.mainnet.ore}tx/%s`,
}

const tokenBaseLink = {
  [Blockchain.Ethereum]: `${settings.explorers.mainnet.eth}token/%s`,
  [Blockchain.XDAI]: `${settings.explorers.mainnet.xdai}address/%s`,
  [Blockchain.Polygon]: `${settings.explorers.mainnet.polygon}address/%s`,
  [Blockchain.BSC]: `${settings.explorers.mainnet.bsc}token/%s`,
  [Blockchain.EOS]: `${settings.explorers.mainnet.eos}account/%s`,
  [Blockchain.Telos]: `${settings.explorers.mainnet.telos}account/%s`,
  [Blockchain.Libre]: `${settings.explorers.mainnet.libre}account/%s`,
  [Blockchain.Bitcoin]: `${settings.explorers.mainnet.btc}address/%s`,
  [Blockchain.Litecoin]: `${settings.explorers.mainnet.ltc}address/%s`,
  [Blockchain.Dogecoin]: `${settings.explorers.mainnet.doge}address/%s`,
  [Blockchain.Ultra]: `${settings.explorers.mainnet.ultra}account/%s`,
  [Blockchain.Arbitrum]: `${settings.explorers.mainnet.arbitrum}token/%s`,
  [Blockchain.Luxochain]: `${settings.explorers.mainnet.luxochain}token/%s`,
  [Blockchain.Algorand]: `${settings.explorers.mainnet.algorand}asset/%s`,
  [Blockchain.Fantom]: `${settings.explorers.mainnet.ftm}token/%s`,
  [Blockchain.Ore]: `${settings.explorers.mainnet.ore}account/%s`,
}

const getCorrespondingTxExplorerLinkByBlockchain = (_blockchain, _hash) =>
  sprintf(transactionBaseLink[_blockchain.toUpperCase()], encodeURIComponent(_hash))

const getCorrespondingTokenExplorerLinkByBlockchain = (_blockchain, _address) =>
  sprintf(tokenBaseLink[_blockchain.toUpperCase()], encodeURIComponent(_address))

export { getCorrespondingTxExplorerLinkByBlockchain, getCorrespondingTokenExplorerLinkByBlockchain }
