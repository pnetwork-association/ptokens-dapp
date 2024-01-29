import { pTokensNode, pTokensNodeProvider } from 'ptokens'

import { PNETWORK_NODE_V3 } from '../../constants'
import { createEthPntAsset } from '../ptokens'

describe('createEthPntAsset', () => {
  test('Should create a ethPnt pTokenAsset', async () => {
    const ethPnt = await createEthPntAsset()
    const assetInfo = ethPnt.assetInfo

    const expectedProvider = new pTokensNodeProvider(PNETWORK_NODE_V3)
    const expectedNode = new pTokensNode(expectedProvider)

    const expectedFees = {
      networkFee: 0,
      networkFeeUsd: 15,
      minNodeOperatorFee: 0,
      minNodeOperatorFeeUsd: 0,
      basisPoints: {
        nativeToHost: 10,
        nativeToNative: 25,
      },
    }
    const expectedAssetInfo = {
      chainId: '0x005fe7f9',
      isNative: true,
      tokenAddress: '0xf4eA6B892853413bD9d9f1a5D3a620A0ba39c5b2',
      tokenReference: '0xeeef86a5598a48c568cca576d9e0c15c370b50a0',
      identity: '341aa660fd5c280f5a9501e3822bb4a98e816d1b',
      tokenDecimals: 18,
      decimals: 18,
      vaultAddress: 'e396757ec7e6ac7c8e5abe7285dde47b98f22db8',
      fees: expectedFees,
    }
    expect(assetInfo).toEqual(expectedAssetInfo)
    expect(ethPnt.node).toEqual(expectedNode)
    expect(ethPnt.symbol).toEqual('ethPNT')
    expect(ethPnt.chainId).toEqual('0x005fe7f9')
  })
})
