import history from './history'
import { Blockchain } from '../constants'

const LEGACY_DAPP_BASE_URL = 'http://dapp-legacy.ptokens.io/'

const encodeForUrl = (_str) => encodeURIComponent(_str).toLowerCase()

const updateUrlForSwap = (_from, _to) =>
  history.replace(
    `swap?asset=${encodeForUrl(_from.nativeSymbol || _to.nativeSymbol)}&from=${encodeForUrl(
      _from.blockchain
    )}&to=${encodeForUrl(_to.blockchain)}${
      _from.blockchain === Blockchain.Algorand ? '&algorand_from_assetid=' + _from.address : ''
    }${_to.blockchain === Blockchain.Algorand ? '&algorand_to_assetid=' + _to.address : ''}${
      _from.requiresCurve ? '&host_symbol=' + _from.symbol.toLowerCase() : ''
    }
    `
  )

const getLegacyUrl = (_from, _to) =>
  LEGACY_DAPP_BASE_URL +
  `swap?asset=${encodeForUrl(_from.nativeSymbol)}&from=${encodeForUrl(_from.blockchain)}&to=${encodeForUrl(
    _to.blockchain
  )}`

export { getLegacyUrl, updateUrlForSwap }
