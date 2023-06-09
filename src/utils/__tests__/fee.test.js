import { afterEach, test, vi, describe, expect } from 'vitest'
import {
  getMigrationFees,
  computeMigrationAmount,
  computeSwapAmount,
  computeFeesAmount,
  getFormattedFeesDescription,
  getFormattedFeesDescriptionAmount,
  getNetworkFeeDescription,
  getProtocolFeeDescription,
} from '../fee'
import { PBTC_ON_ETH_MAINNET_V1_MIGRATION, ETHPNT_ON_ETH_MAINNET, PNT_ON_ETH_MAINNET } from '../../constants'

describe('getFormattedFeesDescription', () => {
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
    const ret = getFormattedFeesDescription({ basisPoints, minProtocolFee, networkFee }, 'SYM')
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
    const ret = getFormattedFeesDescription({ basisPoints, minProtocolFee, networkFee }, 'SYM')
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
    const ret = getFormattedFeesDescription({ basisPoints, minProtocolFee, networkFee }, symbol)
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
    const ret = getFormattedFeesDescription({ basisPoints, minProtocolFee, networkFee }, symbol)
    expect(ret).toEqual(_expectedResult)
    vi.resetAllMocks()
  })
})

describe('getMigrationFees', () => {
  test.each([
    [{ id: PBTC_ON_ETH_MAINNET_V1_MIGRATION }, { id: 2 }, 0],
    [{ id: ETHPNT_ON_ETH_MAINNET }, { id: PNT_ON_ETH_MAINNET }, 0.25],
    [{ id: PNT_ON_ETH_MAINNET }, { id: ETHPNT_ON_ETH_MAINNET }, null],
  ])('Should compute migration fees amount %s %s', (from, to, expected) => {
    const ret = getMigrationFees(from, to)
    expect(ret).toStrictEqual(expected)
  })
})

describe('computeMigrationAmount', () => {
  test.each([
    [{ id: PBTC_ON_ETH_MAINNET_V1_MIGRATION }, { id: 2 }, '10', 'from', '10'],
    [{ id: ETHPNT_ON_ETH_MAINNET }, { id: PNT_ON_ETH_MAINNET }, '10', 'from', '10.025062656641603'],
    [{ id: ETHPNT_ON_ETH_MAINNET }, { id: PNT_ON_ETH_MAINNET }, '10', 'to', '9.975'],
    [{ id: PNT_ON_ETH_MAINNET }, { id: ETHPNT_ON_ETH_MAINNET }, '10', 'to', null],
    [{ id: ETHPNT_ON_ETH_MAINNET }, { id: PNT_ON_ETH_MAINNET }, '', 'to', ''],
  ])('Should compute migration fees amount', (from, to, amount, direction, expected) => {
    const ret = computeMigrationAmount(from, to, amount, direction)
    expect(ret).toStrictEqual(expected)
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
    [25, 2e18, 5e18, 'from', '1007'],
  ])('should compute swap amount', (basisPoints, networkFee, minProtocolFee, _direction, _expectedResult) => {
    const amount = 1000
    const finalAmount = computeSwapAmount({ basisPoints, minProtocolFee, networkFee }, amount, _direction)
    expect(finalAmount).toStrictEqual(_expectedResult)
    if (_direction === 'from')
      expect(computeSwapAmount({ basisPoints, minProtocolFee, networkFee }, finalAmount, 'to')).toStrictEqual('1000')
  })
})

describe('getProtocolFeeDescription', () => {
  test.each([
    [10, 0, 1e18, '1.00 SYM'],
    [10, 1e18, 1e18, '1.00 SYM'],
    [25, 0, 1e18, '2.50 SYM (=0.25%)'],
    [25, 2e18, 1e18, '2.50 SYM (=0.25%)'],
    [10, 0, 1e18, '1.00 SYM'],
    [10, 1e18, 1e18, '1.00 SYM'],
    [25, 0, 1e18, '2.50 SYM (=0.25%)'],
    [25, 2e18, 1e18, '2.50 SYM (=0.25%)'],
  ])('Should get protocol fee description', (basisPoints, networkFee, minProtocolFee, expected) => {
    const amount = 1000
    const symbol = 'SYM'
    const ret = getProtocolFeeDescription({ basisPoints, networkFee, minProtocolFee }, amount, symbol)
    expect(ret).toStrictEqual(expected)
  })
})

