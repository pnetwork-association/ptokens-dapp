import {
  ASSETS_LOADED,
  SWAP_BALANCE_LOADED,
  SHOW_DEPOSIT_ADDRESS_MODAL,
  HIDE_DEPOSIT_ADDRESS_MODAL,
  PROGRESS_UPDATED,
  PROGRESS_RESET,
  UPDATE_SWAP_BUTTON,
  BPM_LOADED
} from '../../constants/index'

const initialState = {
  assets: [],
  bpm: {},
  depositAddressModal: {
    show: false,
    asset: null,
    value: null
  },
  progress: {
    show: false,
    percent: 0,
    message: null,
    steps: [],
    terminated: false
  },
  swapButton: {
    disabled: false,
    text: ''
  },
  defaultSelection: {
    from: null,
    to: null
  }
}

const swapReducer = (_state = initialState, _action) => {
  const { type, payload } = _action
  if (type === ASSETS_LOADED) {
    return Object.assign({}, _state, {
      assets: payload.assets
    })
  }
  if (type === BPM_LOADED) {
    return Object.assign({}, _state, {
      bpm: payload.bpm
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
        steps: [],
        terminated: false
      }
    })
  }
  if (type === HIDE_DEPOSIT_ADDRESS_MODAL) {
    return Object.assign({}, _state, {
      depositAddressModal: {
        show: false,
        asset: null,
        value: null
      }
    })
  }
  if (type === UPDATE_SWAP_BUTTON) {
    return Object.assign({}, _state, {
      swapButton: payload.swapButton
    })
  }
  return _state
}

export default swapReducer
