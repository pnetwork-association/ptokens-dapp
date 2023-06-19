import { test, describe, expect, vi } from 'vitest'
import { isValidAccountByBlockchain } from '../account-validator'
import { validators } from 'ptokens-helpers'
import { Blockchain } from '../../constants'

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
    account        | blockchain              | expectedChainId | expectedAccount
    ${`account`}   | ${Blockchain.Ethereum}  | ${'0x005fe7f9'} | ${'0xaccount'}
    ${`0xaccount`} | ${Blockchain.Ethereum}  | ${'0x005fe7f9'} | ${'0xaccount'}
    ${`account`}   | ${Blockchain.XDAI}      | ${'0x00f1918e'} | ${'0xaccount'}
    ${`account`}   | ${Blockchain.Polygon}   | ${'0x0075dd4c'} | ${'0xaccount'}
    ${`account`}   | ${Blockchain.BSC}       | ${'0x00e4b170'} | ${'0xaccount'}
    ${`account`}   | ${Blockchain.Arbitrum}  | ${'0x00ce98c4'} | ${'0xaccount'}
    ${`account`}   | ${Blockchain.Luxochain} | ${'0x00d5beb0'} | ${'0xaccount'}
    ${`account`}   | ${Blockchain.Telos}     | ${'0x028c7109'} | ${'account'}
    ${`account`}   | ${Blockchain.Libre}     | ${'0x026776fa'} | ${'account'}
    ${`account`}   | ${Blockchain.EOS}       | ${'0x02e7261c'} | ${'account'}
    ${`account`}   | ${Blockchain.Ultra}     | ${'0x02f9337d'} | ${'account'}
    ${`account`}   | ${Blockchain.Algorand}  | ${'0x03c38e67'} | ${'account'}
    ${`account`}   | ${Blockchain.Fantom}    | ${'0x0022af98'} | ${'0xaccount'}
    ${`account`}   | ${Blockchain.Ore}       | ${'0x02e7261c'} | ${'account'}
    ${`account`}   | ${Blockchain.Bitcoin}   | ${'0x01ec97de'} | ${'account'}
    ${`account`}   | ${Blockchain.Litecoin}  | ${'0x01840435'} | ${'account'}
  `(
    'Should call isValidAccountByBlockchain with correct parameters for $blockchain',
    ({ account, blockchain, expectedChainId, expectedAccount }) => {
      isValidAccountByBlockchain(account, blockchain)
      expect(validators.isValidAddressByChainId).toHaveBeenCalledTimes(1)
      expect(validators.isValidAddressByChainId).toHaveBeenNthCalledWith(1, expectedAccount, expectedChainId)
    }
  )
})