describe('getNetworkFeeDescription', () => {
  test.each`
    basisPoints | networkFee   | minProtocolFee | expected
    ${10}       | ${0}         | ${1e18}        | ${'0.00 SYM'}
    ${10}       | ${1e18}      | ${1e18}        | ${'1.00 SYM'}
    ${25}       | ${2e18}      | ${1e18}        | ${'2.00 SYM'}
    ${25}       | ${null}      | ${1e18}        | ${''}
    ${25}       | ${undefined} | ${1e18}        | ${''}
  `(
    'Should get network fee description if network fee is $networkFee',
    ({ basisPoints, networkFee, minProtocolFee, expected }) => {
      const symbol = 'SYM'
      const ret = getNetworkFeeDescription({ basisPoints, networkFee, minProtocolFee }, symbol)
      expect(ret).toStrictEqual(expected)
    }
  )
})

describe('getFormattedFeesDescription', () => {
  test.each`
    basisPoints | networkFee   | minProtocolFee | expected
    ${10}       | ${0}         | ${0}           | ${'0.1 %'}
    ${0}        | ${0}         | ${0}           | ${'0 %'}
    ${10}       | ${0}         | ${1e18}        | ${'0.1 % (min 1.00 SYM)'}
    ${10}       | ${1e18}      | ${1e18}        | ${'0.1 % (min 1.00 SYM) + 1.00 SYM'}
    ${25}       | ${2e18}      | ${1e18}        | ${'0.25 % (min 1.00 SYM) + 2.00 SYM'}
    ${25}       | ${null}      | ${1e18}        | ${''}
    ${25}       | ${undefined} | ${1e18}        | ${''}
  `(
    'Should get formatted fee with fees {$basisPoints, $networkFee, $minProtocolFee}',
    ({ basisPoints, networkFee, minProtocolFee, amount, expected }) => {
      const symbol = 'SYM'
      const ret = getFormattedFeesDescription({ basisPoints, networkFee, minProtocolFee }, symbol)
      expect(ret).toStrictEqual(expected)
    }
  )
})

describe('getFormattedFeesDescriptionAmount', () => {
  test.each`
    basisPoints | networkFee   | minProtocolFee | amount       | expected
    ${10}       | ${0}         | ${1e18}        | ${null}      | ${'0.1 % (min 1.00 SYM)'}
    ${10}       | ${0}         | ${1e18}        | ${undefined} | ${'0.1 % (min 1.00 SYM)'}
    ${10}       | ${0}         | ${1e18}        | ${0}         | ${'1.00 SYM'}
    ${10}       | ${0}         | ${1e18}        | ${10}        | ${'1.00 SYM'}
    ${10}       | ${1e18}      | ${1e18}        | ${10}        | ${'2.00 SYM'}
    ${25}       | ${2e18}      | ${1e18}        | ${10}        | ${'3.00 SYM'}
    ${15}       | ${1e18}      | ${0}           | ${10}        | ${'~1.02 SYM'}
    ${25}       | ${null}      | ${1e18}        | ${10}        | ${''}
    ${25}       | ${undefined} | ${10}          | ${1e18}      | ${''}
  `(
    'Should get formatted fees amount with fees {$basisPoints, $networkFee, $minProtocolFee} and amount $amount',
    ({ basisPoints, networkFee, minProtocolFee, amount, expected }) => {
      const symbol = 'SYM'
      const ret = getFormattedFeesDescriptionAmount({ basisPoints, networkFee, minProtocolFee }, amount, symbol)
      expect(ret).toStrictEqual(expected)
    }
  )
})

describe('computeFeesAmount', () => {
  test.each`
    basisPoints | networkFee   | minProtocolFee | amount       | expected
    ${10}       | ${0}         | ${1e18}        | ${null}      | ${null}
    ${10}       | ${0}         | ${1e18}        | ${undefined} | ${null}
    ${10}       | ${0}         | ${1e18}        | ${0}         | ${'1'}
    ${10}       | ${0}         | ${1e18}        | ${10}        | ${'1'}
    ${10}       | ${1e18}      | ${1e18}        | ${10}        | ${'2'}
    ${10}       | ${1e18}      | ${1e18}        | ${''}        | ${null}
    ${null}     | ${1e18}      | ${1e18}        | ${10}        | ${null}
    ${25}       | ${2e18}      | ${1e18}        | ${10}        | ${'3'}
    ${25}       | ${null}      | ${1e18}        | ${10}        | ${null}
    ${25}       | ${undefined} | ${10}          | ${1e18}      | ${null}
  `(
    'Should compute fees amount with fees {$basisPoints, $networkFee, $minProtocolFee} and amount $amount',
    ({ basisPoints, networkFee, minProtocolFee, amount, expected }) => {
      const symbol = 'SYM'
      const ret = computeFeesAmount({ basisPoints, networkFee, minProtocolFee }, amount, symbol)
      expect(ret && ret.toFixed()).toStrictEqual(expected)
    }
  )
})
