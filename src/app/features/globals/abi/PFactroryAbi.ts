export const ptokenAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'pTokenAddress',
        type: 'address',
      },
    ],
    name: 'PTokenDeployed',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'underlyingAssetName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'underlyingAssetSymbol',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'underlyingAssetDecimals',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'underlyingAssetTokenAddress',
        type: 'address',
      },
      {
        internalType: 'bytes4',
        name: 'underlyingAssetNetworkId',
        type: 'bytes4',
      },
    ],
    name: 'deploy',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'underlyingAssetName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'underlyingAssetSymbol',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'underlyingAssetDecimals',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'underlyingAssetTokenAddress',
        type: 'address',
      },
      {
        internalType: 'bytes4',
        name: 'underlyingAssetNetworkId',
        type: 'bytes4',
      },
    ],
    name: 'getBytecode',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'underlyingAssetName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'underlyingAssetSymbol',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'underlyingAssetDecimals',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'underlyingAssetTokenAddress',
        type: 'address',
      },
      {
        internalType: 'bytes4',
        name: 'underlyingAssetNetworkId',
        type: 'bytes4',
      },
    ],
    name: 'getPTokenAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'hub',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'hub_',
        type: 'address',
      },
    ],
    name: 'setHub',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const