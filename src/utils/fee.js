import BigNumber from 'bignumber.js'
import { formatDecimalSeparator } from './amount-utils'
import { createAsset } from './ptokens'
import { PNT_ON_ETH_MAINNET, ETHPNT_ON_ETH_MAINNET, PBTC_ON_ETH_MAINNET_V1_MIGRATION } from '../constants'

const getFeeFactor = (fee) => {
  return 1 - fee / 100
}

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

const computeToAmount = (basisPoints, networkFee, minProtocolFee, amount) => {
  const protocolFees = BigNumber.maximum(
    BigNumber(minProtocolFee).dividedBy(1e18),
    BigNumber(amount).multipliedBy(basisPoints).dividedBy(10000)
  )
  return BigNumber(amount).minus(protocolFees).minus(BigNumber(networkFee).dividedBy(1e18)).toFixed()
}

const computeFromAmount = (basisPoints, networkFee, minProtocolFee, amount) => {
  const maybeAmount = BigNumber(amount)
    .plus(BigNumber(networkFee).dividedBy(1e18))
    .dividedBy(BigNumber(1).minus(BigNumber(basisPoints).dividedBy(10000)))
  return maybeAmount.multipliedBy(basisPoints).dividedBy(10000).isGreaterThan(BigNumber(minProtocolFee).dividedBy(1e18))
    ? maybeAmount.toFixed()
    : BigNumber(amount)
        .plus(BigNumber(networkFee).dividedBy(1e18))
        .plus(BigNumber(minProtocolFee).dividedBy(1e18))
        .toFixed()
}

const computeMigrationAmount = (from, to, amount, direction) => {
  const feeCoeff = getFeeFactor(getMigrationFees(from, to))
  return amount !== ''
    ? BigNumber(amount)
        .multipliedBy(direction === 'to' ? feeCoeff : 1 / feeCoeff)
        .toFixed()
    : amount
}

const computeSwapAmount = (fees, amount, direction) => {
  if (!fees || fees.basisPoints === undefined || fees.networkFee === undefined || fees.minProtocolFee === undefined)
    return null
  return amount !== ''
    ? direction === 'to'
      ? computeToAmount(fees.basisPoints, fees.networkFee, fees.minProtocolFee, amount)
      : computeFromAmount(fees.basisPoints, fees.networkFee, fees.minProtocolFee, amount)
    : amount
}

const getFormattedFees = (fees, symbol) => {
  if (
    !fees ||
    fees.basisPoints === undefined ||
    fees.minProtocolFee === undefined ||
    fees.networkFee === undefined ||
    symbol === undefined
  ) {
    return ''
  }
  return (
    `${formatDecimalSeparator(fees.basisPoints / 100)} %` +
    (fees.minProtocolFee > 0
      ? ` (min ${formatDecimalSeparator(BigNumber(fees.minProtocolFee).dividedBy(1e18).toPrecision(3))} ${symbol})`
      : '') +
    (fees.networkFee > 0
      ? ` + ${formatDecimalSeparator(BigNumber(fees.networkFee).dividedBy(1e18).toPrecision(3))} ${symbol}`
      : '')
  )
}

const getFeesDescription = (fees, symbol) => {
  if (
    !fees ||
    fees.basisPoints === undefined ||
    fees.minProtocolFee === undefined ||
    fees.networkFee === undefined ||
    symbol === undefined
  )
    return ''
  const protocolFeeDesc =
    `Protocol fee: ${formatDecimalSeparator(BigNumber(fees.basisPoints).dividedBy(100))} %` +
    (fees.minProtocolFee > 0
      ? ` (min ${formatDecimalSeparator(BigNumber(fees.minProtocolFee).dividedBy(1e18).toPrecision(3))} ${symbol})`
      : '')

  const networkFeeDesc =
    fees.networkFee > 0
      ? `Network fee: ${formatDecimalSeparator(BigNumber(fees.networkFee).dividedBy(1e18).toPrecision(3))} ${symbol}`
      : null
  return [protocolFeeDesc, networkFeeDesc].filter((_) => _).join('<br/>')
}

export {
  getMigrationFees,
  getSwapFees,
  computeMigrationAmount,
  computeSwapAmount,
  getFormattedFees,
  getFeesDescription,
}
