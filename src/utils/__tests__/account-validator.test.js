import { validators } from '@p.network/ptokens-helpers'
import { test, describe, expect, vi } from 'vitest'

import { isValidAccountByBlockchain, isSmartContract } from '../account-validator'

const mockGetCode = vi.fn()
const mockWeb3Instance = {
  eth: {
    getCode: mockGetCode,
  },
}

describe('isValidAccountByBlockchain', () => {
  beforeAll(() => {
    vi.mock('@p.network/ptokens-helpers', async () => {
      const actual = await vi.importActual('@p.network/ptokens-helpers')
      return {
        ...actual,
        validators: { isValidAddressByChainId: vi.fn() },
      }
    })
  })

  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('Should return true if address is a smart contract', async () => {
    const expectedCode = '0x1234'
    mockGetCode.mockResolvedValue(expectedCode)

    const passed = await isSmartContract('0xb794f5ea0ba39494ce839613fffba74279579268', mockWeb3Instance)
    expect(passed).toBeTruthy()
  })

  test('Should return false if address is a not smart contract', async () => {
    const expectedCode = '0x'
    mockGetCode.mockResolvedValue(expectedCode)

    const passed = await isSmartContract('0xb794f5ea0ba39494ce839613fffba74279579268', mockWeb3Instance)
    expect(passed).toBeFalsy()
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
