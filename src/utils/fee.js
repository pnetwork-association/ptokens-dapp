import BigNumber from 'bignumber.js'
import { formatDecimalSeparator } from './amount-utils'
import { PNT_ON_ETH_MAINNET, ETHPNT_ON_ETH_MAINNET, PBTC_ON_ETH_MAINNET_V1_MIGRATION } from '../constants'
import _ from 'lodash'

const getFeeFactor = (fee) => (_.isNil(fee) ? null : 1 - fee / 100)

const getBasisPoints = (_assetInfoFrom, _assetInfoTo) => {
  if (_assetInfoFrom.isNative && _assetInfoTo.isNative) return _assetInfoFrom.fees.basisPoints.nativeToNative
  else if (_assetInfoFrom.isNative && !_assetInfoTo.isNative) return _assetInfoFrom.fees.basisPoints.nativeToHost
  else if (!_assetInfoFrom.isNative && _assetInfoTo.isNative) return _assetInfoFrom.fees.basisPoints.hostToNative
  else if (!_assetInfoFrom.isNative && !_assetInfoTo.isNative) return _assetInfoFrom.fees.basisPoints.hostToHost
}

const getMigrationFees = (_from, _to) => {
  if (_from.id === ETHPNT_ON_ETH_MAINNET && _to.id === PNT_ON_ETH_MAINNET) return 0.25
  else if (_from.id === PBTC_ON_ETH_MAINNET_V1_MIGRATION) return 0
  else return null
}

const getSwapFees = async (_assetInfoFrom, _assetInfoTo) => {
  try {
    const basisPoints = getBasisPoints(_assetInfoFrom, _assetInfoTo)
    const networkFee = _assetInfoTo.fees.networkFee
    const minProtocolFee = _assetInfoFrom.fees.minNodeOperatorFee
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

const getFormattedNetworkFees = (fees, symbol) => {
  if (!fees) return ''
  return `${formatDecimalSeparator(BigNumber(fees.networkFee).dividedBy(1e18).toPrecision(3))} ${symbol}`
}

const getFormattedProtocolFees = (fees, symbol) => {
  if (!fees) return ''
  return (
    `${formatDecimalSeparator(fees.basisPoints / 100)} %` +
    (fees.minProtocolFee > 0
      ? ` (min ${formatDecimalSeparator(BigNumber(fees.minProtocolFee).dividedBy(1e18).toPrecision(3))} ${symbol})`
      : '')
  )
}

const getFormattedFeesDescription = (fees, symbol) => {
  if (
    !fees ||
    _.isNil(fees.basisPoints) ||
    _.isNil(fees.minProtocolFee) ||
    _.isNil(fees.networkFee) ||
    _.isNil(symbol)
  ) {
    return ''
  }
  return (
    getFormattedProtocolFees(fees, symbol) + (fees.networkFee > 0 ? ` + ${getFormattedNetworkFees(fees, symbol)}` : '')
  )
}

const getFormattedFeesDescriptionAmount = (fees, amount, symbol) => {
  if (
    !fees ||
    _.isNil(fees.basisPoints) ||
    _.isNil(fees.minProtocolFee) ||
    _.isNil(fees.networkFee) ||
    _.isNil(symbol)
  ) {
    return ''
  }
  if (_.isNil(amount) || amount === '') return getFormattedFeesDescription(fees, symbol)
  const feesAmount = computeFeesAmount(fees, amount)
  const requiresTilde = !feesAmount.eq(BigNumber(feesAmount.toPrecision(3)))
  return `${requiresTilde ? '~' : ''}${formatDecimalSeparator(
    computeFeesAmount(fees, amount).toPrecision(3)
  )} ${symbol}`
}

const getNetworkFeeDescription = (fees, symbol) => {
  if (!fees || _.isNil(fees.networkFee) || _.isNil(symbol)) return ''
  return `${formatDecimalSeparator(getFormattedNetworkFees(fees, symbol))}`
}

const getProtocolFeeDescription = (fees, amount, symbol) => {
  if (!fees || _.isNil(fees.basisPoints) || _.isNil(fees.minProtocolFee) || _.isNil(fees.networkFee) || _.isNil(symbol))
    return ''
  if (_.isNil(amount) || amount === '') return getFormattedProtocolFees(fees, symbol)
  const protocolFee = computeProtocolFee(fees, amount)
  return protocolFee.isGreaterThan(BigNumber(fees.minProtocolFee).dividedBy(1e18))
    ? `${formatDecimalSeparator(protocolFee.toPrecision(3))} ${symbol} (=${BigNumber(fees.basisPoints).dividedBy(
        100
      )}%)`
    : `${formatDecimalSeparator(protocolFee.toPrecision(3))} ${symbol}`
}

export {
  getMigrationFees,
  getSwapFees,
  computeMigrationAmount,
  computeSwapAmount,
  computeFeesAmount,
  getFormattedFeesDescription,
  getFormattedFeesDescriptionAmount,
  getNetworkFeeDescription,
  getProtocolFeeDescription,
}
