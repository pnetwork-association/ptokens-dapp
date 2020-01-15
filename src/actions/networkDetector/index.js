import {
  NETWORK_DETECTED_REDEEMER,
  RESET_DETECTED_NETWORK_REDEEMER
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
      console.log(_provider)
      if (_provider.isMetaMask) {
        const network = await _provider.networkVersion
        _dispatch({
          type: NETWORK_DETECTED_REDEEMER,
          payload: {
            network: networks[network]
          }
        })
        return
      }

      //wallet connect
      if (_provider.chainId) {
        _dispatch({
          type: NETWORK_DETECTED_REDEEMER,
          payload: {
            network: networks[_provider.chainId]
          }
        })
        return
      }

      //portis
      if (_provider.isPortis) {
        _dispatch({
          type: NETWORK_DETECTED_REDEEMER,
          payload: {
            network: networks[_provider._portis.config.network.chainId]
          }
        })
        return
      }
    }
  }
}

const resetDetectedNetwork = _role => {
  return {
    type: _role === 'redeemer' ? RESET_DETECTED_NETWORK_REDEEMER : RESET_DETECTED_NETWORK_REDEEMER //TODO: RESET_DETECTED_NETWORK_ISSUER
  }
}

export {
  detectNetwork,
  resetDetectedNetwork
}