import { Algodv2 } from 'algosdk'
import fetch from 'cross-fetch'
import { JsonRpc } from 'eosjs'
import { getWeb3Settings } from 'react-web3-settings'
import Web3 from 'web3'

import settings from '../settings'

const getReadOnlyProviderByBlockchain = (_blockchain) => {
  // TODO: only mainnet at the moment
  const configs = getWeb3Settings()

  if (_blockchain === 'ETH') {
    return new Web3.providers.HttpProvider(configs.eth)
  }
  if (_blockchain === 'BSC') {
    return new Web3.providers.HttpProvider(configs.bsc)
  }
  if (_blockchain === 'POLYGON') {
    return new Web3.providers.HttpProvider(configs.polygon)
  }
  if (_blockchain === 'GNOSIS') {
    return new Web3.providers.HttpProvider(configs.gnosis)
  }
  if (_blockchain === 'EOS') {
    return new JsonRpc(configs.eos, { fetch })
  }
  if (_blockchain === 'TELOS') {
    return new JsonRpc(configs.telos, { fetch })
  }
  if (_blockchain === 'LIBRE') {
    return new JsonRpc(configs.libre, { fetch })
  }
  if (_blockchain === 'ULTRA') {
    return new JsonRpc(configs.ultra, { fetch })
  }
  if (_blockchain === 'ARBITRUM') {
    return new Web3.providers.HttpProvider(configs.arbitrum)
  }
  if (_blockchain === 'LUXOCHAIN') {
    return new Web3.providers.HttpProvider(configs.luxochain)
  }
  if (_blockchain === 'ALGORAND') {
    return new Algodv2('', configs.algorand, settings.rpc.mainnet.algorand.port) // use public node until pNetwork node is restored
  }
  if (_blockchain === 'FTM') {
    return new Web3.providers.HttpProvider(configs.ftm)
  }
  if (_blockchain === 'BTC') {
    return configs.btc
  }
  return null
}

export { getReadOnlyProviderByBlockchain }
