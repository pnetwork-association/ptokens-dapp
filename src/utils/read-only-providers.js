import settings from '../settings'
import Web3 from 'web3'

//type = issuer or redeemer
const getCorrespondingReadOnlyProvider = (_pToken, _type) => {
  if (_pToken.redeemFrom === 'ETH') {
    return new Web3.providers.WebsocketProvider(
      settings[_pToken.id].eth.wsInfuraEndpoint +
        settings[_pToken.id].eth.infuraProjectId
    )
  }
  if (_pToken.name === 'EOS') {
    return null
  }

  return null
}

export { getCorrespondingReadOnlyProvider }
