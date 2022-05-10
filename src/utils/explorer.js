import settings from '../settings'

const transactionBaseLink = {
  ETH: `${settings.explorers.mainnet.eth}tx/`,
  XDAI: `${settings.explorers.mainnet.xdai}tx/`,
  POLYGON: `${settings.explorers.mainnet.polygon}tx/`,
  BSC: `${settings.explorers.mainnet.bsc}tx/`,
  EOS: `${settings.explorers.mainnet.eos}tx/`,
  TELOS: `${settings.explorers.mainnet.telos}tx/`,
  BTC: `${settings.explorers.mainnet.btc}tx/`,
  LTC: `${settings.explorers.mainnet.ltc}tx/`,
  RVN: `${settings.explorers.mainnet.rvn}tx/`,
  DOGE: `${settings.explorers.mainnet.doge}tx/`,
  LBC: `${settings.explorers.mainnet.lbc}tx/`,
  ULTRA: `${settings.explorers.mainnet.ultra}tx/`,
  ARBITRUM: `${settings.explorers.mainnet.arbitrum}tx/`,
  LUXOCHAIN: `${settings.explorers.mainnet.luxochain}tx/`,
  ALGORAND: `${settings.explorers.mainnet.algorand}tx/`,
  FTM: `${settings.explorers.mainnet.ftm}tx/`
}

const addressBaseLink = {
  ETH: `${settings.explorers.mainnet.eth}address/`,
  XDAI: `${settings.explorers.mainnet.xdai}address/`,
  POLYGON: `${settings.explorers.mainnet.polygon}address/`,
  BSC: `${settings.explorers.mainnet.bsc}address/`,
  EOS: `${settings.explorers.mainnet.eos}address/`,
  TELOS: `${settings.explorers.mainnet.telos}account/`,
  BTC: `${settings.explorers.mainnet.btc}address/`,
  LTC: `${settings.explorers.mainnet.ltc}address/`,
  RVN: `${settings.explorers.mainnet.rvn}address/`,
  DOGE: `${settings.explorers.mainnet.doge}address/`,
  LBC: `${settings.explorers.mainnet.lbc}address/`,
  ULTRA: `${settings.explorers.mainnet.ultra}account/`,
  ARBITRUM: `${settings.explorers.mainnet.arbitrum}address/`,
  LUXOCHAIN: `${settings.explorers.mainnet.luxochain}address/`,
  ALGORAND: `${settings.explorers.mainnet.algorand}address/`,
  FTM: `${settings.explorers.mainnet.ftm}address/`
}

const tokenBaseLink = {
  ETH: `${settings.explorers.mainnet.eth}token/`,
  XDAI: `${settings.explorers.mainnet.xdai}address/`,
  POLYGON: `${settings.explorers.mainnet.polygon}address/`,
  BSC: `${settings.explorers.mainnet.bsc}token/`,
  EOS: `${settings.explorers.mainnet.eos}address/`,
  TELOS: `${settings.explorers.mainnet.telos}account/`,
  BTC: `${settings.explorers.mainnet.btc}address/`,
  LTC: `${settings.explorers.mainnet.ltc}address/`,
  RVN: `${settings.explorers.mainnet.rvn}address/`,
  DOGE: `${settings.explorers.mainnet.doge}address/`,
  LBC: `${settings.explorers.mainnet.lbc}address/`,
  ULTRA: `${settings.explorers.mainnet.ultra}account/`,
  ARBITRUM: `${settings.explorers.mainnet.arbitrum}token/`,
  LUXOCHAIN: `${settings.explorers.mainnet.luxochain}token/`,
  ALGORAND: `${settings.explorers.mainnet.algorand}address/`,
  FTM: `${settings.explorers.mainnet.ftm}token/`
}

const getCorrespondingBaseTxExplorerLinkByBlockchain = _blockchain => transactionBaseLink[_blockchain.toUpperCase()]

const getCorrespondingBaseAccountExplorerLinkByBlockchain = _blockchain => addressBaseLink[_blockchain.toUpperCase()]

const getCorrespondingBaseTokenExplorerLinkByBlockchain = _blockchain => tokenBaseLink[_blockchain.toUpperCase()]

export {
  getCorrespondingBaseTxExplorerLinkByBlockchain,
  getCorrespondingBaseAccountExplorerLinkByBlockchain,
  getCorrespondingBaseTokenExplorerLinkByBlockchain
}
