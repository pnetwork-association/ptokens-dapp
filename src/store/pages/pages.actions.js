import { PAGE_SELECTED, SET_LOADING } from '../../constants'
import history from '../../utils/history'

const selectPage = _page => () => {
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

export { selectPage, setLoading }
