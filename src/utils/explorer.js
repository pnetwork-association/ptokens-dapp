import { sprintf } from 'sprintf-js'
import { Blockchain } from '../constants'
import store from '../store'
import { getExplorerBaseByBlockchain } from '../store/settings/settings.selectors'

const getTransactionFormatString = (_blockchain) => {
  const state = store.getState()
  switch (_blockchain) {
    case Blockchain.Ethereum:
    case Blockchain.XDAI:
    case Blockchain.Polygon:
    case Blockchain.BSC:
    case Blockchain.EOS:
    case Blockchain.Bitcoin:
    case Blockchain.Litecoin:
    case Blockchain.Dogecoin:
    case Blockchain.Ultra:
    case Blockchain.Arbitrum:
    case Blockchain.Luxochain:
    case Blockchain.Fantom:
    case Blockchain.Ore:
      return `${getExplorerBaseByBlockchain(state, _blockchain)}tx/%s`
    case Blockchain.Telos:
    case Blockchain.Libre:
      return `${getExplorerBaseByBlockchain(state, _blockchain)}transaction/%s`
    case Blockchain.Algorand:
      return `${getExplorerBaseByBlockchain(state, _blockchain)}tx/group/%s`
    default:
      throw new Error(`Missing explorer for ${_blockchain}`)
  }
}

const getTokenFormatString = (_blockchain) => {
  const state = store.getState()
  switch (_blockchain) {
    case Blockchain.Ethereum:
    case Blockchain.BSC:
    case Blockchain.Arbitrum:
    case Blockchain.Luxochain:
    case Blockchain.Fantom:
      return `${getExplorerBaseByBlockchain(state, _blockchain)}token/%s`
    case Blockchain.XDAI:
    case Blockchain.Polygon:
    case Blockchain.Bitcoin:
    case Blockchain.Litecoin:
    case Blockchain.Dogecoin:
      return `${getExplorerBaseByBlockchain(state, _blockchain)}address/%s`
    case Blockchain.EOS:
    case Blockchain.Telos:
    case Blockchain.Libre:
    case Blockchain.Ultra:
    case Blockchain.Ore:
      return `${getExplorerBaseByBlockchain(state, _blockchain)}account/%s`
    case Blockchain.Algorand:
      return `${getExplorerBaseByBlockchain(state, _blockchain)}asset/%s`
    default:
      throw new Error(`Missing explorer for ${_blockchain}`)
  }
}
const getCorrespondingTxExplorerLinkByBlockchain = (_blockchain, _hash) => {
  const formatString = getTransactionFormatString(_blockchain)
  return sprintf(formatString, encodeURIComponent(_hash))
}

const getCorrespondingTokenExplorerLinkByBlockchain = (_blockchain, _address) => {
  const formatString = getTokenFormatString(_blockchain)
  return sprintf(formatString, encodeURIComponent(_address))
}

export { getCorrespondingTxExplorerLinkByBlockchain, getCorrespondingTokenExplorerLinkByBlockchain }
