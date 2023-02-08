import { PNT_ON_ETH_MAINNET, ETHPNT_ON_ETH_MAINNET, PBTC_ON_ETH_MAINNET_V1_MIGRATION } from '../constants'
import BigNumber from 'bignumber.js'

const map = {
  pegin: 0.1,
  pegout: 0.25
}

const getFeeFactor = fee => {
  return 1 - fee / 100
}

const getFee = (_from, _to) => {
  if (_from.id === ETHPNT_ON_ETH_MAINNET && _to.id === PNT_ON_ETH_MAINNET) return map.pegout
  else if (_from.id === PBTC_ON_ETH_MAINNET_V1_MIGRATION) return 0
  else if (_from.isNative) return map.pegin
  else if (!_from.isNative && !_to.isNative) return map.pegin
  else return map.pegout
}

const computeAmount = (from, to, amount, direction) => {
  const feeCoeff = getFeeFactor(getFee(from, to))
  return amount !== ''
    ? BigNumber(amount)
        .multipliedBy(direction === 'to' ? feeCoeff : 1 / feeCoeff)
        .toFixed()
    : amount
}

const getFormattedFee = fee => {
  return `${fee.toString().replace('.', ',')}%`
}

export { getFee, getFeeFactor, computeAmount, getFormattedFee }
