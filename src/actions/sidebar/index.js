import {
  SET_SELECTED_PAGE,
  SET_COLLAPSE_STATE,
  ENABLE_TESTNET_INSTANCE
} from '../../constants/index'
import history from '../../utils/history'

const setSelectedPage = (_page, _pToken) => {
  switch (_page) {
    case 0: {
      history.push(
        `/${_pToken.name.toLowerCase()}-on-${_pToken.redeemFrom.toLowerCase()}${
          _pToken.network === 'testnet' ? '-testnet' : ''
        }`
      )
      break
    }
    case 1: {
      history.push(
        `/${_pToken.name.toLowerCase()}-on-${_pToken.redeemFrom.toLowerCase()}${
          _pToken.network === 'testnet' ? '-testnet' : ''
        }/issue-redeem`
      )
      break
    }
    case 2: {
      history.push(
        `/${_pToken.name.toLowerCase()}-on-${_pToken.redeemFrom.toLowerCase()}${
          _pToken.network === 'testnet' ? '-testnet' : ''
        }/pnetwork`
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

const enableTestnetInstances = () => {
  return {
    type: ENABLE_TESTNET_INSTANCE,
    payload: {}
  }
}

const setCollapseState = state => {
  return {
    type: SET_COLLAPSE_STATE,
    payload: state
  }
}

export { setSelectedPage, setCollapseState, enableTestnetInstances }
