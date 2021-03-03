import { PAGE_SELECTED } from '../../constants'
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

export { selectPage }
