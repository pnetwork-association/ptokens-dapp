// nodes
export const PNETWORK_NODE_V3 = 'https://pnetwork-node-2a.eu.ngrok.io/v3'

export enum AssetId {
  // ptokens id
  PUSDC_ON_GNOSIS_MAINNET = 'PUSDC_ON_GNOSIS_MAINNET',
  PUSDC_ON_POLYGON_MAINNET = 'PUSDC_ON_POLYGON_MAINNET',
  PUSDC_ON_BSC_MAINNET = 'PUSDC_ON_BSC_MAINNET',
  // PUSDC_ON_ARBITRUM_MAINNET = 'PUSDC_ON_ARBITRUM_MAINNET',
  PPNT_ON_GNOSIS_MAINNET = 'PNT_ON_GNOSIS_MAINNET',
  PPNT_ON_POLYGON_MAINNET = 'PNT_ON_POLYGON_MAINNET',
  PPNT_ON_BSC_MAINNET = 'PPNT_ON_BSC_MAINNET',
  // PNT_ON_GOERLI_TESTNET = 'PNT_ON_GOERLI_TESTNET',
  // tokens id
  USDC_ON_POLYGON_MAINNET = 'USDC_ON_POLYGON_MAINNET',
  PNT_ON_BSC_MAINNET = 'PNT_ON_BSC_MAINNET',
  // PNTV2_ON_POLYGON_MAINNET = 'PNTV2_ON_POLYGON_MAINNET',
}

export enum ChainId {
  // chain id
  GNOSIS = 'GNOSIS_MAINNET',
  // ARBITRUM = 'ARBITRUM_MAINNET',
  // BTC = 'BITCOIN',
  BSC = 'BSC-CHAIN_MAINNET',
  ETH = 'ETHEREUM_MAINNET',
  POLYGON = 'POLYGON_MAINNET',
}

export const NO_ADDRESS = 'pTokenAsset has not been found'