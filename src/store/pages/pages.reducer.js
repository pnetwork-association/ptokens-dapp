import { PAGE_SELECTED, SET_LOADING } from '../../constants/index'

const initialState = {
  selectedPage: 'swap',
  loading: {
    isLoading: false,
    text: null
  }
}

const pagesReducer = (_state = initialState, _action) => {
  const { type, payload } = _action
  if (type === PAGE_SELECTED) {
    return Object.assign({}, _state, {
      selectedPage: payload.page
    })
  }
  if (type === SET_LOADING) {
    const { loading } = payload
    return Object.assign({}, _state, {
      loading
    })
  }
  return _state
}

export default pagesReducer
