import {
  NETWORK_DETECTED_REDEEMER
} from '../../constants'

const networks = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerly',
  42: 'kovan',
  'private': 'private'
}

const detectNetwork = (_provider, _ptokenName, _role) => {
  return async _dispatch => {
    if (
      (_ptokenName === 'pBTC' || _ptokenName === 'pEOS') && 
      _role === 'redeemer') 
    {
      if (_provider.isMetaMask) {
        const network = await _provider.networkVersion
        _dispatch({
          type: NETWORK_DETECTED_REDEEMER,
          payload: {
            network: networks[network]
          }
        })
      }
    }
  }
}

export {
  detectNetwork
}