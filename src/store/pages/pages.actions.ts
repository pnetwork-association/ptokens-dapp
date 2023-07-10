import history from '../../utils/history'

import * as pages from './pages.reducer'

const selectPage = (_page: string, _options: { asset?: string; from?: string; to?: string } = {}) => {
  const { asset, from, to } = _options
  history.push(_page)

  // NOTE: v2 dapp new style
  if (_page === 'swap' && asset && from && to) {
    history.replace(`swap?asset=${asset}&from=${from}&to=${to}`)
  }

  return pages.selectPage(_page)
}

const setLoading = ({ isLoading, text }: { isLoading: boolean; text: string }) =>
  pages.setLoading({
    isLoading,
    text,
  })

const updateInfoModal = pages.updateInfoModal

const setTheme = (_theme: string) => {
  window.localStorage.setItem('THEME', _theme)
  return pages.setTheme(_theme)
}

export { selectPage, setLoading, setTheme, updateInfoModal }
