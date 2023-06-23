import { sprintf } from 'sprintf-js'

import settings from '../settings'

const transactionBaseLink = {
  ETH: `${settings.explorers.mainnet.eth}tx/%s`,
  XDAI: `${settings.explorers.mainnet.xdai}tx/%s`,
  POLYGON: `${settings.explorers.mainnet.polygon}tx/%s`,
  BSC: `${settings.explorers.mainnet.bsc}tx/%s`,
  EOS: `${settings.explorers.mainnet.eos}tx/%s`,
  TELOS: `${settings.explorers.mainnet.telos}transaction/%s`,
  LIBRE: `${settings.explorers.mainnet.libre}transaction/%s`,
  BTC: `${settings.explorers.mainnet.btc}tx/%s`,
  LTC: `${settings.explorers.mainnet.ltc}tx/%s`,
  RVN: `${settings.explorers.mainnet.rvn}tx/%s`,
  DOGE: `${settings.explorers.mainnet.doge}tx/%s`,
  LBC: `${settings.explorers.mainnet.lbc}tx/%s`,
  ULTRA: `${settings.explorers.mainnet.ultra}tx/%s`,
  ARBITRUM: `${settings.explorers.mainnet.arbitrum}tx/%s`,
  LUXOCHAIN: `${settings.explorers.mainnet.luxochain}tx/%s`,
  ALGORAND: `${settings.explorers.mainnet.algorand}tx/group/%s`,
  FTM: `${settings.explorers.mainnet.ftm}tx/%s`,
  ORE: `${settings.explorers.mainnet.ore}tx/%s`,
}

const tokenBaseLink = {
  ETH: `${settings.explorers.mainnet.eth}token/%s`,
  XDAI: `${settings.explorers.mainnet.xdai}address/%s`,
  POLYGON: `${settings.explorers.mainnet.polygon}address/%s`,
  BSC: `${settings.explorers.mainnet.bsc}token/%s`,
  EOS: `${settings.explorers.mainnet.eos}account/%s`,
  TELOS: `${settings.explorers.mainnet.telos}account/%s`,
  LIBRE: `${settings.explorers.mainnet.libre}account/%s`,
  BTC: `${settings.explorers.mainnet.btc}address/%s`,
  LTC: `${settings.explorers.mainnet.ltc}address/%s`,
  RVN: `${settings.explorers.mainnet.rvn}address/%s`,
  DOGE: `${settings.explorers.mainnet.doge}address/%s`,
  LBC: `${settings.explorers.mainnet.lbc}address/%s`,
  ULTRA: `${settings.explorers.mainnet.ultra}account/%s`,
  ARBITRUM: `${settings.explorers.mainnet.arbitrum}token/%s`,
  LUXOCHAIN: `${settings.explorers.mainnet.luxochain}token/%s`,
  ALGORAND: `${settings.explorers.mainnet.algorand}asset/%s`,
  FTM: `${settings.explorers.mainnet.ftm}token/%s`,
  ORE: `${settings.explorers.mainnet.ore}account/%s`,
}

const getCorrespondingTxExplorerLinkByBlockchain = (_blockchain, _hash) =>
  sprintf(transactionBaseLink[_blockchain.toUpperCase()], encodeURIComponent(_hash))

const getCorrespondingTokenExplorerLinkByBlockchain = (_blockchain, _address) =>
  sprintf(tokenBaseLink[_blockchain.toUpperCase()], encodeURIComponent(_address))

export { getCorrespondingTxExplorerLinkByBlockchain, getCorrespondingTokenExplorerLinkByBlockchain }
