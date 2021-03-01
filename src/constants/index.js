// sidebar
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE'
export const SET_COLLAPSE_STATE = 'SET_COLLAPSE_STATE'
export const ENABLE_TESTNET_INSTANCE = 'ENABLE_TESTNET_INSTANCE'
export const SHOW_HIDDEN_PTOKENS = 'SHOW_HIDDEN_PTOKENS'

// log
export const LOG_ITEM_ADDED = 'LOG_ITEM_ADDED'
export const LOG_CLEARED = 'LOG_CLEARED'
export const LOG_ITEMS_WAITING_CLEARED = 'LOG_ITEMS_WAITING_CLEARED'
export const LOG_ITEM_UPDATED = 'LOG_ITEM_UPDATED'
export const LOG_ITEM_ADDED_WITHOUT_DOUBLE_UP = 'LOG_ITEM_ADDED_WITHOUT_DOUBLE_UP'

// PNETWORK
export const PNETWORK_PING_PONG = 'PNETWORK_PING_PONG'
export const PNETWORK_LAST_ISSUER_PROCESSED_BLOCK_LOADED = 'PNETWORK_LAST_ISSUER_PROCESSED_BLOCK_LOADED'
export const PNETWORK_LAST_REDEEMER_PROCESSED_BLOCK_LOADED = 'PNETWORK_LAST_REDEEMER_PROCESSED_BLOCK_LOADED'
export const PNETWORK_BLOCK_SUBMITTED = 'PNETWORK_BLOCK_SUBMITTED'
export const PNETWORK_REPORT_ISSUE_LOADED = 'PNETWORK_REPORT_ISSUE_LOADED'
export const PNETWORK_REPORT_REDEEM_LOADED = 'PNETWORK_REPORT_REDEEM_LOADED'
export const PNETWORK_RESET_REPORTS = 'PNETWORK_RESET_REPORTS'
export const PNETWORK_SELECTED_NODE = 'PNETWORK_SELECTED_NODE'
export const PNETWORK_SELECTED_NODE_MANUALLY = 'PNETWORK_SELECTED_NODE_MANUALLY'
export const PNETWORK_RESET_DATA = 'PNETWORK_RESET_DATA'
export const PNETWORK_SET_ISSUER_BLOCK_HEIGHT_STATUS = 'PNETWORK_SET_ISSUER_BLOCK_HEIGHT_STATUS'
export const PNETWORK_SET_REDEEMER_BLOCK_HEIGHT_STATUS = 'PNETWORK_SET_REDEEMER_BLOCK_HEIGHT_STATUS'
export const PNETWORK_SET_VALIDATORS = 'PNETWORK_SET_VALIDATORS'

// pTokens
export const SET_SELECTED_PTOKEN = 'SET_SELECTED_PTOKEN'
export const PTOKENS_BALANCE_LOADED = 'PTOKEN_BALANCE_LOADED'
export const PTOKENS_ISSUE_SUCCEDEED = 'PTOKENS_ISSUE_SUCCEDEED'
export const PTOKENS_ISSUE_NOT_SUCCEDEED = 'PTOKENS_ISSUE_NOT_SUCCEDEED'
export const PTOKENS_REDEEM_SUCCEDEED = 'PTOKENS_REDEEM_SUCCEDEED'
export const PTOKENS_REDEEM_NOT_SUCCEDEED = 'PTOKENS_REDEEM_NOT_SUCCEDEED'
export const PTOKENS_RESET_ISSUE_SUCCESS = 'PTOKENS_RESET_ISSUE_SUCCESS'
export const PTOKENS_RESET_REDEEM_SUCCESS = 'PTOKENS_RESET_REDEEM_SUCCESS'
export const PTOKENS_RESET_ISSUE_ERROR = 'PTOKENS_RESET_ISSUE_ERROR'
export const PTOKENS_RESET_REDEEM_ERROR = 'PTOKENS_RESET_REDEEM_ERROR'
export const PTOKENS_CIRCULATING_SUPPLY_LOADED ='PTOKENS_CIRCULATING_SUPPLY_LOADED'
export const PTOKENS_SET_DEPOSIT_ADDRESS = 'PTOKENS_SET_DEPOSIT_ADDRESS'
export const PTOKENS_RESET_DEPOSIT_ADDRESS = 'PTOKENS_RESET_DEPOSIT_ADDRESS'
export const PTOKENS_SET_PARAMS = 'PTOKENS_SET_PARAMS'
export const PTOKENS_RESET_PARAMS = 'PTOKENS_RESET_PARAMS'
export const PTOKENS_SET_NODE_INFO = 'PTOKENS_SET_NODE_INFO'
export const PTOKENS_SET_CUSTOM_HOST_RPC = 'PTOKENS_SET_CUSTOM_HOST_RPC'
export const PTOKENS_SET_CUSTOM_NATIVE_RPC = 'PTOKENS_SET_CUSTOM_NATIVE_RPC'

