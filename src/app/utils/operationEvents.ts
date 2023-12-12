export default [
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'originBlockHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'originTransactionHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'optionsMask',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'underlyingAssetDecimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'assetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'userDataProtocolFeeAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'networkFeeAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'forwardNetworkFeeAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'underlyingAssetTokenAddress',
            type: 'address',
          },
          {
            internalType: 'bytes4',
            name: 'originNetworkId',
            type: 'bytes4',
          },
          {
            internalType: 'bytes4',
            name: 'destinationNetworkId',
            type: 'bytes4',
          },
          {
            internalType: 'bytes4',
            name: 'forwardDestinationNetworkId',
            type: 'bytes4',
          },
          {
            internalType: 'bytes4',
            name: 'underlyingAssetNetworkId',
            type: 'bytes4',
          },
          {
            internalType: 'string',
            name: 'originAccount',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'destinationAccount',
            type: 'string',
          },
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
            internalType: 'bytes',
            name: 'userData',
            type: 'bytes',
          },
          {
            internalType: 'bool',
            name: 'isForProtocol',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct IPNetworkHub.Operation',
        name: 'operation',
        type: 'tuple',
      },
    ],
    name: 'OperationExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'originBlockHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'originTransactionHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'optionsMask',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'underlyingAssetDecimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'assetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'userDataProtocolFeeAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'networkFeeAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'forwardNetworkFeeAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'underlyingAssetTokenAddress',
            type: 'address',
          },
          {
            internalType: 'bytes4',
            name: 'originNetworkId',
            type: 'bytes4',
          },
          {
            internalType: 'bytes4',
            name: 'destinationNetworkId',
            type: 'bytes4',
          },
          {
            internalType: 'bytes4',
            name: 'forwardDestinationNetworkId',
            type: 'bytes4',
          },
          {
            internalType: 'bytes4',
            name: 'underlyingAssetNetworkId',
            type: 'bytes4',
          },
          {
            internalType: 'string',
            name: 'originAccount',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'destinationAccount',
            type: 'string',
          },
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
            internalType: 'bytes',
            name: 'userData',
            type: 'bytes',
          },
          {
            internalType: 'bool',
            name: 'isForProtocol',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct IPNetworkHub.Operation',
        name: 'operation',
        type: 'tuple',
      },
    ],
    name: 'OperationQueued',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'originAccount',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'destinationAccount',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'destinationNetworkId',
        type: 'bytes4',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'underlyingAssetName',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'underlyingAssetSymbol',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'underlyingAssetDecimals',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'underlyingAssetTokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'underlyingAssetNetworkId',
        type: 'bytes4',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'assetTokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assetAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'userDataProtocolFeeAssetAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'networkFeeAssetAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'forwardNetworkFeeAssetAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'forwardDestinationNetworkId',
        type: 'bytes4',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'userData',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'optionsMask',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isForProtocol',
        type: 'bool',
      },
    ],
    name: 'UserOperation',
    type: 'event',
  },
] as const