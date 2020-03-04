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
  private: 'private'
}

const detectNetwork = (_provider, _pToken, _role) => {
  return async _dispatch => {
    if (!_provider) return

    if (
      (_pToken.name === 'pBTC' || _pToken.name === 'pEOS') &&
      _role === 'redeemer'
    ) {
      if (_provider.isMetaMask) {
        const network = await _provider.networkVersion
        _dispatch({
          type: NETWORK_DETECTED_REDEEMER,
          payload: {
            redeemerNetwork: networks[network],
            pToken: _pToken
          }
        })
        return
      }

      //wallet connect
      if (_provider.chainId) {
        _dispatch({
          type: NETWORK_DETECTED_REDEEMER,
          payload: {
            redeemerNetwork: networks[_provider.chainId],
            pToken: _pToken
          }
        })
        return
      }

      //portis
      if (_provider.isPortis) {
        _dispatch({
          type: NETWORK_DETECTED_REDEEMER,
          payload: {
            redeemerNetwork: networks[_provider._portis.config.network.chainId],
            pToken: _pToken
          }
        })
        return
      }
    }
  }
}

const resetDetectedNetwork = _role => {
  return {
    type:
      _role === 'redeemer'
        ? RESET_DETECTED_NETWORK_REDEEMER
        : RESET_DETECTED_NETWORK_REDEEMER //TODO: RESET_DETECTED_NETWORK_ISSUER
  }
}

export { detectNetwork, resetDetectedNetwork }
