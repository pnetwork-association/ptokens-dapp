import { vi, describe, expect } from 'vitest'
import * as peginWithDepositAddress from '../utils/pegin-with-deposit-address'
import * as pegout from '../utils/pegout'
import * as peginWithWallet from '../utils/pegin-with-wallet'
import { pTokensSwapBuilder, pTokensSwap } from 'ptokens-swap'
import { pTokensEosioAsset } from 'ptokens-assets-eosio'
import * as wallets from '../../wallets/wallets.selectors'
import { swap } from '../swap.actions'
import assets from '../../../settings/swap-assets'

describe('swap', () => {
  beforeAll(() => {
    vi.mock('ptokens-node')
  })

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('Should peg-in with deposit address pBTC on Ethereum', async () => {
    const peginWithDepositAddressSpy = vi.spyOn(peginWithDepositAddress, 'default').mockResolvedValue()
    const addDestinationAssetSpy = vi.spyOn(pTokensSwapBuilder.prototype, 'addDestinationAsset')
    const setAmountSpy = vi.spyOn(pTokensSwapBuilder.prototype, 'setAmount')
    const from = assets.find((_el) => _el.id === 'BTC')
    const to = assets.find((_el) => _el.id === 'PBTC_ON_ETH_MAINNET')
    const amount = '10'
    const address = '0xF39d30Fa570db7940e5b3A3e42694665A1449E4B'
    const f = swap(from, to, amount, address)
    const dispatch = vi.fn()
    await f(dispatch)
    expect(setAmountSpy).toHaveBeenCalledTimes(1)
    expect(setAmountSpy).toHaveBeenNthCalledWith(1, '10')
    expect(addDestinationAssetSpy).toHaveBeenCalledTimes(1)
    expect(addDestinationAssetSpy).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      '0xF39d30Fa570db7940e5b3A3e42694665A1449E4B'
    )
    expect(peginWithDepositAddressSpy).toHaveBeenCalledTimes(1)
    expect(peginWithDepositAddressSpy).toHaveBeenNthCalledWith(1, {
      swap: expect.any(pTokensSwap),
      ptokenFrom: from,
      ptokenTo: to,
      dispatch,
    })
  })

  it('Should peg-out TLOS on BSC', async () => {
    const pegoutSpy = vi.spyOn(pegout, 'default').mockResolvedValue()
    const addDestinationAssetSpy = vi.spyOn(pTokensSwapBuilder.prototype, 'addDestinationAsset')
    const setAmountSpy = vi.spyOn(pTokensSwapBuilder.prototype, 'setAmount')
    const from = assets.find((_el) => _el.id === 'TLOS_ON_BSC_MAINNET')
    const to = assets.find((_el) => _el.id === 'TLOS')
    const amount = '100'
    const address = '0xF39d30Fa570db7940e5b3A3e42694665A1449E4B'
    const f = swap(from, to, amount, address, { pegoutToTelosEvmAddress: true })
    const dispatch = vi.fn()
    await f(dispatch)
    expect(setAmountSpy).toHaveBeenCalledTimes(1)
    expect(setAmountSpy).toHaveBeenNthCalledWith(1, '100')
    expect(addDestinationAssetSpy).toHaveBeenCalledTimes(1)
    expect(addDestinationAssetSpy).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      'devm.ptokens',
      '0x307846333964333046613537306462373934306535623341336534323639343636354131343439453442'
    )
    expect(pegoutSpy).toHaveBeenCalledTimes(1)
    expect(pegoutSpy).toHaveBeenNthCalledWith(1, {
      swap: expect.any(pTokensSwap),
      ptokenFrom: from,
      ptokenTo: to,
      dispatch,
    })
  })

  it('Should peg-out pUOS on Ultra', async () => {
    vi.spyOn(wallets, 'getWallets').mockReturnValue({ ultra: { provider: undefined, account: 'sender' }, eth: {} })
    const pegoutSpy = vi.spyOn(pegout, 'default').mockResolvedValue()
    const addDestinationAssetSpy = vi.spyOn(pTokensSwapBuilder.prototype, 'addDestinationAsset')
    const setAmountSpy = vi.spyOn(pTokensSwapBuilder.prototype, 'setAmount')
    const setCustomActionsSpy = vi.spyOn(pTokensEosioAsset.prototype, 'setCustomActions')
    const from = assets.find((_el) => _el.id === 'PUOS_ON_ULTRA_MAINNET')
    const to = assets.find((_el) => _el.id === 'UOS')
    const amount = '100'
    const address = '0xF39d30Fa570db7940e5b3A3e42694665A1449E4B'
    const f = swap(from, to, amount, address)
    const dispatch = vi.fn()
    await f(dispatch)
    expect(setAmountSpy).toHaveBeenCalledTimes(1)
    expect(setAmountSpy).toHaveBeenNthCalledWith(1, '100')
    expect(setCustomActionsSpy).toHaveBeenCalledTimes(1)
    expect(setCustomActionsSpy).toHaveBeenNthCalledWith(1, [
      {
        abi: expect.anything(),
        arguments: {
          from: 'sender',
          memo: '0xF39d30Fa570db7940e5b3A3e42694665A1449E4B',
          quantity: '100.00000000 UOS',
          to: 'ultra.swap',
        },
        contractAddress: 'eosio.token',
        method: 'transfer',
      },
    ])
    expect(addDestinationAssetSpy).toHaveBeenCalledTimes(1)
    expect(addDestinationAssetSpy).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      '0xF39d30Fa570db7940e5b3A3e42694665A1449E4B'
    )
    expect(pegoutSpy).toHaveBeenCalledTimes(1)
    expect(pegoutSpy).toHaveBeenNthCalledWith(1, {
      swap: expect.any(pTokensSwap),
      ptokenFrom: from,
      ptokenTo: to,
      dispatch,
    })
  })

  it('Should peg-in ETH on EOS', async () => {
    const peginWithWalletSpy = vi.spyOn(peginWithWallet, 'default').mockResolvedValue()
    const addDestinationAssetSpy = vi.spyOn(pTokensSwapBuilder.prototype, 'addDestinationAsset')
    const setAmountSpy = vi.spyOn(pTokensSwapBuilder.prototype, 'setAmount')
    const from = assets.find((_el) => _el.id === 'ZMT')
    const to = assets.find((_el) => _el.id === 'ZMT_ON_BSC_MAINNET')
    const amount = '1000'
    const address = '0xF39d30Fa570db7940e5b3A3e42694665A1449E4B'
    const f = swap(from, to, amount, address)
    const dispatch = vi.fn()
    await f(dispatch)
    expect(setAmountSpy).toHaveBeenCalledTimes(1)
    expect(setAmountSpy).toHaveBeenNthCalledWith(1, '1000')
    expect(addDestinationAssetSpy).toHaveBeenCalledTimes(1)
    expect(addDestinationAssetSpy).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      '0xF39d30Fa570db7940e5b3A3e42694665A1449E4B'
    )
    expect(peginWithWalletSpy).toHaveBeenCalledTimes(1)
    expect(peginWithWalletSpy).toHaveBeenNthCalledWith(1, {
      swap: expect.any(pTokensSwap),
      ptokenFrom: from,
      ptokenTo: to,
      dispatch,
    })
  })
})
