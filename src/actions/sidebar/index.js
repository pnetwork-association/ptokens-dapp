import {
  SET_SELECTED_PAGE,
  SET_SELECTED_PAGE_FROM_PATHNAME,
  SET_COLLAPSE_STATE
} from '../../constants/index'
import history from '../../utils/history'

const setSelectedPage = page => {
  switch (page) {
    case 0: {
      history.push('/')
      break
    }
    case 1: {
      history.push('/token')
      break
    }
    case 2: {
      history.push('/enclave')
      break
    }
    case 3: {
      history.push('/settings')
      break
    }
    default:
      break
  }

  return {
    type: SET_SELECTED_PAGE,
    payload: page
  }
}

const setSelectedPageFromPathname = pathname => {
  switch (pathname) {
    case '/': {
      return {
        type: SET_SELECTED_PAGE_FROM_PATHNAME,
        payload: 0
      }
    }
    case '/token': {
      return {
        type: SET_SELECTED_PAGE_FROM_PATHNAME,
        payload: 1
      }
    }
    case '/enclave': {
      return {
        type: SET_SELECTED_PAGE_FROM_PATHNAME,
        payload: 2
      }
    }
    case '/settings': {
      return {
        type: SET_SELECTED_PAGE_FROM_PATHNAME,
        payload: 3
      }
    }
    default:
      break
  }
}

const setCollapseState = state => {
  return {
    type: SET_COLLAPSE_STATE,
    payload: state
  }
}

export { setSelectedPage, setSelectedPageFromPathname, setCollapseState }
