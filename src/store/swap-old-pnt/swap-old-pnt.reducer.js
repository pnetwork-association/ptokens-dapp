import { ASSETS_LOADED_SWAP_OLD_PNT, SWAP_BALANCE_LOADED } from '../../constants/index'

const initialState = {
  assets: []
}

const swapOldPntReducer = (_state = initialState, _action) => {
  const { type, payload } = _action
  if (type === ASSETS_LOADED_SWAP_OLD_PNT) {
    return Object.assign({}, _state, {
      assets: payload.assets
    })
  }
  if (type === SWAP_BALANCE_LOADED) {
    const { id, balance } = payload
    return Object.assign({}, _state, {
      assets: _state.assets.map(_asset => (_asset.id === id ? { ..._asset, balance } : _asset))
    })
  }
  return _state
}

export default swapOldPntReducer
