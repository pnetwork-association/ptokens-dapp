import settings from '../settings'

const getCorrespondingBaseTxExplorerLinkByBlockchain = _blockchain => {
  switch (_blockchain) {
    case 'ETH':
      return `${settings.explorers.mainnet.eth}tx/`
    case 'XDAI':
      return `${settings.explorers.mainnet.xdai}tx/`
    case 'POLYGON':
      return `${settings.explorers.mainnet.polygon}tx/`
    case 'BSC':
      return `${settings.explorers.mainnet.bsc}tx/`
    case 'EOS':
      return `${settings.explorers.mainnet.eos}tx/`
    case 'TELOS':
      return `${settings.explorers.mainnet.telos}transaction/`
    case 'BTC':
      return `${settings.explorers.mainnet.btc}tx/`
    case 'LTC':
      return `${settings.explorers.mainnet.ltc}tx/`
    case 'RVN':
      return `${settings.explorers.mainnet.rvn}tx/`
    case 'DOGE':
      return `${settings.explorers.mainnet.doge}tx/`
    default:
      throw new Error('Invalid blockchain')
  }
}

const getCorrespondingBaseAccountExplorerLinkByBlockchain = _blockchain => {
  switch (_blockchain) {
    case 'ETH':
      return `${settings.explorers.mainnet.eth}address/`
    case 'XDAI':
      return `${settings.explorers.mainnet.xdai}address/`
    case 'POLYGON':
      return `${settings.explorers.mainnet.polygon}address/`
    case 'BSC':
      return `${settings.explorers.mainnet.bsc}address/`
    case 'EOS':
      return `${settings.explorers.mainnet.eos}address/`
    case 'TELOS':
      return `${settings.explorers.mainnet.telos}accounts/`
    case 'BTC':
      return `${settings.explorers.mainnet.btc}address/`
    case 'LTC':
      return `${settings.explorers.mainnet.ltc}address/`
    case 'RVN':
      return `${settings.explorers.mainnet.rvn}address/`
    case 'DOGE':
      return `${settings.explorers.mainnet.doge}address/`
    default:
      throw new Error('Invalid blockchain')
  }
}

export { getCorrespondingBaseTxExplorerLinkByBlockchain, getCorrespondingBaseAccountExplorerLinkByBlockchain }
