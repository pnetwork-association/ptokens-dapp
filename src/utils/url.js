import history from './history'

const encodeForUrl = (_str) => encodeURIComponent(_str).toLowerCase()

const updateUrlForSwap = (_from, _to) =>
  history.replace(
    `swap?asset=${encodeForUrl(_from.nativeSymbol || _to.nativeSymbol)}&from=${encodeForUrl(
      _from.blockchain
    )}&to=${encodeForUrl(_to.blockchain)}
    `
  )

export { updateUrlForSwap }
