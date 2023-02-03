import { PNT_ON_ETH_MAINNET, ETHPNT_ON_ETH_MAINNET } from '../constants'

const map = {
  pegin: 0.1,
  pegout: 0.25
}

const getFee = (_from, _to) => {
  if (_from.id === ETHPNT_ON_ETH_MAINNET && _to.id === PNT_ON_ETH_MAINNET) return map.pegout
  else if (_from.isNative) return map.pegin
  else if (!_from.isNative && !_to.isNative) return map.pegin
  else return map.pegout
}

export { getFee }
