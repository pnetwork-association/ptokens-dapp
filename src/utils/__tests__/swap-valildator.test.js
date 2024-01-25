import { test, describe, expect } from 'vitest'

import { ETHPNT_ON_ETH_MAINNET, PNT_ON_ETH_MAINNET } from '../../constants'
import migrationAssets from '../../settings/migration-assets'
import assets from '../../settings/swap-assets'
import { isValidSwap } from '../swap-valildator'

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
        'PBTC_ON_GNOSIS_MAINNET',
        'PBTC_ON_EOS_MAINNET',
        'PBTC_ON_TELOS_MAINNET',
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
        'PBTC_ON_TELOS_MAINNET',
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
        'PBTC_ON_TELOS_MAINNET',
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
        'PBTC_ON_TELOS_MAINNET',
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
        'PBTC_ON_TELOS_MAINNET',
      ],
    ],
    [
      'USDT',
      ['USDT_ON_ALGORAND_MAINNET', 'PUSDT_ON_ALGORAND_MAINNET', 'PUSDT_ON_LIBRE_MAINNET', 'PUSDT_ON_TELOS_MAINNET'],
    ],
    ['USDT_ON_ALGORAND_MAINNET', ['USDT']],
    ['PUSDT_ON_ALGORAND_MAINNET', ['USDT', 'PUSDT_ON_LIBRE_MAINNET', 'PUSDT_ON_TELOS_MAINNET']],
    ['UOS', ['PUOS_ON_ULTRA_MAINNET']],
  ])('Should determine valid destination assets for %s', (id, expectedIds) => {
    const from = getAssetById(id)
    const expectedAssets = setFromIds(expectedIds)
    const ret = assets.filter((_asset) => isValidSwap(from, _asset, assets))
    expect(new Set(ret)).toStrictEqual(expectedAssets)
  })

  test('Should always be there at least one valid swap pair', () => {
    assets
      .filter((asset) => asset.id !== ETHPNT_ON_ETH_MAINNET) // exclude ethPNT which is put in PNT list
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

  test('Should return true if from asset is ethPNT and to assets are non-native PNT', () => {
    const ethPnt = assets.find((asset) => asset.id === ETHPNT_ON_ETH_MAINNET)
    assets.map((_to) =>
      _to.nativeSymbol === 'PNT' && !_to.isNative ? expect(isValidSwap(ethPnt, _to, assets)).toBeTruthy() : null
    )
  })

  test('Should return false if to asset is ethPNT', () => {
    const ethPnt = assets.find((asset) => asset.id === ETHPNT_ON_ETH_MAINNET)
    assets.map((_from) => expect(isValidSwap(_from, ethPnt, assets)).toBeFalsy())
  })

  test('Should return false if trying to go from ethPNT to PNT', () => {
    const ethPnt = assets.find((asset) => asset.id === ETHPNT_ON_ETH_MAINNET)
    const pnt = assets.find((asset) => asset.id === PNT_ON_ETH_MAINNET)
    assets.map((_from) => expect(isValidSwap(ethPnt, pnt, assets)).toBeFalsy())
  })
})
