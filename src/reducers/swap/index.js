import {
  SWAP_DATA_LOADED,
  SWAP_BALANCE_LOADED,
  SHOW_DEPOSIT_ADDRESS_MODAL,
  HIDE_DEPOSIT_ADDRESS_MODAL,
  PROGRESS_UPDATED,
  PROGRESS_RESET
} from '../../constants/index'

const initialState = {
  assets: [],
  depositAddressModal: {
    show: false,
    asset: null,
    value: null
  },
  progress: {
    show: false,
    percent: 0,
    message: null,
    steps: []
  }
}

const swapReducer = (_state = initialState, _action) => {
  const { type, payload } = _action
  if (type === SWAP_DATA_LOADED) {
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
  if (type === SHOW_DEPOSIT_ADDRESS_MODAL) {
    return Object.assign({}, _state, {
      depositAddressModal: payload.depositAddressModal
    })
  }
  if (type === PROGRESS_UPDATED) {
    return Object.assign({}, _state, {
      progress: payload.progress
    })
  }
  if (type === PROGRESS_RESET) {
    return Object.assign({}, _state, {
      progress: {
        show: false,
        percent: 0,
        message: null,
        steps: []
      }
    })
  }
  if (type === HIDE_DEPOSIT_ADDRESS_MODAL) {
    return Object.assign({}, _state, {
      depositAddressModal: {
        show: false,
        asset: null
      }
    })
  }
  return _state
}

export default swapReducer
