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
export const SHOW_DEPOSIT_ADDRESS_MODAL = 'SHOW_DEPOSIT_ADDRESS_MODAL'
export const HIDE_DEPOSIT_ADDRESS_MODAL = 'HIDE_DEPOSIT_ADDRESS_MODAL'
export const PROGRESS_UPDATED = 'PROGRESS_UPDATED'
export const PROGRESS_RESET = 'PROGRESS_RESET'

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
export const WALLET_BSC_CONNECTED = 'WALLET_BSC_CONNECTED'
export const WALLET_BSC_NETWORK_CHANGED = 'WALLET_BSC_CONNECTED'
export const WALLET_BSC_ACCOUNT_CHANGED = 'WALLET_BSC_CONNECTED'
export const WALLET_POLYGON_CONNECTED = 'WALLET_POLYGON_CONNECTED'
export const WALLET_POLYGON_NETWORK_CHANGED = 'WALLET_POLYGON_NETWORK_CHANGED'
export const WALLET_POLYGON_ACCOUNT_CHANGED = 'WALLET_POLYGON_ACCOUNT_CHANGED'
export const WALLET_XDAI_CONNECTED = 'WALLET_XDAI_CONNECTED'
export const WALLET_XDAI_NETWORK_CHANGED = 'WALLET_XDAI_NETWORK_CHANGED'
export const WALLET_XDAI_ACCOUNT_CHANGED = 'WALLET_XDAI_ACCOUNT_CHANGED'
export const WALLET_EOS_CONNECTED = 'WALLET_EOS_CONNECTED'
export const WALLET_TELOS_CONNECTED = 'WALLET_TELOS_CONNECTED'

//ptokens id
export const PBTC_ON_ETH_MAINNET = 'PBTC_ON_ETH_MAINNET'
export const PBTC_ON_EOS_MAINNET = 'PBTC_ON_EOS_MAINNET'
export const PBTC_ON_TELOS_MAINNET = 'PBTC_ON_TELOS_MAINNET'
export const PLTC_ON_ETH_MAINNET = 'PLTC_ON_ETH_MAINNET'
export const PLTC_ON_EOS_MAINNET = 'PLTC_ON_EOS_MAINNET'
export const PETH_ON_EOS_MAINNET = 'PETH_ON_EOS_MAINNET'
export const PNT_ON_EOS_MAINNET = 'PNT_ON_EOS_MAINNET'
export const PMKR_ON_EOS_MAINNET = 'PMKR_ON_EOS_MAINNET'
export const PLINK_ON_EOS_MAINNET = 'PLINK_ON_EOS_MAINNET'
export const PYFI_ON_EOS_MAINNET = 'PYFI_ON_EOS_MAINNET'
export const PTERIA_ON_EOS_MAINNET = 'PTERIA_ON_EOS_MAINNET'
export const PUNI_ON_EOS_MAINNET = 'PUNI_ON_EOS_MAINNET'
export const PBAND_ON_EOS_MAINNET = 'PBAND_ON_EOS_MAINNET'
export const PBAL_ON_EOS_MAINNET = 'PBAL_ON_EOS_MAINNET'
export const PCOMP_ON_EOS_MAINNET = 'PCOMP_ON_EOS_MAINNET'
export const PSNX_ON_EOS_MAINNET = 'PSNX_ON_EOS_MAINNET'
export const POMG_ON_EOS_MAINNET = 'POMG_ON_EOS_MAINNET'
export const PDAI_ON_EOS_MAINNET = 'PDAI_ON_EOS_MAINNET'
export const PANT_ON_EOS_MAINNET = 'PANT_ON_EOS_MAINNET'
export const PLRC_ON_EOS_MAINNET = 'PLRC_ON_EOS_MAINNET'
export const PUOS_ON_EOS_MAINNET = 'PUOS_ON_EOS_MAINNET'
export const PBAT_ON_EOS_MAINNET = 'PBAT_ON_EOS_MAINNET'
export const PREP_ON_EOS_MAINNET = 'PREP_ON_EOS_MAINNET'
export const PZRX_ON_EOS_MAINNET = 'PZRX_ON_EOS_MAINNET'
export const PPNK_ON_EOS_MAINNET = 'PPNK_ON_EOS_MAINNET'
export const PDOGE_ON_ETH_MAINNET = 'PDOGE_ON_ETH_MAINNET'
export const PEOS_ON_ETH_MAINNET = 'PEOS_ON_ETH_MAINNET'
export const PBTC_ON_BSC_MAINNET = 'PBTC_ON_BSC_MAINNET'
export const PBTC_ON_XDAI_MAINNET = 'PBTC_ON_XDAI_MAINNET'
export const PEOS_ON_POLYGON_MAINNET = 'PEOS_ON_POLYGON_MAINNET'
export const PBTC_ON_ETH_TESTNET = 'PBTC_ON_ETH_TESTNET'
export const PBTC_ON_EOS_TESTNET = 'PBTC_ON_EOS_TESTNET'
export const PLTC_ON_ETH_TESTNET = 'PLTC_ON_ETH_TESTNET'
