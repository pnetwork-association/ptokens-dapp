import { test, describe, expect } from 'vitest'
import { isValidSwap } from '../swap-valildator'
import assets from '../../settings/swap-assets'
import migrationAssets from '../../settings/migration-assets'

describe('isValidSwap', () => {
  const getAssetById = (_id) => {
    const asset = assets.find(({ id }) => id === _id)
    if (!asset) throw new Error(`Not existing asset for ${_id}`)
    return asset
  }

  const setFromIds = (ids) => new Set(ids.map(getAssetById))
  test.each([
    ['TLOS_ON_ETH_MAINNET', ['TLOS']],
    ['TLOS_ON_BSC_MAINNET', ['TLOS', 'TLOS_ON_ETH_MAINNET']],
    [
      'BTC',
      [
        'PBTC_ON_ALGORAND_MAINNET',
        'PBTC_ON_ARBITRUM_MAINNET',
        'PBTC_ON_BSC_MAINNET',
        'PBTC_ON_EOS_MAINNET',
        'PBTC_ON_ETH_MAINNET',
        'PBTC_ON_LIBRE_MAINNET',
        'PBTC_ON_POLYGON_MAINNET',
        'PBTC_ON_TELOS_MAINNET',
        'PBTC_ON_XDAI_MAINNET',
        'PBTC_ON_EOS_MAINNET',
      ],
    ],
    [
      'PBTC_ON_ALGORAND_MAINNET',
      [
        'BTC',
        'PBTC_ON_BSC_MAINNET',
        'PBTC_ON_ETH_MAINNET',
        'PBTC_ON_LIBRE_MAINNET',
        'PBTC_ON_POLYGON_MAINNET',
        'PBTC_ON_EOS_MAINNET',
        'PBTC_ON_ARBITRUM_MAINNET',
      ],
    ],
    [
      'PBTC_ON_LIBRE_MAINNET',
      [
        'BTC',
        'PBTC_ON_BSC_MAINNET',
        'PBTC_ON_ETH_MAINNET',
        'PBTC_ON_ALGORAND_MAINNET',
        'PBTC_ON_POLYGON_MAINNET',
        'PBTC_ON_EOS_MAINNET',
        'PBTC_ON_ARBITRUM_MAINNET',
      ],
    ],
    [
      'PBTC_ON_ARBITRUM_MAINNET',
      [
        'BTC',
        'PBTC_ON_BSC_MAINNET',
        'PBTC_ON_ETH_MAINNET',
        'PBTC_ON_ALGORAND_MAINNET',
        'PBTC_ON_POLYGON_MAINNET',
        'PBTC_ON_EOS_MAINNET',
        'PBTC_ON_LIBRE_MAINNET',
      ],
    ],
    [
      'WBTC_ON_ETH_MAINNET',
      [
        'BTC',
        'PBTC_ON_BSC_MAINNET',
        'PBTC_ON_LIBRE_MAINNET',
        'PBTC_ON_ALGORAND_MAINNET',
        'PBTC_ON_POLYGON_MAINNET',
        'PBTC_ON_EOS_MAINNET',
        'PBTC_ON_ARBITRUM_MAINNET',
      ],
    ],
    [
      'USDT',
      ['USDT_ON_ALGORAND_MAINNET', 'PUSDT_ON_ALGORAND_MAINNET', 'PUSDT_ON_LIBRE_MAINNET', 'PUSDT_ON_TELOS_MAINNET'],
    ],
    ['USDT_ON_ALGORAND_MAINNET', ['USDT']],
    ['PUSDT_ON_ALGORAND_MAINNET', ['USDT', 'PUSDT_ON_LIBRE_MAINNET', 'PUSDT_ON_TELOS_MAINNET']],
    ['UOS', ['PUOS_ON_EOS_MAINNET', 'PUOS_ON_ULTRA_MAINNET']],
  ])('Should determine valid destination assets for %s', (id, expectedIds) => {
    const from = getAssetById(id)
    const expectedAssets = setFromIds(expectedIds)
    const ret = assets.filter((_asset) => isValidSwap(from, _asset, assets))
    expect(new Set(ret)).toStrictEqual(expectedAssets)
  })

  test('Should always be there at least one valid swap pair', () => {
    assets
      .map((_from) => assets.filter((_to) => isValidSwap(_from, _to, assets)))
      .map((_pairs) => expect(_pairs.length).toBeGreaterThan(0))
  })

  test('Should return false if from asset is undefined', () => {
    assets.map((_to) => expect(isValidSwap(undefined, _to, assets)).toBeFalsy())
  })

  test('Should return false if from asset is null', () => {
    assets.map((_to) => expect(isValidSwap(null, _to, assets)).toBeFalsy())
  })

  test('Should return false if to asset is undefined', () => {
    assets.map((_from) => expect(isValidSwap(_from, undefined, assets)).toBeFalsy())
  })

  test('Should return false if to asset is null', () => {
    assets.map((_from) => expect(isValidSwap(_from, null, assets)).toBeFalsy())
  })

  test('Should return false if from or to assets are not in assets array', () => {
    assets.map((_from) => assets.map((_to) => expect(isValidSwap(_from, _to, migrationAssets)).toBeFalsy()))
  })
})
