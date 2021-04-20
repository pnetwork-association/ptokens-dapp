import history from './history'

const getUrlWithSearch = () => window.location.pathname + window.location.search

const updateUrlForSwap = (_from, _to) =>
  history.replace(
    `swap?asset=${_from.nativeSymbol.toLowerCase() ||
      _to.nativeSymbol.toLowerCase()}&from=${_from.blockchain.toLowerCase()}&to=${_to.blockchain.toLowerCase()}`
  )

export { getUrlWithSearch, updateUrlForSwap }
