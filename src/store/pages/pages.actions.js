import { PAGE_SELECTED, SET_LOADING, SET_THEME, UPDATE_INFO_MODAL } from '../../constants'
import history from '../../utils/history'

const selectPage = (_page, _options = {}) => {
  const { pToken, asset, from, to, algorand_from_assetid, algorand_to_assetid } = _options
  if (history.location.pathname.includes('migration')) {
    history.replace('')
  }

  history.push(_page)

  // NOTE: v2 dapp old style
  if (_page === 'swap' && pToken) {
    history.replace(`swap?pToken=${pToken}`)
  }

  // NOTE: v2 dapp new style
  if (_page === 'swap' && asset && from && to) {
    history.replace(
      `swap?asset=${asset}&from=${from}&to=${to}${
        algorand_from_assetid ? `&algorand_from_assetid=${algorand_from_assetid}` : ''
      }${algorand_to_assetid ? `&algorand_to_assetid=${algorand_to_assetid}` : ''}`
    )
  }

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

const updateInfoModal = ({ show, text, showMoreText, showMoreLabel, icon }) => ({
  type: UPDATE_INFO_MODAL,
  payload: {
    infoModal: {
      show,
      text,
      icon,
      showMoreText,
      showMoreLabel
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