// swap
export const SWAP_DATA_LOADED = 'SWAP_DATA_LOADED'
export const SWAP_BALANCE_LOADED = 'SWAP_BALANCE_LOADED'

// wallets
export const WALLET_ISSUER_CONNECTED = 'WALLET_ISSUER_CONNECTED'
export const WALLET_REDEEMER_CONNECTED = 'WALLET_REDEEMER_CONNECTED'
export const WALLET_ISSUER_NETWORK_CHANGED = 'WALLET_ISSUER_NETWORK_CHANGED'
export const WALLET_REDEEMER_NETWORK_CHANGED = 'WALLET_REDEEMER_NETWORK_CHANGED'
export const WALLET_ISSUER_ACCOUNT_CHANGED = 'WALLET_ISSUER_ACCOUNT_CHANGED'
export const WALLET_REDEEMER_ACCOUNT_CHANGED = 'WALLET_REDEEMER_ACCOUNT_CHANGED'
export const WALLET_RESET_DATA = 'WALLET_RESET_DATA'
export const WALLET_RESET_ISSUER = 'WALLET_RESET_ISSUER'
export const WALLET_RESET_REDEEMER = 'WALLET_RESET_REDEEMER'

export const WALLET_ETH_CONNECTED = 'WALLET_ETH_CONNECTED'
export const WALLET_ETH_NETWORK_CHANGED = 'WALLET_ETH_NETWORK_CHANGED'
export const WALLET_ETH_ACCOUNT_CHANGED = 'WALLET_ETH_ACCOUNT_CHANGED'

//ptokens id
export const PBTC_ON_ETH_MAINNET = 0
export const PBTC_ON_EOS_MAINNET = 1
export const PBTC_ON_TELOS_MAINNET = 2
export const PLTC_ON_ETH_MAINNET = 3
export const PLTC_ON_EOS_MAINNET = 4
export const PETH_ON_EOS_MAINNET = 5
export const PNT_ON_EOS_MAINNET = 6
export const PMKR_ON_EOS_MAINNET = 7
export const PLINK_ON_EOS_MAINNET = 8
export const PYFI_ON_EOS_MAINNET = 9
export const PTERIA_ON_EOS_MAINNET = 10
export const PUNI_ON_EOS_MAINNET = 11
export const PBAND_ON_EOS_MAINNET = 12
export const PBAL_ON_EOS_MAINNET = 13
export const PCOMP_ON_EOS_MAINNET = 14
export const PSNX_ON_EOS_MAINNET = 15
export const POMG_ON_EOS_MAINNET = 16
export const PDAI_ON_EOS_MAINNET = 17
export const PANT_ON_EOS_MAINNET = 18
export const PLRC_ON_EOS_MAINNET = 19
export const PUOS_ON_EOS_MAINNET = 20
export const PBAT_ON_EOS_MAINNET = 21
export const PREP_ON_EOS_MAINNET = 22
export const PZRX_ON_EOS_MAINNET = 23
export const PPNK_ON_EOS_MAINNET = 24
export const PDOGE_ON_ETH_MAINNET = 25
export const PEOS_ON_ETH_MAINNET = 26
export const PBTC_ON_BSC_MAINNET = 28
export const PBTC_ON_XDAI_MAINNET = 29
export const PEOS_ON_POLYGON_MAINNET = 30
export const PBTC_ON_ETH_TESTNET = 31
export const PBTC_ON_EOS_TESTNET = 32
export const PLTC_ON_ETH_TESTNET = 33
