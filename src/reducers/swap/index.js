import { SWAP_DATA_LOADED } from '../../constants/index'

const initialState = {
  assets: []
}

const swapReducer = (_state = initialState, _action) => {
  if (_action.type === SWAP_DATA_LOADED) {
    return Object.assign({}, _state, {
      assets: _action.payload.assets
    })
  }
  return _state
}

export default swapReducer
