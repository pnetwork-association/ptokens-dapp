import {
  SWAP_DATA_LOADED,
  SWAP_BALANCE_LOADED,
  SHOW_DEPOSIT_ADDRESS_MODAL,
  HIDE_DEPOSIT_ADDRESS_MODAL
} from '../../constants/index'

const initialState = {
  assets: [],
  depositAddressModal: {
    show: false,
    asset: null
  }
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
  if (_action.type === SHOW_DEPOSIT_ADDRESS_MODAL) {
    return Object.assign({}, _state, {
      depositAddressModal: _action.payload.depositAddressModal
    })
  }
  if (_action.type === HIDE_DEPOSIT_ADDRESS_MODAL) {
    return Object.assign({}, _state, {
      depositAddressModal: null
    })
  }
  return _state
}

export default swapReducer
