import algosdk from 'algosdk'
import { pTokensAlgorandAsset } from 'ptokens-assets-algorand'
import { pTokensEosioAsset } from 'ptokens-assets-eosio'
import { pTokensSwapBuilder, pTokensSwap } from 'ptokens-swap'
import { vi, describe, expect } from 'vitest'

import assets from '../../../settings/swap-assets'
import * as wallets from '../../wallets/wallets.selectors'
import { swap } from '../swap.actions'
import * as peginWithDepositAddress from '../utils/pegin-with-deposit-address'
import * as peginWithWallet from '../utils/pegin-with-wallet'
import * as pegout from '../utils/pegout'

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

  it('Should peg-out pBTC on Algorand', async () => {
    const pegoutSpy = vi.spyOn(pegout, 'default').mockResolvedValue()
    const addDestinationAssetSpy = vi.spyOn(pTokensSwapBuilder.prototype, 'addDestinationAsset')
    const setCustomTransactionsSpy = vi.spyOn(pTokensAlgorandAsset.prototype, 'setCustomTransactions')
    const setAmountSpy = vi.spyOn(pTokensSwapBuilder.prototype, 'setAmount')
    const from = assets.find((_el) => _el.id === 'PBTC_ON_ALGORAND_MAINNET')
    const to = assets.find((_el) => _el.id === 'BTC')
    const amount = '1000'
    const address = '19qn1TWUUxyhFvxwVxNfhF3XaL2eK4ya65'
    const f = swap(from, to, amount, address)
    const dispatch = vi.fn()
    await f(dispatch)
    expect(setAmountSpy).toHaveBeenCalledTimes(1)
    expect(setAmountSpy).toHaveBeenNthCalledWith(1, '1000')
    expect(addDestinationAssetSpy).toHaveBeenCalledTimes(1)
    expect(addDestinationAssetSpy).toHaveBeenNthCalledWith(1, expect.anything(), '19qn1TWUUxyhFvxwVxNfhF3XaL2eK4ya65')
    expect(pegoutSpy).toHaveBeenCalledTimes(1)
    expect(pegoutSpy).toHaveBeenNthCalledWith(1, {
      swap: expect.any(pTokensSwap),
      ptokenFrom: from,
      ptokenTo: to,
      dispatch,
    })
    expect(setCustomTransactionsSpy).toHaveBeenCalledTimes(0)
  })

  it('Should peg-out USDC on Algorand', async () => {
    vi.spyOn(algosdk.Algodv2.prototype, 'getTransactionParams').mockReturnValue({
      do: () =>
        Promise.resolve({
          flatFee: false,
          fee: 0,
          firstRound: 29759365,
          lastRound: 29760365,
          genesisID: 'mainnet-v1.0',
          genesisHash: 'wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=',
        }),
    })
    vi.spyOn(wallets, 'getWallets').mockReturnValue({
      algorand: { provider: undefined, account: 'VCMJKWOY5P5P7SKMZFFOCEROPJCZOTIJMNIYNUCKH7LRO45JMJP6UYBIJA' },
      eth: {},
    })
    const pegoutSpy = vi.spyOn(pegout, 'default').mockResolvedValue()
    const addDestinationAssetSpy = vi.spyOn(pTokensSwapBuilder.prototype, 'addDestinationAsset')
    const setCustomTransactionsSpy = vi.spyOn(pTokensAlgorandAsset.prototype, 'setCustomTransactions')
    const setAmountSpy = vi.spyOn(pTokensSwapBuilder.prototype, 'setAmount')
    const from = assets.find((_el) => _el.id === 'USDC_ON_ALGORAND_MAINNET')
    const to = assets.find((_el) => _el.id === 'USDC')
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
    expect(pegoutSpy).toHaveBeenCalledTimes(1)
    expect(pegoutSpy).toHaveBeenNthCalledWith(1, {
      swap: expect.any(pTokensSwap),
      ptokenFrom: from,
      ptokenTo: to,
      dispatch,
    })
    expect(setCustomTransactionsSpy).toHaveBeenCalledTimes(1)
    expect(setCustomTransactionsSpy).toMatchSnapshot()
  })

  it('Should peg-in USDC on Algorand', async () => {
    vi.spyOn(wallets, 'getWallets').mockReturnValue({
      eth: { account: '0xF39d30Fa570db7940e5b3A3e42694665A1449E4B' },
      algorand: { provider: undefined, account: 'VCMJKWOY5P5P7SKMZFFOCEROPJCZOTIJMNIYNUCKH7LRO45JMJP6UYBIJA' },
    })
    const peginWithWalletSpy = vi.spyOn(peginWithWallet, 'default').mockResolvedValue()
    const addDestinationAssetSpy = vi.spyOn(pTokensSwapBuilder.prototype, 'addDestinationAsset')
    const setAmountSpy = vi.spyOn(pTokensSwapBuilder.prototype, 'setAmount')
    const from = assets.find((_el) => _el.id === 'USDC')
    const to = assets.find((_el) => _el.id === 'USDC_ON_ALGORAND_MAINNET')
    const amount = '1000'
    const address = 'VCMJKWOY5P5P7SKMZFFOCEROPJCZOTIJMNIYNUCKH7LRO45JMJP6UYBIJA'
    const f = swap(from, to, amount, address)
    const dispatch = vi.fn()
    await f(dispatch)
    expect(setAmountSpy).toHaveBeenCalledTimes(1)
    expect(setAmountSpy).toHaveBeenNthCalledWith(1, '1000')
    expect(addDestinationAssetSpy).toHaveBeenCalledTimes(1)
    expect(addDestinationAssetSpy).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      '770102986',
      '0x94c44b95c420a8989559d8ebfaffc94cc94ae1122e7a45974d09635186d04a3fd71773a9625fc408000000002c98cbf1c408000000003b9aca00c4080000000001e1ab70c408000000000000000091c420a8989559d8ebfaffc94cc94ae1122e7a45974d09635186d04a3fd71773a9625f9092ce2c98cbf1ce01e1ab70'
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
