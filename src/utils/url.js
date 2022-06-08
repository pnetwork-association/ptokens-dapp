import history from './history'

const getUrlWithSearch = () => window.location.pathname + window.location.search

const updateUrlForSwap = (_from, _to) =>
  history.replace(
    `swap?asset=${_from.nativeSymbol.toLowerCase() ||
      _to.nativeSymbol.toLowerCase()}&from=${_from.blockchain.toLowerCase()}&to=${_to.blockchain.toLowerCase()}${
      _from.blockchain === 'ALGORAND' ? '&algorand_from_assetid=' + _from.address : ''
    }${_to.blockchain === 'ALGORAND' ? '&algorand_to_assetid=' + _to.address : ''}`
  )

export { getUrlWithSearch, updateUrlForSwap }
