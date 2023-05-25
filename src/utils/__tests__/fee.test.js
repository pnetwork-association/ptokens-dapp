import { afterEach, test, vi, describe, expect } from 'vitest'
import { getFormattedFees, getFeesDescription, computeSwapAmount } from '../fee'

describe('getFormattedFees', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test.each([
    ['0,01 %', 'it-IT'],
    ['0.01 %', 'en-EN'],
    ['0.01 %', 'fr-FR'],
    ['0.01 %', 'fa-IR'],
    ['0.01 %', 'uz-Cyrl-UZ'],
  ])('Should return %s when locale is %s', (_expectedResult, _locale) => {
    vi.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    const basisPoints = 1
    const minProtocolFee = 0
    const networkFee = 0
    const ret = getFormattedFees({ basisPoints, minProtocolFee, networkFee }, 'SYM')
    expect(ret).toEqual(_expectedResult)
    vi.resetAllMocks()
  })

  test.each([
    ['0,01 % (min 1,00 SYM)', 'it-IT'],
    ['0.01 % (min 1.00 SYM)', 'en-EN'],
    ['0.01 % (min 1.00 SYM)', 'fr-FR'],
    ['0.01 % (min 1.00 SYM)', 'fa-IR'],
    ['0.01 % (min 1.00 SYM)', 'uz-Cyrl-UZ'],
  ])('Should return %s, and minimum protocol fees, when locale is %s', (_expectedResult, _locale) => {
    vi.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    const basisPoints = 1
    const minProtocolFee = 1e18
    const networkFee = 0
    const ret = getFormattedFees({ basisPoints, minProtocolFee, networkFee }, 'SYM')
    expect(ret).toEqual(_expectedResult)
    vi.resetAllMocks()
  })

  test.each([
    ['0,01 % (min 1,00 SYM) + 0,00100 SYM', 'it-IT'],
    ['0.01 % (min 1.00 SYM) + 0.00100 SYM', 'en-EN'],
    ['0.01 % (min 1.00 SYM) + 0.00100 SYM', 'fr-FR'],
    ['0.01 % (min 1.00 SYM) + 0.00100 SYM', 'fa-IR'],
    ['0.01 % (min 1.00 SYM) + 0.00100 SYM', 'uz-Cyrl-UZ'],
  ])('Should return %s, minimum protocol fees, and network fees, when locale is %s', (_expectedResult, _locale) => {
    vi.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    const basisPoints = 1
    const minProtocolFee = 1e18
    const networkFee = 1e15
    const symbol = 'SYM'
    const ret = getFormattedFees({ basisPoints, minProtocolFee, networkFee }, symbol)
    expect(ret).toEqual(_expectedResult)
    vi.resetAllMocks()
  })

  test.each([
    ['0,01 % + 0,00100 SYM', 'it-IT'],
    ['0.01 % + 0.00100 SYM', 'en-EN'],
    ['0.01 % + 0.00100 SYM', 'fr-FR'],
    ['0.01 % + 0.00100 SYM', 'fa-IR'],
    ['0.01 % + 0.00100 SYM', 'uz-Cyrl-UZ'],
  ])('Should return %s, and network fees, when locale is %s', (_expectedResult, _locale) => {
    vi.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    const basisPoints = 1
    const minProtocolFee = 0
    const networkFee = 1e15
    const symbol = 'SYM'
    const ret = getFormattedFees({ basisPoints, minProtocolFee, networkFee }, symbol)
    expect(ret).toEqual(_expectedResult)
    vi.resetAllMocks()
  })
})

describe('computeSwapAmount', () => {
  test.each([
    [10, 0, 1e18, 'to', '999'],
    [10, 1e18, 1e18, 'to', '998'],
    [25, 0, 1e18, 'to', '997.5'],
    [25, 2e18, 1e18, 'to', '995.5'],
    [10, 0, 1e18, 'from', '1001.001001001001001001'],
    [10, 1e18, 1e18, 'from', '1002.002002002002002002'],
    [25, 0, 1e18, 'from', '1002.50626566416040100251'],
    [25, 2e18, 1e18, 'from', '1004.51127819548872180451'],
  ])('should compute amount', (basisPoints, networkFee, minProtocolFee, _direction, _expectedResult) => {
    const amount = 1000
    const finalAmount = computeSwapAmount({ basisPoints, minProtocolFee, networkFee }, amount, _direction)
    expect(finalAmount).toStrictEqual(_expectedResult)
    if (_direction === 'from')
      expect(computeSwapAmount({ basisPoints, minProtocolFee, networkFee }, finalAmount, 'to')).toStrictEqual('1000')
  })
})

