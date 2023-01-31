import { getFormattedFee } from '../fee'

describe('getFormattedFee', () => {
  test.each([
    ['0,01%', 'it-IT'],
    ['0.01%', 'en-EN'],
    ['0.01%', 'fr-FR'],
    ['0.01%', 'fa-IR'],
    ['0.01%', 'uz-Cyrl-UZ']
  ])('Should return %p when locale is %p', (_expectedResult, _locale) => {
    jest.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    const num = 0.01
    const formattedNum = getFormattedFee(num)
    expect(formattedNum).toEqual(_expectedResult)
  })
})
