import { getDecimalSeparator, getThousandSeparator, formatDecimalSeparator } from '../amount-utils'

describe('getDecimalSeparator', () => {
  test.each([
    [',', 'it-IT'],
    ['.', 'en-EN'],
    ['.', 'fr-FR'],
    ['.', 'fa-IR'],
    ['.', 'uz-Cyrl-UZ']
  ])('Should return %p when locale is %p', (_separator, _locale) => {
    jest.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    const sep = getDecimalSeparator()
    expect(sep).toEqual(_separator)
  })
})

describe('getThousandSeparator', () => {
  test.each([
    ['.', 'it-IT'],
    [',', 'en-EN'],
    [',', 'fr-FR'],
    [',', 'fa-IR'],
    [',', 'uz-Cyrl-UZ']
  ])('Should return %p when locale is %p', (_separator, _locale) => {
    jest.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    const sep = getThousandSeparator()
    expect(sep).toEqual(_separator)
  })
})

describe('formatDecimalSeparator', () => {
  test.each([
    ['54325,28', 'it-IT'],
    ['54325.28', 'en-EN'],
    ['54325.28', 'fr-FR'],
    ['54325.28', 'fa-IR'],
    ['54325.28', 'uz-Cyrl-UZ']
  ])('Should return %p when locale is %p', (_expectedResult, _locale) => {
    jest.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    const num = 54325.28
    const formattedNum = formatDecimalSeparator(num)
    expect(formattedNum).toEqual(_expectedResult)
  })
})
