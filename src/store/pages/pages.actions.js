import { PAGE_SELECTED, SET_LOADING, SET_THEME } from '../../constants'
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

const setTheme = _theme => ({
  type: SET_THEME,
  payload: {
    theme: _theme
  }
})

export { selectPage, setLoading, setTheme }
