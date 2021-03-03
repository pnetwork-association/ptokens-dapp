import { PAGE_SELECTED } from '../../constants/index'

const initialState = {
  selectedPage: 'swap'
}

const pagesReducer = (_state = initialState, _action) => {
  if (_action.type === PAGE_SELECTED) {
    return Object.assign({}, _state, {
      selectedPage: _action.payload.page
    })
  }
  return _state
}

export default pagesReducer
