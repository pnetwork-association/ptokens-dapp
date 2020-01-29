import {
  LOG_ITEM_ADDED,
  LOG_ITEM_ADDED_WITHOUT_DOUBLE_UP,
  LOG_ITEM_UPDATED,
  LOG_CLEARED,
  LOG_ITEMS_WAITING_CLEARED
} from '../../constants'

const addItem = item => {
  return dispatch => {
    dispatch({
      type: LOG_ITEM_ADDED,
      payload: item
    })
  }
}

const addWithoutDoubleUp = (_id, _item) => {
  return dispatch => {
    dispatch({
      type: LOG_ITEM_ADDED_WITHOUT_DOUBLE_UP,
      payload: {
        id: _id,
        item: _item
      }
    })
  }
}

const updateItem = (_id, _item) => {
  return dispatch => {
    dispatch({
      type: LOG_ITEM_UPDATED,
      payload: {
        id: _id,
        item: _item
      }
    })
  }
}

const clear = () => {
  return dispatch => {
    dispatch({
      type: LOG_CLEARED
    })
  }
}

const clearWaitingItem = () => {
  return dispatch => {
    dispatch({
      type: LOG_ITEMS_WAITING_CLEARED
    })
  }
}

export { addItem, addWithoutDoubleUp, updateItem, clear, clearWaitingItem }
