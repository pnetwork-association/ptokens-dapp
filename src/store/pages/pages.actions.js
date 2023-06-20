import * as pages from './pages.reducer'
import history from '../../utils/history'

const selectPage = (_page, _options = {}) => {
  const { pToken, asset, from, to, algorand_from_assetid, algorand_to_assetid, host_symbol } = _options
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
      }${algorand_to_assetid ? `&algorand_to_assetid=${algorand_to_assetid}` : ''}${
        host_symbol ? `&host_symbol=${host_symbol}` : ''
      }`
    )
  }

  return pages.selectPage(_page)
}

const setLoading = ({ isLoading, text }) =>
  pages.setLoading({
    isLoading,
    text,
  })

const updateInfoModal = ({ show, text, showMoreText, showMoreLabel, icon }) =>
  pages.updateInfoModal({
    show,
    text,
    icon,
    showMoreText,
    showMoreLabel,
  })

const setTheme = (_theme) => {
  window.localStorage.setItem('THEME', _theme)
  return pages.setTheme(_theme)
}

export { selectPage, setLoading, setTheme, updateInfoModal }
