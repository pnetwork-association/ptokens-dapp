import { NETWORK_DETECTED_REDEEMER } from '../../constants/index'

const initialState = {
  redeemerNetwork: null
}

const networkDetectorReducer = (_state = initialState, _action) => {
  if (_action.type === NETWORK_DETECTED_REDEEMER) {
    return Object.assign({}, _state, {
      redeemerNetwork: _action.payload.network
    })
  }

  return _state
}

export default networkDetectorReducer
