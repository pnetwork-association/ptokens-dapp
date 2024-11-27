import history from './history'

const encodeForUrl = (_str) => encodeURIComponent(_str).toLowerCase()

const updateUrlForSwap = (_from, _to) =>
  history.replace(
    `swap?asset=${encodeForUrl(_from.nativeSymbol || _to.nativeSymbol)}&from=${encodeForUrl(
      _from.blockchain
    )}&to=${encodeForUrl(_to.blockchain)}${
      _from.blockchain === 'ALGORAND' ? '&algorand_from_assetid=' + _from.address : ''
    }${_to.blockchain === 'ALGORAND' ? '&algorand_to_assetid=' + _to.address : ''}${
      _from.requiresCurve ? '&host_symbol=' + _from.symbol.toLowerCase() : ''
    }
    `
  )

export { updateUrlForSwap }
