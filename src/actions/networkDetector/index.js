import {
  NETWORK_DETECTED_REDEEMER,
  RESET_DETECTED_NETWORK_REDEEMER
} from '../../constants'
import Web3 from 'web3'

const detectNetwork = (_provider, _pToken, _role) => {
  return async _dispatch => {
    if (!_provider) return

    if (_pToken.name === 'pETH') {
      const web3 = new Web3(_provider)
      _dispatch({
        type: NETWORK_DETECTED_REDEEMER,
        payload: {
          redeemerNetwork: await web3.eth.net.getNetworkType(),
          pToken: _pToken
        }
      })

      _dispatch({
        type: NETWORK_DETECTED_REDEEMER,
        payload: {
          redeemerNetwork: 'eos',
          pToken: _pToken
        }
      })
    }

    if (
      (_pToken.name === 'pBTC' || _pToken.name === 'pLTC') &&
      _pToken.redeemFrom === 'ETH' &&
      _role === 'redeemer'
    ) {
      const web3 = new Web3(_provider)
      _dispatch({
        type: NETWORK_DETECTED_REDEEMER,
        payload: {
          redeemerNetwork: await web3.eth.net.getNetworkType(),
          pToken: _pToken
        }
      })
    } else {
      _dispatch({
        type: NETWORK_DETECTED_REDEEMER,
        payload: {
          redeemerNetwork: 'eos',
          pToken: _pToken
        }
      })
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
