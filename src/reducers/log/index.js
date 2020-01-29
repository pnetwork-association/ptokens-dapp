import {
  LOG_ITEM_ADDED,
  LOG_ITEM_ADDED_WITHOUT_DOUBLE_UP,
  LOG_ITEM_UPDATED,
  LOG_CLEARED,
  LOG_ITEMS_WAITING_CLEARED
} from '../../constants/index'

const initialState = {
  logs: []
}

const logReducer = (_state = initialState, _action) => {
  if (_action.type === LOG_ITEM_ADDED) {
    return Object.assign({}, _state, {
      logs: [..._state.logs, _action.payload]
    })
  }

  if (_action.type === LOG_ITEM_ADDED_WITHOUT_DOUBLE_UP) {
    const exists = _state.logs.filter(log => log.id === _action.payload.id)
    if (exists.length === 0) {
      return Object.assign({}, _state, {
        logs: [..._state.logs, _action.payload.item]
      })
    }
  }

  if (_action.type === LOG_ITEM_UPDATED) {
    const exists = _state.logs.filter(log => log.id === _action.payload.id)
    if (exists.length === 0) {
      return Object.assign({}, _state, {
        logs: [..._state.logs, _action.payload.item]
      })
    }

    const logs = _state.logs.map(log => {
      if (log.id === _action.payload.id) {
        return _action.payload.item
      } else return log
    })
    return Object.assign({}, _state, {
      logs
    })
  }

  if (_action.type === LOG_CLEARED) {
    return Object.assign({}, _state, {
      logs: []
    })
  }

  if (_action.type === LOG_ITEMS_WAITING_CLEARED) {
    const logs = _state.logs.filter(log => !log.waiting)
    return Object.assign({}, _state, {
      logs
    })
  }

  return _state
}

export default logReducer
