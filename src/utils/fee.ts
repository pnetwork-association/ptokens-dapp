import BigNumber from 'bignumber.js'
import _ from 'lodash'
import { pTokensAsset } from 'ptokens-entities'

import { Asset } from '../settings/swap-assets'

import { formatDecimalSeparator } from './amount-utils'
import { createAsset } from './ptokens'

export type Fees = {
  networkFee: number
  basisPoints: number
  minProtocolFee: number
}

const getBasisPoints = (_fromAsset: pTokensAsset, _toAsset: pTokensAsset) => {
  return 0
}

const getSwapFees = async (_from: Asset, _to: Asset) => {
  try {
    const fromAsset = await createAsset(_from)
    const toAsset = await createAsset(_to)
    const basisPoints = getBasisPoints(fromAsset, toAsset)
    const networkFee = 0
    const minProtocolFee = 0
    return { basisPoints, networkFee, minProtocolFee }
  } catch (_err) {
    return { basisPoints: undefined, networkFee: undefined, minProtocolFee: undefined }
  }
}

const computeNetworkFee = (fees: Fees) => {
  return BigNumber(fees.networkFee).dividedBy(1e18)
}

const computeProtocolFee = (fees: Fees, amount: BigNumber.Value) =>
  BigNumber.maximum(
    BigNumber(fees.minProtocolFee).dividedBy(1e18),
    BigNumber(amount).multipliedBy(fees.basisPoints).dividedBy(10000)
  )

const computeFeesAmount = (fees: Fees, amount: BigNumber.Value) => {
  return computeProtocolFee(fees, amount).plus(computeNetworkFee(fees))
}

const computeToAmount = (fees: Fees, amount: BigNumber.Value) =>
  BigNumber(amount).minus(computeFeesAmount(fees, amount)).toFixed()

const computeFromAmount = (fees: Fees, amount: BigNumber.Value) => {
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

const computeSwapAmount = (fees: Fees, amount: BigNumber.Value, direction: string) => {
  return amount !== '' ? (direction === 'to' ? computeToAmount(fees, amount) : computeFromAmount(fees, amount)) : amount
}

const getFixedOrPrecision = (_n: BigNumber.Value) => {
  const bn = BigNumber(_n)
  return bn.e && bn.e >= 3 ? bn.toFixed(1) : bn.toPrecision(3)
}

const getFormattedAmount = (_amount: BigNumber, _tilde = false) => {
  const requiresTilde = _tilde && !_amount.eq(getFixedOrPrecision(_amount))
  return `${requiresTilde ? '~' : ''}${formatDecimalSeparator(getFixedOrPrecision(_amount))}`
}

const getNetworkFeeDescription = (fees: Fees, symbol: string) => {
  if (!fees || _.isNil(fees.networkFee) || _.isNil(symbol)) return ''
  return `${getFormattedAmount(BigNumber(fees.networkFee).dividedBy(1e18))} ${symbol}`
}

const getFormattedNetworkFee = getNetworkFeeDescription

const getProtocolFeeDescription = (fees: Fees, symbol: string) => {
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

const getFormattedProtocolFee = (fees: Fees, amount: BigNumber.Value, symbol: string) => {
  if (!fees || _.isNil(fees.basisPoints) || _.isNil(fees.minProtocolFee) || _.isNil(fees.networkFee) || _.isNil(symbol))
    return ''
  if (_.isNil(amount) || amount === '') return getProtocolFeeDescription(fees, symbol)
  const protocolFee = computeProtocolFee(fees, amount)
  return protocolFee.isGreaterThan(BigNumber(fees.minProtocolFee).dividedBy(1e18))
    ? `${getFormattedAmount(protocolFee, true)} ${symbol} (=${getFixedOrPrecision(
        BigNumber(fees.basisPoints).dividedBy(100)
      )}%)`
    : `${getFormattedAmount(protocolFee, false)} ${symbol}`
}

const getFeesDescription = (fees: Fees, symbol: string) =>
  getProtocolFeeDescription(fees, symbol) + (fees.networkFee > 0 ? ` + ${getNetworkFeeDescription(fees, symbol)}` : '')

const getFormattedFees = (fees: Fees, amount: BigNumber.Value, symbol: string) => {
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
  getSwapFees,
  computeSwapAmount,
  computeFeesAmount,
  getFormattedFees,
  getFormattedNetworkFee,
  getFormattedProtocolFee,
}
