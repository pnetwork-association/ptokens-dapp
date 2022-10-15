import history from './history'

const getUrlWithSearch = () => window.location.pathname + window.location.search

const encodeForUrl = _str => encodeURIComponent(_str).toLowerCase()

const updateUrlForSwap = (_from, _to) =>
  history.replace(
    `swap?asset=${encodeForUrl(_from.nativeSymbol || _to.nativeSymbol)}&from=${encodeForUrl(
      _from.blockchain
    )}&to=${encodeForUrl(_to.blockchain)}${
      _from.blockchain === 'ALGORAND' ? '&algorand_from_assetid=' + _from.address : ''
    }${_to.blockchain === 'ALGORAND' ? '&algorand_to_assetid=' + _to.address : ''}`
  )

export { getUrlWithSearch, updateUrlForSwap }
