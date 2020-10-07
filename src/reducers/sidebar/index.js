import {
  SET_SELECTED_PAGE,
  SET_COLLAPSE_STATE,
  ENABLE_TESTNET_INSTANCE
} from '../../constants/index'

const initialState = {
  selected: 0,
  isCollapseOpened: false,
  withTestnetInstances: false
}

const sidebarReducer = (_state = initialState, _action) => {
  if (_action.type === SET_SELECTED_PAGE) {
    return Object.assign({}, _state, {
      selected: _action.payload
    })
  }
  if (_action.type === SET_COLLAPSE_STATE) {
    return Object.assign({}, _state, {
      isCollapseOpened: _action.payload
    })
  }

  if (_action.type === ENABLE_TESTNET_INSTANCE) {
    return Object.assign({}, _state, {
      withTestnetInstances: true
    })
  }
  return _state
}

export default sidebarReducer
