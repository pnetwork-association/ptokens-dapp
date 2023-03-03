import settings from '../settings'
import Web3 from 'web3'
import { JsonRpc } from 'eosjs'
import fetch from 'cross-fetch'
import { Algodv2 } from 'algosdk'

const getReadOnlyProviderByBlockchain = _blockchain => {
  // TODO: only mainnet at the moment
  if (_blockchain === 'ETH') {
    return new Web3.providers.HttpProvider(settings.rpc.mainnet.eth.endpoint)
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
  if (_blockchain === 'LIBRE') {
    return new JsonRpc(settings.rpc.mainnet.libre.endpoint, { fetch })
  }
  if (_blockchain === 'ULTRA') {
    return new JsonRpc(settings.rpc.mainnet.ultra.endpoint, { fetch })
  }
  if (_blockchain === 'ORE') {
    return new JsonRpc(settings.rpc.mainnet.ore.endpoint, { fetch })
  }
  if (_blockchain === 'ARBITRUM') {
    return new Web3.providers.HttpProvider(settings.rpc.mainnet.arbitrum.endpoint)
  }
  if (_blockchain === 'LUXOCHAIN') {
    return new Web3.providers.HttpProvider(settings.rpc.mainnet.luxochain.endpoint)
  }
  if (_blockchain === 'ALGORAND') {
    return new Algodv2(
      settings.rpc.mainnet.algorand.token,
      settings.rpc.mainnet.algorand.endpoint,
      settings.rpc.mainnet.algorand.port
    )
  }
  if (_blockchain === 'FTM') {
    return new Web3.providers.HttpProvider(settings.rpc.mainnet.ftm.endpoint)
  }
  if (_blockchain === 'BTC') {
    return settings.rpc.mainnet.btc.endpoint
  }
  return null
}

export { getReadOnlyProviderByBlockchain }
