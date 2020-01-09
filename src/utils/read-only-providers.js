import settings from '../settings'
import Web3 from 'web3'
import { Api, JsonRpc } from 'eosjs'
import fetch from 'node-fetch'
import encoding from 'text-encoding'

const getCorrespondingReadOnlyProvider = (_pTokenName, _type) => {
  if (_type === 'ETH') {
    return new Web3(
      new Web3.providers.WebsocketProvider(
        settings[_pTokenName.toLowerCase()].eth.wsInfuraEndpoint + 
        settings[_pTokenName.toLowerCase()].eth.infuraProjectId
      )
    )
  }
  if (_type === 'EOS') {
    const rpc = new JsonRpc(settings.peos.eos.provableEndpoint, { fetch })
    const api = new Api({
      rpc,
      textDecoder: new encoding.TextDecoder(),
      textEncoder: new encoding.TextEncoder()
    })
    return api
  }
  
  return null
}

export {
  getCorrespondingReadOnlyProvider
}