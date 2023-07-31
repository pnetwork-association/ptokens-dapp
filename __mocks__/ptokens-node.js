const supported = {
  btc: [
    {
      chainId: '0x03c38e67',
      isNative: false,
      vaultAddress: null,
      identity: 'XXMOLMZYB5SMKNZP4PN4FRR5EX64BJURDZDYSQULMXS5SB354SDLBZX6HI',
      tokenReference: '0x187ea9db7e983904ec22d7029249769c63dc2e58',
      tokenAddress: '744665252',
      tokenDecimals: 8,
      fees: {
        networkFee: 0,
        networkFeeUsd: 0,
        basisPoints: {
          hostToHost: 10,
          hostToNative: 25,
        },
        minNodeOperatorFee: 359066427289000,
        minNodeOperatorFeeUsd: 10,
      },
    },
    {
      chainId: '0x026776fa',
      isNative: false,
      vaultAddress: null,
      identity: 'Not set!',
      tokenReference: '187ea9db7e983904ec22d7029249769c63dc2e58',
      tokenAddress: 'btc.ptokens',
      tokenDecimals: 9,
      fees: {
        networkFee: 0,
        networkFeeUsd: 0,
        basisPoints: {
          hostToHost: 10,
          hostToNative: 25,
        },
        minNodeOperatorFee: 359066427289000,
        minNodeOperatorFeeUsd: 10,
      },
    },
    {
      chainId: '0x005fe7f9',
      isNative: false,
      vaultAddress: null,
      identity: '0e3bde3d39ded57813f0d0727e574d16d675938b',
      tokenReference: '0x187ea9db7e983904ec22d7029249769c63dc2e58',
      tokenAddress: '0x62199b909fb8b8cf870f97bef2ce6783493c4908',
      tokenDecimals: 18,
      fees: {
        networkFee: 359066427289000,
        networkFeeUsd: 10,
        basisPoints: {
          hostToHost: 10,
          hostToNative: 25,
        },
        minNodeOperatorFee: 359066427289000,
        minNodeOperatorFeeUsd: 10,
      },
    },
    {
      chainId: '0x00e4b170',
      isNative: false,
      vaultAddress: null,
      identity: '09ea6dc5c0791d19176b91e23047249b87c3e721',
      tokenReference: '0x187ea9db7e983904ec22d7029249769c63dc2e58',
      tokenAddress: '0x1003d3574ac79303a5fa0951ecb04cc7acba9747',
      tokenDecimals: 18,
      fees: {
        networkFee: 17953321364450,
        networkFeeUsd: 0.5,
        basisPoints: {
          hostToHost: 10,
          hostToNative: 25,
        },
        minNodeOperatorFee: 359066427289000,
        minNodeOperatorFeeUsd: 10,
      },
    },
    {
      chainId: '0x01ec97de',
      isNative: true,
      vaultAddress: null,
      identity: null,
      tokenReference: '187ea9db7e983904ec22d7029249769c63dc2e58',
      tokenAddress: '02b4193f639cf3955cffa9b82f06f7d682f7432dfc4ece1f3cbdfbaea5929fdb52',
      tokenDecimals: 8,
      fees: {
        networkFee: 179533213644500,
        networkFeeUsd: 5,
        basisPoints: {
          nativeToHost: 10,
          nativeToNative: 25,
        },
        minNodeOperatorFee: 359066427289000,
        minNodeOperatorFeeUsd: 10,
      },
    },
  ],
  tlos: [
    {
      chainId: '0x028c7109',
      isNative: true,
      vaultAddress: 'x.ptokens',
      identity: 'x.ptokens',
      tokenReference: '6ad75d3b9875fbbe59f75f7559dc8fe14d6e748f',
      tokenAddress: 'eosio.token',
      tokenDecimals: 4,
      fees: {
        networkFee: 0,
        networkFeeUsd: 0,
        basisPoints: {
          nativeToHost: 10,
          nativeToNative: 25,
        },
        minNodeOperatorFee: 55865921787709506000,
        minNodeOperatorFeeUsd: 10,
      },
    },
    {
      chainId: '0x00e4b170',
      isNative: false,
      vaultAddress: null,
      identity: '09ea6dc5c0791d19176b91e23047249b87c3e721',
      tokenReference: '0x6ad75d3b9875fbbe59f75f7559dc8fe14d6e748f',
      tokenAddress: '0xb6c53431608e626ac81a9776ac3e999c5556717c',
      tokenDecimals: 18,
      fees: {
        networkFee: 2793296089385475000,
        networkFeeUsd: 0.5,
        basisPoints: {
          hostToHost: 10,
          hostToNative: 25,
        },
        minNodeOperatorFee: 55865921787709506000,
        minNodeOperatorFeeUsd: 10,
      },
    },
  ],
  uos: [
    {
      chainId: '0x02f9337d',
      isNative: false,
      vaultAddress: null,
      identity: 'Not set!',
      tokenReference: '3d11357b782a6c8fab6075545e162b4835c3517d',
      tokenAddress: 'uos1ptokens1',
      tokenDecimals: 8,
      fees: {
        networkFee: 0,
        networkFeeUsd: 0,
        basisPoints: {
          hostToHost: 0,
          hostToNative: 0,
        },
        minNodeOperatorFee: 0,
        minNodeOperatorFeeUsd: 0,
      },
    },
    {
      chainId: '0x005fe7f9',
      isNative: true,
      vaultAddress: 'e396757ec7e6ac7c8e5abe7285dde47b98f22db8',
      identity: '341aa660fd5c280f5a9501e3822bb4a98e816d1b',
      tokenReference: '0x3d11357b782a6c8fab6075545e162b4835c3517d',
      tokenAddress: '0xd13c7342e1ef687c5ad21b27c2b65d772cab5c8c',
      tokenDecimals: 4,
      fees: {
        networkFee: 0,
        networkFeeUsd: 10,
        basisPoints: {
          nativeToHost: 0,
          nativeToNative: 0,
        },
        minNodeOperatorFee: 0,
        minNodeOperatorFeeUsd: 0,
      },
    },
  ],
  zmt: [
    {
      chainId: '0x005fe7f9',
      isNative: true,
      vaultAddress: 'e396757ec7e6ac7c8e5abe7285dde47b98f22db8',
      identity: '341aa660fd5c280f5a9501e3822bb4a98e816d1b',
      tokenReference: '0xf1f58f2472d0b5307cac57d4334f24ede7ff9eb4',
      tokenAddress: '0xaa602de53347579f86b996d2add74bb6f79462b2',
      tokenDecimals: 18,
      fees: {
        networkFee: 292483182217022540000,
        networkFeeUsd: 10,
        basisPoints: {
          nativeToHost: 10,
          nativeToNative: 25,
        },
        minNodeOperatorFee: 292483182217022540000,
        minNodeOperatorFeeUsd: 10,
      },
    },
    {
      chainId: '0x00e4b170',
      isNative: false,
      vaultAddress: null,
      identity: '09ea6dc5c0791d19176b91e23047249b87c3e721',
      tokenReference: '0xf1f58f2472d0b5307cac57d4334f24ede7ff9eb4',
      tokenAddress: '0xde960267b9aabfb5404d9a566c1ed6db9db09522',
      tokenDecimals: 18,
      fees: {
        networkFee: 14624159110851127000,
        networkFeeUsd: 0.5,
        basisPoints: {
          hostToHost: 10,
          hostToNative: 25,
        },
        minNodeOperatorFee: 292483182217022540000,
        minNodeOperatorFeeUsd: 10,
      },
    },
  ],
  usdc: [
    {
      chainId: '0x03c38e67',
      isNative: false,
      vaultAddress: null,
      identity: 'XXMOLMZYB5SMKNZP4PN4FRR5EX64BJURDZDYSQULMXS5SB354SDLBZX6HI',
      tokenReference: '0xc8bb450f6c03e38ff83e01bc46fc2d24cb270f16',
      tokenAddress: '748211185',
      tokenDecimals: 6,
      fees: {
        networkFee: 0,
        networkFeeUsd: 0,
        basisPoints: {
          hostToHost: 10,
          hostToNative: 25,
        },
        minNodeOperatorFee: 1e19,
        minNodeOperatorFeeUsd: 10,
      },
    },
    {
      chainId: '0x005fe7f9',
      isNative: true,
      vaultAddress: 'e396757ec7e6ac7c8e5abe7285dde47b98f22db8',
      identity: '341aa660fd5c280f5a9501e3822bb4a98e816d1b',
      tokenReference: '0xc8bb450f6c03e38ff83e01bc46fc2d24cb270f16',
      tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      tokenDecimals: 6,
      fees: {
        networkFee: 1e19,
        networkFeeUsd: 10,
        basisPoints: {
          nativeToHost: 10,
          nativeToNative: 25,
        },
        minNodeOperatorFee: 1e19,
        minNodeOperatorFeeUsd: 10,
      },
    },
  ],
}

export { pTokensNode } from 'ptokens-node'

export class pTokensNodeProvider {
  sendRpcRequest(_reqId, _method, _params) {
    if (_method === 'node_getSupportedChainsByAsset') {
      if (_params[0].toLowerCase().endsWith('btc')) {
        return Promise.resolve(supported.btc)
      } else if (_params[0].toLowerCase().endsWith('tlos')) {
        return Promise.resolve(supported.tlos)
      } else if (_params[0].toLowerCase().endsWith('uos')) {
        return Promise.resolve(supported.uos)
      } else if (_params[0].toLowerCase().endsWith('zmt')) {
        return Promise.resolve(supported.zmt)
      } else if (_params[0].toLowerCase().endsWith('usdc')) {
        return Promise.resolve(supported.usdc)
      }
    }
  }
}
