// nodes
export const PNETWORK_NODE_V3 = 'https://pnetwork-node-2a.eu.ngrok.io/v3'

// ptokens id
export enum PTokenId {
  PUSDC_ON_XDAI_MAINNET,
  PUSDC_ON_ARBITRUM_MAINNET,
}

// tokens id
export enum TokenId {
  USDC_ON_XDAI,
}

export type AssetId = PTokenId | TokenId
