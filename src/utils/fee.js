import BigNumber from 'bignumber.js'
import { formatDecimalSeparator } from './amount-utils'
import { createAsset } from './ptokens'
import { PNT_ON_ETH_MAINNET, ETHPNT_ON_ETH_MAINNET, PBTC_ON_ETH_MAINNET_V1_MIGRATION } from '../constants'
import _ from 'lodash'

const getFeeFactor = (fee) => (_.isNil(fee) ? null : 1 - fee / 100)

const getBasisPoints = (_fromAsset, _toAsset) => {
  if (_fromAsset.assetInfo.isNative && _toAsset.assetInfo.isNative)
    return _fromAsset.assetInfo.fees.basisPoints.nativeToNative
  else if (_fromAsset.assetInfo.isNative && !_toAsset.assetInfo.isNative)
    return _fromAsset.assetInfo.fees.basisPoints.nativeToHost
  else if (!_fromAsset.assetInfo.isNative && _toAsset.assetInfo.isNative)
    return _fromAsset.assetInfo.fees.basisPoints.hostToNative
  else if (!_fromAsset.assetInfo.isNative && !_toAsset.assetInfo.isNative)
    return _fromAsset.assetInfo.fees.basisPoints.hostToHost
}

const getMigrationFees = (_from, _to) => {
  if (_from.id === ETHPNT_ON_ETH_MAINNET && _to.id === PNT_ON_ETH_MAINNET) return 0.25
  else if (_from.id === PBTC_ON_ETH_MAINNET_V1_MIGRATION) return 0
  else return null
}

const getSwapFees = async (_from, _to) => {
  try {
    const fromAsset = await createAsset(_from)
    const toAsset = await createAsset(_to)
    const basisPoints = getBasisPoints(fromAsset, toAsset)
    const networkFee = toAsset.assetInfo.fees.networkFee
    const minProtocolFee = fromAsset.assetInfo.fees.minNodeOperatorFee
    return { basisPoints, networkFee, minProtocolFee }
  } catch (_err) {
    return { basisPoints: undefined, networkFee: undefined, minProtocolFee: undefined }
  }
}

const computeNetworkFee = (fees) => {
  if (!fees || _.isNil(fees.networkFee)) return null
  return BigNumber(fees.networkFee).dividedBy(1e18)
}
const computeProtocolFee = (fees, amount) =>
  BigNumber.maximum(
    BigNumber(fees.minProtocolFee).dividedBy(1e18),
    BigNumber(amount).multipliedBy(fees.basisPoints).dividedBy(10000)
  )

const computeFeesAmount = (fees, amount) => {
  if (
    !fees ||
    _.isNil(fees.basisPoints) ||
    _.isNil(fees.minProtocolFee) ||
    _.isNil(fees.networkFee) ||
    _.isNil(amount) ||
    amount === ''
  )
    return null
  return computeProtocolFee(fees, amount).plus(computeNetworkFee(fees))
}
const computeToAmount = (fees, amount) => BigNumber(amount).minus(computeFeesAmount(fees, amount)).toFixed()

const computeFromAmount = (fees, amount) => {
  const maybeAmount = BigNumber(amount)
    .plus(BigNumber(fees.networkFee).dividedBy(1e18))
    .dividedBy(BigNumber(1).minus(BigNumber(fees.basisPoints).dividedBy(10000)))
  return maybeAmount
    .multipliedBy(fees.basisPoints)
    .dividedBy(10000)
    .isGreaterThan(BigNumber(fees.minProtocolFee).dividedBy(1e18))
    ? maybeAmount.toFixed()
    : BigNumber(amount)
        .plus(BigNumber(fees.networkFee).dividedBy(1e18))
        .plus(BigNumber(fees.minProtocolFee).dividedBy(1e18))
        .toFixed()
}

const computeMigrationAmount = (from, to, amount, direction) => {
  const feeCoeff = getFeeFactor(getMigrationFees(from, to))
  if (_.isNil(feeCoeff)) return null
  return amount !== ''
    ? BigNumber(amount)
        .multipliedBy(direction === 'to' ? feeCoeff : 1 / feeCoeff)
        .toFixed()
    : amount
}

const computeSwapAmount = (fees, amount, direction) => {
  if (!fees || _.isNil(fees.basisPoints) || _.isNil(fees.minProtocolFee) || _.isNil(fees.networkFee)) return null
  return amount !== '' ? (direction === 'to' ? computeToAmount(fees, amount) : computeFromAmount(fees, amount)) : amount
}

const getFixedOrPrecision = (_n) => (BigNumber(_n).e >= 3 ? _n.toFixed(1) : _n.toPrecision(3))

const getFormattedAmount = (_amount, _tilde = false) => {
  const requiresTilde = _tilde && !_amount.eq(getFixedOrPrecision(_amount))
  return `${requiresTilde ? '~' : ''}${formatDecimalSeparator(getFixedOrPrecision(_amount))}`
}

const getNetworkFeeDescription = (fees, symbol) => {
  if (!fees || _.isNil(fees.networkFee) || _.isNil(symbol)) return ''
  return `${getFormattedAmount(BigNumber(fees.networkFee).dividedBy(1e18))} ${symbol}`
}

const getFormattedNetworkFee = getNetworkFeeDescription

const getProtocolFeeDescription = (fees, symbol) => {
  if (!fees) return ''
  return (
    `${formatDecimalSeparator(fees.basisPoints / 100)} %` +
    (fees.minProtocolFee > 0
      ? ` (min ${formatDecimalSeparator(
          getFixedOrPrecision(BigNumber(fees.minProtocolFee).dividedBy(1e18))
        )} ${symbol})`
      : '')
  )
}

const getFormattedProtocolFee = (fees, amount, symbol) => {
  if (!fees || _.isNil(fees.basisPoints) || _.isNil(fees.minProtocolFee) || _.isNil(fees.networkFee) || _.isNil(symbol))
    return ''
  if (_.isNil(amount) || amount === '') return getProtocolFeeDescription(fees, symbol)
  const protocolFee = computeProtocolFee(fees, amount)
  return protocolFee.isGreaterThan(BigNumber(fees.minProtocolFee).dividedBy(1e18))
    ? `${getFormattedAmount(protocolFee, true)} ${symbol} (=${BigNumber(fees.basisPoints).dividedBy(100)}%)`
    : `${getFormattedAmount(protocolFee, false)} ${symbol}`
}

const getFeesDescription = (fees, symbol) =>
  getProtocolFeeDescription(fees, symbol) + (fees.networkFee > 0 ? ` + ${getNetworkFeeDescription(fees, symbol)}` : '')

const getFormattedFees = (fees, amount, symbol) => {
  if (
    !fees ||
    _.isNil(fees.basisPoints) ||
    _.isNil(fees.minProtocolFee) ||
    _.isNil(fees.networkFee) ||
    _.isNil(symbol)
  ) {
    return ''
  }
  if (_.isNil(amount) || amount === '') return getFeesDescription(fees, symbol)
  const feesAmount = computeFeesAmount(fees, amount)
  return `${getFormattedAmount(feesAmount, true)} ${symbol}`
}

export {
  getMigrationFees,
  getSwapFees,
  computeMigrationAmount,
  computeSwapAmount,
  computeFeesAmount,
  getFormattedFees,
  getFormattedNetworkFee,
  getFormattedProtocolFee,
}
