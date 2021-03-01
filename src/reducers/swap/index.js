import { SWAP_DATA_LOADED, SWAP_BALANCE_LOADED } from '../../constants/index'

const initialState = {
  assets: []
}

const swapReducer = (_state = initialState, _action) => {
  if (_action.type === SWAP_DATA_LOADED) {
    return Object.assign({}, _state, {
      assets: _action.payload.assets
    })
  }
  if (_action.type === SWAP_BALANCE_LOADED) {
    const { id, balance } = _action.payload
    return Object.assign({}, _state, {
      assets: _state.assets.map(_asset => (_asset.id === id ? { ..._asset, balance } : _asset))
    })
  }
  return _state
}

export default swapReducer
