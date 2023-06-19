import { Network } from '../../constants'

const getRpcNodeEndopointByBlockchain = (_state, _blockchain, _network = Network.Mainnet) =>
  _state.settings.rpc[_network][_blockchain].endpoint

const getRpcNodeTokenByBlockchain = (_state, _blockchain, _network = Network.Mainnet) =>
  _state.settings.rpc[_network][_blockchain].token

const getRpcNodePortByBlockchain = (_state, _blockchain, _network = Network.Mainnet) =>
  _state.settings.rpc[_network][_blockchain].port

const getSupportedNftsNumber = (_state) => _state.supportedNfts.length()

const getExplorerBaseByBlockchain = (_state, _blockchain, _network = Network.Mainnet) =>
  _state.settings.explorers[_network][_blockchain]

const getLinks = (_state) => _state.settings.links

const getNfts = (_state) => _state.settings.supportedNfts

const getApi = (_state) => _state.settings.api

export {
  getRpcNodeEndopointByBlockchain,
  getRpcNodePortByBlockchain,
  getRpcNodeTokenByBlockchain,
  getSupportedNftsNumber,
  getExplorerBaseByBlockchain,
  getLinks,
  getNfts,
  getApi,
}
