import { afterEach, test, vi, describe, expect } from 'vitest';
import { getFormattedFee } from '../fee'

describe('getFormattedFee', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  test.each([
    ['0,01%', 'it-IT'],
    ['0.01%', 'en-EN'],
    ['0.01%', 'fr-FR'],
    ['0.01%', 'fa-IR'],
    ['0.01%', 'uz-Cyrl-UZ']
  ])('Should return %s when locale is %s', (_expectedResult, _locale) => {
    vi.spyOn(Intl, 'NumberFormat').mockReturnValue(new Intl.NumberFormat(_locale))
    // Intl.NumberFormat = vi.fn().mockReturnValue(Intl.NumberFormat(_locale))
    const num = 0.01
    const formattedNum = getFormattedFee(num)
    expect(formattedNum).toEqual(_expectedResult)
    vi.resetAllMocks()
  })
})
