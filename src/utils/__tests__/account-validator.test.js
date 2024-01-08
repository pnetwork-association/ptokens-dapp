import { validators } from 'ptokens-helpers'
import { test, describe, expect, vi } from 'vitest'

import { isValidAccountByBlockchain } from '../account-validator'

describe('isValidAccountByBlockchain', () => {
  beforeAll(() => {
    vi.mock('ptokens-helpers', async () => {
      const actual = await vi.importActual('ptokens-helpers')
      return {
        ...actual,
        validators: { isValidAddressByChainId: vi.fn() },
      }
    })
  })

  beforeEach(() => {
    vi.resetAllMocks()
  })

  test.each`
    account        | blockchain     | expectedChainId | expectedAccount
    ${`account`}   | ${'ETH'}       | ${'0x005fe7f9'} | ${'0xaccount'}
    ${`0xaccount`} | ${'ETH'}       | ${'0x005fe7f9'} | ${'0xaccount'}
    ${`account`}   | ${'GNOSIS'}    | ${'0x00f1918e'} | ${'0xaccount'}
    ${`account`}   | ${'POLYGON'}   | ${'0x0075dd4c'} | ${'0xaccount'}
    ${`account`}   | ${'BSC'}       | ${'0x00e4b170'} | ${'0xaccount'}
    ${`account`}   | ${'ARBITRUM'}  | ${'0x00ce98c4'} | ${'0xaccount'}
    ${`account`}   | ${'LUXOCHAIN'} | ${'0x00d5beb0'} | ${'0xaccount'}
    ${`account`}   | ${'TELOS'}     | ${'0x028c7109'} | ${'account'}
    ${`account`}   | ${'LIBRE'}     | ${'0x026776fa'} | ${'account'}
    ${`account`}   | ${'EOS'}       | ${'0x02e7261c'} | ${'account'}
    ${`account`}   | ${'ULTRA'}     | ${'0x02f9337d'} | ${'account'}
    ${`account`}   | ${'ALGORAND'}  | ${'0x03c38e67'} | ${'account'}
    ${`account`}   | ${'FTM'}       | ${'0x0022af98'} | ${'0xaccount'}
    ${`account`}   | ${'BTC'}       | ${'0x01ec97de'} | ${'account'}
    ${`account`}   | ${'LTC'}       | ${'0x01840435'} | ${'account'}
  `(
    'Should call isValidAccountByBlockchain with correct parameters for $blockchain',
    ({ account, blockchain, expectedChainId, expectedAccount }) => {
      isValidAccountByBlockchain(account, blockchain)
      expect(validators.isValidAddressByChainId).toHaveBeenCalledTimes(1)
      expect(validators.isValidAddressByChainId).toHaveBeenNthCalledWith(1, expectedAccount, expectedChainId)
    }
  )
})
