import settings from '../settings'
import Web3 from 'web3'

const getCorrespondingReadOnlyProvider = (
  _pTokenName,
  _type,
  _network
) => {
  if (_type === 'ETH') {
    return new Web3.providers.WebsocketProvider(
      settings[_pTokenName.toLowerCase()][_network].eth
        .wsInfuraEndpoint + settings[_pTokenName.toLowerCase()].infuraProjectId
    )
  }
  if (_type === 'EOS') {
    return null
  }

  return null
}

export { getCorrespondingReadOnlyProvider }
