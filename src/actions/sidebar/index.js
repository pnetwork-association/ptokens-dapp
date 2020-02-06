import {
  SET_SELECTED_PAGE,
  SET_SELECTED_PAGE_FROM_PATHNAME,
  SET_COLLAPSE_STATE
} from '../../constants/index'
import history from '../../utils/history'

const setSelectedPage = (_page, _pToken) => {
  switch (_page) {
    case 0: {
      history.push('/')
      break
    }
    case 1: {
      history.push(
        `/${_pToken.name.toLowerCase()}-on-${_pToken.redeemFrom.toLowerCase()}`
      )
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
    payload: _page
  }
}

const setSelectedPageFromPathname = (_pathname, _pToken) => {
  switch (_pathname) {
    case '/': {
      return {
        type: SET_SELECTED_PAGE_FROM_PATHNAME,
        payload: 0
      }
    }
    case '/peos-on-eth': {
      return {
        type: SET_SELECTED_PAGE_FROM_PATHNAME,
        payload: 1
      }
    }
    case '/pbtc-on-eth': {
      return {
        type: SET_SELECTED_PAGE_FROM_PATHNAME,
        payload: 1
      }
    }
    case '/pltc-on-eth': {
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
