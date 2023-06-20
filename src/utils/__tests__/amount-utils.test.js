import { test, vi, describe, expect } from 'vitest'

import { getDecimalSeparator, getThousandSeparator, formatDecimalSeparator } from '../amount-utils'

describe('getDecimalSeparator', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })
  test.each([
    [',', 'it-IT'],
    ['.', 'en-EN'],
    ['.', 'fr-FR'],
    ['.', 'fa-IR'],
    ['.', 'uz-Cyrl-UZ'],
  ])('Should return %s when locale is %s', (_separator, _locale) => {
    vi.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    const sep = getDecimalSeparator()
    expect(sep).toEqual(_separator)
  })
})

describe('getThousandSeparator', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })
  test.each([
    ['.', 'it-IT'],
    [',', 'en-EN'],
    [',', 'fr-FR'],
    [',', 'fa-IR'],
    [',', 'uz-Cyrl-UZ'],
  ])('Should return %s when locale is %s', (_separator, _locale) => {
    vi.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    const sep = getThousandSeparator()
    expect(sep).toEqual(_separator)
  })
})

describe('formatDecimalSeparator', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })
  test.each([
    ['54325,28', 'it-IT'],
    ['54325.28', 'en-EN'],
    ['54325.28', 'fr-FR'],
    ['54325.28', 'fa-IR'],
    ['54325.28', 'uz-Cyrl-UZ'],
  ])('Should return %s when locale is %s', (_expectedResult, _locale) => {
    vi.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    const num = 54325.28
    const formattedNum = formatDecimalSeparator(num)
    expect(formattedNum).toEqual(_expectedResult)
  })
})
