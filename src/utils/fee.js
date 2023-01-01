import { GALA_ON_BSC_MAINNET } from '../constants'

const map = {
  pegin: 0.1,
  pegout: 0.25
}

const getFee = (_from, _to) => {
  switch (_from.id) {
    case GALA_ON_BSC_MAINNET: {
      return 0
    }
  }
  switch (_to.id) {
    case GALA_ON_BSC_MAINNET: {
      return 0
    }
  }
  if (_from.isNative) return map.pegin
  else if (!_from.isNative && !_to.isNative) return map.pegin
  else return map.pegout
}

export { getFee }
