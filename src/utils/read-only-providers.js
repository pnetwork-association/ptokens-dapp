import { Algodv2 } from 'algosdk'
import fetch from 'cross-fetch'
import { JsonRpc } from 'eosjs'
import { getWeb3Settings } from 'react-web3-settings'
import Web3 from 'web3'

const getReadOnlyProviderByBlockchain = (_blockchain) => {
  // TODO: only mainnet at the moment
  const settings = getWeb3Settings()

  if (_blockchain === 'ETH') {
    return new Web3.providers.HttpProvider(settings.eth.value)
  }
  if (_blockchain === 'SEPOLIA') {
    return new Web3.providers.HttpProvider(settings.rpc.testnet.sepolia.endpoint)
  }
  if (_blockchain === 'GOERLI') {
    return new Web3.providers.HttpProvider(settings.rpc.testnet.goerli.endpoint)
  }
  if (_blockchain === 'BSC') {
    return new Web3.providers.HttpProvider(settings.bsc.value)
  }
  if (_blockchain === 'POLYGON') {
    return new Web3.providers.HttpProvider(settings.polygon.value)
  }
  if (_blockchain === 'XDAI') {
    return new Web3.providers.HttpProvider(settings.xdai.value)
  }
  if (_blockchain === 'EOS') {
    return new JsonRpc(settings.eos.value, { fetch })
  }
  if (_blockchain === 'TELOS') {
    return new JsonRpc(settings.telos.value, { fetch })
  }
  if (_blockchain === 'LIBRE') {
    return new JsonRpc(settings.libre.value, { fetch })
  }
  if (_blockchain === 'ULTRA') {
    return new JsonRpc(settings.ultra.value, { fetch })
  }
  if (_blockchain === 'ORE') {
    return new JsonRpc(settings.ore.value, { fetch })
  }
  if (_blockchain === 'ARBITRUM') {
    return new Web3.providers.HttpProvider(settings.arbitrum.value)
  }
  if (_blockchain === 'LUXOCHAIN') {
    return new Web3.providers.HttpProvider(settings.luxochain.value)
  }
  if (_blockchain === 'ALGORAND') {
    return new Algodv2(
      settings.rpc.mainnet.algorand.token,
      settings.rpc.mainnet.algorand.endpoint,
      settings.rpc.mainnet.algorand.port
    )
  }
  if (_blockchain === 'FTM') {
    return new Web3.providers.HttpProvider(settings.ftm.value)
  }
  if (_blockchain === 'BTC') {
    return settings.btc.value
  }
  return null
}

export { getReadOnlyProviderByBlockchain }
