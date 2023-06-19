import settings from '../settings'
import Web3 from 'web3'
import { JsonRpc } from 'eosjs'
import fetch from 'cross-fetch'
import { Algodv2 } from 'algosdk'
import { Blockchain, Network } from '../constants'

const getReadOnlyProviderByBlockchain = (_blockchain) => {
  // TODO: only mainnet at the moment
  if (_blockchain === Blockchain.Ethereum) {
    return new Web3.providers.HttpProvider(settings.rpc[Network.Mainnet][Blockchain.Ethereum].endpoint)
  }
  if (_blockchain === Blockchain.BSC) {
    return new Web3.providers.HttpProvider(settings.rpc[Network.Mainnet][Blockchain.BSC].endpoint)
  }
  if (_blockchain === Blockchain.Polygon) {
    return new Web3.providers.HttpProvider(settings.rpc[Network.Mainnet][Blockchain.Polygon].endpoint)
  }
  if (_blockchain === Blockchain.XDAI) {
    return new Web3.providers.HttpProvider(settings.rpc[Network.Mainnet][Blockchain.XDAI].endpoint)
  }
  if (_blockchain === Blockchain.EOS) {
    return new JsonRpc(settings.rpc[Network.Mainnet][Blockchain.EOS].endpoint, { fetch })
  }
  if (_blockchain === Blockchain.Telos) {
    return new JsonRpc(settings.rpc[Network.Mainnet][Blockchain.Telos].endpoint, { fetch })
  }
  if (_blockchain === Blockchain.Libre) {
    return new JsonRpc(settings.rpc[Network.Mainnet][Blockchain.Libre].endpoint, { fetch })
  }
  if (_blockchain === Blockchain.Ultra) {
    return new JsonRpc(settings.rpc[Network.Mainnet][Blockchain.Ultra].endpoint, { fetch })
  }
  if (_blockchain === Blockchain.Ore) {
    return new JsonRpc(settings.rpc[Network.Mainnet][Blockchain.Ore].endpoint, { fetch })
  }
  if (_blockchain === Blockchain.Arbitrum) {
    return new Web3.providers.HttpProvider(settings.rpc[Network.Mainnet][Blockchain.Arbitrum].endpoint)
  }
  if (_blockchain === Blockchain.Luxochain) {
    return new Web3.providers.HttpProvider(settings.rpc[Network.Mainnet][Blockchain.Luxochain].endpoint)
  }
  if (_blockchain === Blockchain.Algorand) {
    return new Algodv2(
      settings.rpc[Network.Mainnet][Blockchain.Algorand].token,
      settings.rpc[Network.Mainnet][Blockchain.Algorand].endpoint,
      settings.rpc[Network.Mainnet][Blockchain.Algorand].port
    )
  }
  if (_blockchain === Blockchain.Fantom) {
    return new Web3.providers.HttpProvider(settings.rpc[Network.Mainnet][Blockchain.Fantom].endpoint)
  }
  if (_blockchain === Blockchain.Bitcoin) {
    return settings.rpc[Network.Mainnet][Blockchain.Bitcoin].endpoint
  }
  return null
}

export { getReadOnlyProviderByBlockchain }
