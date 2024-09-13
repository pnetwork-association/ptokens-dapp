import { Chain, Protocol } from '@p.network/ptokens-constants'

import settings from '../settings'

const transactionBaseLink: Record<Chain, string> = {
  [Chain.GnosisMainnet]: `${settings.explorers[Protocol.EVM][Chain.GnosisMainnet]}tx/` + '',
  [Chain.EthereumMainnet]: `${settings.explorers[Protocol.EVM][Chain.EthereumMainnet]}tx/`,
  [Chain.BscMainnet]: `${settings.explorers[Protocol.EVM][Chain.BscMainnet]}tx/`,
  [Chain.PolygonMainnet]: `${settings.explorers[Protocol.EVM][Chain.PolygonMainnet]}tx/`,
  [Chain.EosMainnet]: `${settings.explorers[Protocol.EVM][Chain.EosMainnet]}tx/` // FIXME check EOS explorer url
}

const tokenBaseLink: Record<Chain, string> = {
  [Chain.GnosisMainnet]: `${settings.explorers[Protocol.EVM][Chain.GnosisMainnet]}address/`,
  [Chain.EthereumMainnet]: `${settings.explorers[Protocol.EVM][Chain.EthereumMainnet]}token/`,
  [Chain.BscMainnet]: `${settings.explorers[Protocol.EVM][Chain.BscMainnet]}token/`,
  [Chain.PolygonMainnet]: `${settings.explorers[Protocol.EVM][Chain.PolygonMainnet]}address/`,
  [Chain.EosMainnet]: `${settings.explorers[Protocol.EVM][Chain.EosMainnet]}token/`
}

const getCorrespondingTxExplorerLinkByChain = (_chain: Chain, _hash: string) => {
  const baseLink = transactionBaseLink[_chain]
  const encodedHash = encodeURIComponent(_hash)
  return `${baseLink}${encodedHash}`
}

const getCorrespondingTokenExplorerLinkByChain = (_chain: Chain, _address: string) => {
  const baseLink = tokenBaseLink[_chain]
  const encodedHash = encodeURIComponent(_address)
  return `${baseLink}${encodedHash}`
}

export { getCorrespondingTxExplorerLinkByChain, getCorrespondingTokenExplorerLinkByChain }