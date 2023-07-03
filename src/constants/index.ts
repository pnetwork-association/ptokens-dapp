// nodes
export const PNETWORK_NODE_V3 = 'https://pnetwork-node-2a.eu.ngrok.io/v3'

// pages
export const PAGE_SELECTED = 'PAGE_SELECTED'
export const ENABLE_TESTNET_INSTANCE = 'ENABLE_TESTNET_INSTANCE'
export const SHOW_HIDDEN_PTOKENS = 'SHOW_HIDDEN_PTOKENS'
export const SET_LOADING = 'SET_LOADING'
export const SET_THEME = 'SET_THEME'
export const UPDATE_INFO_MODAL = 'UPDATE_INFO_MODAL'

// swap
export const ASSETS_LOADED = 'ASSETS_LOADED'
export const SWAP_BALANCE_LOADED = 'SWAP_BALANCE_LOADED'
export const PROGRESS_UPDATED = 'PROGRESS_UPDATED'
export const PROGRESS_RESET = 'PROGRESS_RESET'
export const UPDATE_SWAP_BUTTON = 'UPDATE_SWAP_BUTTON'

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
