import { test, describe, expect } from 'vitest'

import generateRpcSettings from '../utils'

describe('generateRpcSettings', () => {
  test('Should generate a setting object for https://www.npmjs.com/package/react-web3-settings', () => {
    const settings = {
      eos: {
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        host: 'https://eos.greymass.com',
        port: 443,
        protocol: 'https',
        endpoint: 'https://eos.greymass.com',
        label: 'Eos',
      },
      ftm: {
        endpoint: 'https://rpc.ftm.tools/',
        chainId: 250,
        label: 'Ftm',
      },
    }
    const expected = {
      eos: {
        label: 'Eos',
        value: 'https://eos.greymass.com',
      },
      ftm: {
        label: 'Ftm',
        value: 'https://rpc.ftm.tools/',
      },
    }
    const res = generateRpcSettings(settings)
    expect(res).toStrictEqual(expected)
  })
})