describe('getFeesDescription', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test.each([
    ['Protocol fee: 0,01 %', 'it-IT'],
    ['Protocol fee: 0.01 %', 'en-EN'],
    ['Protocol fee: 0.01 %', 'fr-FR'],
    ['Protocol fee: 0.01 %', 'fa-IR'],
    ['Protocol fee: 0.01 %', 'uz-Cyrl-UZ'],
  ])('Should return %s when locale is %s', (_expectedResult, _locale) => {
    vi.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    // Intl.NumberFormat = vi.fn().mockReturnValue(Intl.NumberFormat(_locale))
    const basisPoints = 1
    const minProtocolFee = 0
    const networkFee = 0
    const ret = getFeesDescription({ basisPoints, minProtocolFee, networkFee }, 'SYM')
    expect(ret).toEqual(_expectedResult)
    vi.resetAllMocks()
  })

  test.each([
    ['Protocol fee: 0,01 % (min 1,00 SYM)', 'it-IT'],
    ['Protocol fee: 0.01 % (min 1.00 SYM)', 'en-EN'],
    ['Protocol fee: 0.01 % (min 1.00 SYM)', 'fr-FR'],
    ['Protocol fee: 0.01 % (min 1.00 SYM)', 'fa-IR'],
    ['Protocol fee: 0.01 % (min 1.00 SYM)', 'uz-Cyrl-UZ'],
  ])('Should return %s, and min protocol fees, when locale is %s', (_expectedResult, _locale) => {
    vi.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    // Intl.NumberFormat = vi.fn().mockReturnValue(Intl.NumberFormat(_locale))
    const basisPoints = 1
    const minProtocolFee = 1e18
    const networkFee = 0
    const ret = getFeesDescription({ basisPoints, minProtocolFee, networkFee }, 'SYM')
    expect(ret).toEqual(_expectedResult)
    vi.resetAllMocks()
  })

  test.each([
    ['Protocol fee: 0,01 % (min 1,00 SYM)<br/>Network fee: 0,00100 SYM', 'it-IT'],
    ['Protocol fee: 0.01 % (min 1.00 SYM)<br/>Network fee: 0.00100 SYM', 'en-EN'],
    ['Protocol fee: 0.01 % (min 1.00 SYM)<br/>Network fee: 0.00100 SYM', 'fr-FR'],
    ['Protocol fee: 0.01 % (min 1.00 SYM)<br/>Network fee: 0.00100 SYM', 'fa-IR'],
    ['Protocol fee: 0.01 % (min 1.00 SYM)<br/>Network fee: 0.00100 SYM', 'uz-Cyrl-UZ'],
  ])('Should return %s, min protocol fees, and network fees, when locale is %s', (_expectedResult, _locale) => {
    vi.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    // Intl.NumberFormat = vi.fn().mockReturnValue(Intl.NumberFormat(_locale))
    const basisPoints = 1
    const minProtocolFee = 1e18
    const networkFee = 1e15
    const symbol = 'SYM'
    const ret = getFeesDescription({ basisPoints, minProtocolFee, networkFee }, symbol)
    expect(ret).toEqual(_expectedResult)
    vi.resetAllMocks()
  })

  test.each([
    ['Protocol fee: 0,01 %<br/>Network fee: 0,00100 SYM', 'it-IT'],
    ['Protocol fee: 0.01 %<br/>Network fee: 0.00100 SYM', 'en-EN'],
    ['Protocol fee: 0.01 %<br/>Network fee: 0.00100 SYM', 'fr-FR'],
    ['Protocol fee: 0.01 %<br/>Network fee: 0.00100 SYM', 'fa-IR'],
    ['Protocol fee: 0.01 %<br/>Network fee: 0.00100 SYM', 'uz-Cyrl-UZ'],
  ])('Should return %s, and network fees, when locale is %s', (_expectedResult, _locale) => {
    vi.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    // Intl.NumberFormat = vi.fn().mockReturnValue(Intl.NumberFormat(_locale))
    const basisPoints = 1
    const minProtocolFee = 0
    const networkFee = 1e15
    const symbol = 'SYM'
    const ret = getFeesDescription({ basisPoints, minProtocolFee, networkFee }, symbol)
    expect(ret).toEqual(_expectedResult)
    vi.resetAllMocks()
  })
})
