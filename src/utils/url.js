import history from './history'
import { blockchainSymbolToName } from './maps'

const encodeForUrl = (_str) => encodeURIComponent(_str).toLowerCase()

const updateUrlForSwap = (_from, _to) =>
  history.replace(
    `swap?asset=${encodeForUrl(_from.nativeSymbol || _to.nativeSymbol)}&from=${encodeForUrl(
      blockchainSymbolToName[_from.blockchain]
    )}&to=${encodeForUrl(blockchainSymbolToName[_to.blockchain])}
    `
  )

export { updateUrlForSwap }
