import settings from '../settings'
import Web3 from 'web3'
import { JsonRpc } from 'eosjs'
import fetch from 'node-fetch'

//type = issuer or redeemer
const getCorrespondingReadOnlyProvider = (_pToken, _type) => {
  if (_pToken.redeemFrom === 'ETH') {
    return new Web3.providers.WebsocketProvider(
      settings[_pToken.id].eth.wsInfuraEndpoint +
        settings[_pToken.id].eth.infuraProjectId
    )
  }
  if (_pToken.redeemFrom === 'EOS') {
    return new JsonRpc(settings[_pToken.id].eos.provableEndpoint, { fetch })
  }

  return null
}

export { getCorrespondingReadOnlyProvider }
