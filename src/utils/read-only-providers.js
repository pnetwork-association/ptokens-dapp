import store from '../store'
import Web3 from 'web3'
import { JsonRpc } from 'eosjs'
import fetch from 'cross-fetch'
import { Algodv2 } from 'algosdk'
import {
  getRpcNodeEndopointByBlockchain,
  getRpcNodePortByBlockchain,
  getRpcNodeTokenByBlockchain,
} from '../store/settings/settings.selectors'
import { Blockchain } from '../constants'

const getReadOnlyProviderByBlockchain = (_blockchain) => {
  const state = store.getState()
  switch (_blockchain) {
    case Blockchain.Ethereum:
    case Blockchain.BSC:
    case Blockchain.Polygon:
    case Blockchain.XDAI:
    case Blockchain.Arbitrum:
    case Blockchain.Luxochain:
    case Blockchain.Fantom:
      return new Web3.providers.HttpProvider(getRpcNodeEndopointByBlockchain(state, _blockchain))
    case Blockchain.EOS:
    case Blockchain.Telos:
    case Blockchain.Libre:
    case Blockchain.Ultra:
    case Blockchain.Ore:
      return new JsonRpc(getRpcNodeEndopointByBlockchain(state, _blockchain), { fetch })
    case Blockchain.Algorand:
      return new Algodv2(
        getRpcNodeTokenByBlockchain(state, _blockchain),
        getRpcNodeEndopointByBlockchain(state, _blockchain),
        getRpcNodePortByBlockchain(state, _blockchain)
      )
    case Blockchain.Bitcoin:
    case Blockchain.Litecoin:
      return getRpcNodeEndopointByBlockchain(state, _blockchain)
    default:
      return null
  }
}

export { getReadOnlyProviderByBlockchain }
