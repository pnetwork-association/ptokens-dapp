import settings from '../settings'
import Web3 from 'web3'

const getCorrespondingReadOnlyProvider = (_pTokenName, _type) => {
  if (_type === 'ETH') {
    return new Web3.providers.WebsocketProvider(
      settings[_pTokenName.toLowerCase()].eth.wsInfuraEndpoint +
        settings[_pTokenName.toLowerCase()].eth.infuraProjectId
    )
  }
  if (_type === 'EOS') {
    return null
  }

  return null
}

export { getCorrespondingReadOnlyProvider }
