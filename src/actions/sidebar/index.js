import {
  SET_SELECTED_PAGE,
  SET_SELECTED_PAGE_FROM_PATHNAME,
  SET_COLLAPSE_STATE
} from '../../constants/index'
import history from '../../utils/history'

const setSelectedPage = (_page, _pToken) => {
  switch (_page) {
    case 0: {
      history.push(
        `/${_pToken.name.toLowerCase()}-on-${_pToken.redeemFrom.toLowerCase()}`
      )
      break
    }
    case 1: {
      history.push(
        `/${_pToken.name.toLowerCase()}-on-${_pToken.redeemFrom.toLowerCase()}/issue-redeem`
      )
      break
    }
    case 2: {
      history.push(
        `/${_pToken.name.toLowerCase()}-on-${_pToken.redeemFrom.toLowerCase()}/enclave`
      )
      break
    }
    case 3: {
      history.push(
        `/${_pToken.name.toLowerCase()}-on-${_pToken.redeemFrom.toLowerCase()}/settings`
      )
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
  if (
    _matchExact(
      /[a-z:/]*[peos\-on\-eth|pbtc\-on\-eth|pbtc\-on\-eth]\/issue-redeem[/]?/g,
      _pathname
    )
  ) {
    return {
      type: SET_SELECTED_PAGE_FROM_PATHNAME,
      payload: 1
    }
  }

  if (
    _matchExact(
      /[a-z:/]*[peos\-on\-eth|pbtc\-on\-eth|pbtc\-on\-eth]\/enclave[/]?/g,
      _pathname
    )
  ) {
    return {
      type: SET_SELECTED_PAGE_FROM_PATHNAME,
      payload: 2
    }
  }

  if (
    _matchExact(
      /[a-z:/]*[peos\-on\-eth|pbtc\-on\-eth|pbtc\-on\-eth]\/settings[/]?/g,
      _pathname
    )
  ) {
    return {
      type: SET_SELECTED_PAGE_FROM_PATHNAME,
      payload: 3
    }
  }

  return {
    type: SET_SELECTED_PAGE_FROM_PATHNAME,
    payload: 0
  }
}

const setCollapseState = state => {
  return {
    type: SET_COLLAPSE_STATE,
    payload: state
  }
}

const _matchExact = (r, str) => {
  const match = str.match(r)
  return match && str === match[0]
}

export { setSelectedPage, setSelectedPageFromPathname, setCollapseState }
