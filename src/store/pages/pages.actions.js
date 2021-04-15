import { PAGE_SELECTED, SET_LOADING, SET_THEME, UPDATE_INFO_MODAL } from '../../constants'
import history from '../../utils/history'

const selectPage = _page => {
  history.push(_page)
  return {
    type: PAGE_SELECTED,
    payload: {
      page: _page
    }
  }
}

const setLoading = ({ isLoading, text }) => ({
  type: SET_LOADING,
  payload: {
    loading: {
      isLoading,
      text
    }
  }
})

const updateInfoModal = ({ show, text, icon }) => ({
  type: UPDATE_INFO_MODAL,
  payload: {
    infoModal: {
      show,
      text,
      icon
    }
  }
})

const setTheme = _theme => {
  window.localStorage.setItem('THEME', _theme)
  return {
    type: SET_THEME,
    payload: {
      theme: _theme
    }
  }
}

export { selectPage, setLoading, setTheme, updateInfoModal }
