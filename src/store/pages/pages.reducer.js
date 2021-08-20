import { PAGE_SELECTED, SET_LOADING, SET_THEME, UPDATE_INFO_MODAL } from '../../constants/index'

const initialState = {
  selectedPage: 'swap',
  loading: {
    isLoading: false,
    text: null
  },
  theme: 'light',
  infoModal: {
    show: false,
    text: null,
    showMoreText: null
  }
}

const pagesReducer = (_state = initialState, _action) => {
  const { type, payload } = _action
  if (type === PAGE_SELECTED) {
    return Object.assign({}, _state, {
      selectedPage: payload.page
    })
  }
  if (type === SET_THEME) {
    return Object.assign({}, _state, {
      theme: payload.theme
    })
  }
  if (type === UPDATE_INFO_MODAL) {
    const { infoModal } = payload
    return Object.assign({}, _state, {
      infoModal
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
