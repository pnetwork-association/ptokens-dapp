import settings from '../settings'
import Web3 from 'web3'
import { JsonRpc } from 'eosjs'
import fetch from 'node-fetch'

const getCorrespondingReadOnlyProvider = _blockchain => {
  // TODO: only mainnet at the moment
  if (_blockchain === 'ETH') {
    return new Web3.providers.WebsocketProvider(settings.rpc.mainnet.eth.wsEndpoint)
  }
  if (_blockchain === 'BSC') {
    return new Web3.providers.HttpProvider(settings.rpc.mainnet.bsc.endpoint)
  }
  if (_blockchain === 'POLYGON') {
    return new Web3.providers.HttpProvider(settings.rpc.mainnet.polygon.endpoint)
  }
  if (_blockchain === 'XDAI') {
    return new Web3.providers.HttpProvider(settings.rpc.mainnet.xdai.endpoint)
  }
  if (_blockchain === 'EOS') {
    return new JsonRpc(settings.rpc.mainnet.eos.endpoint, { fetch })
  }
  if (_blockchain === 'TELOS') {
    return new JsonRpc(settings.rpc.mainnet.telos.endpoint, { fetch })
  }

  return null
}

export { getCorrespondingReadOnlyProvider }
