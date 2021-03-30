import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_ETH_TESTNET,
  PBTC_ON_TELOS_MAINNET,
  PBTC_ON_EOS_TESTNET,
  PBTC_ON_EOS_MAINNET,
  PLTC_ON_ETH_MAINNET,
  PLTC_ON_ETH_TESTNET,
  PLTC_ON_EOS_MAINNET,
  PETH_ON_EOS_MAINNET,
  PNT_ON_EOS_MAINNET,
  PMKR_ON_EOS_MAINNET,
  PLINK_ON_EOS_MAINNET,
  PYFI_ON_EOS_MAINNET,
  PTERIA_ON_EOS_MAINNET,
  PUNI_ON_EOS_MAINNET,
  PBAL_ON_EOS_MAINNET,
  PBAND_ON_EOS_MAINNET,
  PCOMP_ON_EOS_MAINNET,
  PSNX_ON_EOS_MAINNET,
  POMG_ON_EOS_MAINNET,
  PDAI_ON_EOS_MAINNET,
  PANT_ON_EOS_MAINNET,
  PLRC_ON_EOS_MAINNET,
  PUOS_ON_EOS_MAINNET,
  PBAT_ON_EOS_MAINNET,
  PREP_ON_EOS_MAINNET,
  PZRX_ON_EOS_MAINNET,
  PPNK_ON_EOS_MAINNET,
  PDOGE_ON_ETH_MAINNET,
  PEOS_ON_ETH_MAINNET,
  PBTC_ON_BSC_MAINNET,
  PEOS_ON_POLYGON_MAINNET,
  PBTC_ON_XDAI_MAINNET,
  IQ_ON_ETH_MAINNET,
  TLOS_ON_ETH_MAINNET,
  PNT_ON_BSC_MAINNET,
  POPIUM_ON_BSC_MAINNET,
  PDEFIPLUSPLUS_ON_BSC_MAINNET,
  PTERIA_ON_BSC_MAINNET,
  PBCP_ON_BSC_MAINNET,
  CGG_ON_BSC_MAINNET
} from '../constants'

const getCorresponsingVisibleAddressFormat = (_pToken, _role, _account) => {
  if (!_account) return null

  switch (_pToken.id) {
    case PBTC_ON_ETH_MAINNET: {
      return _role === 'redeemer'
        ? `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
        : `${_account.slice(0, 12)}...${_account.slice(_account.length - 9, _account.length)}`
    }
    case PBTC_ON_ETH_TESTNET: {
      return _role === 'redeemer'
        ? `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
        : `${_account.slice(0, 12)}...${_account.slice(_account.length - 9, _account.length)}`
    }
    case PBTC_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 12)}...${_account.slice(_account.length - 9, _account.length)}`
    }
    case PBTC_ON_TELOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 12)}...${_account.slice(_account.length - 9, _account.length)}`
    }
    case PLTC_ON_ETH_MAINNET: {
      return _role === 'redeemer'
        ? `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
        : `${_account.slice(0, 12)}...${_account.slice(_account.length - 9, _account.length)}`
    }
    case PLTC_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 12)}...${_account.slice(_account.length - 9, _account.length)}`
    }
    case PBTC_ON_EOS_TESTNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 12)}...${_account.slice(_account.length - 9, _account.length)}`
    }
    case PLTC_ON_ETH_TESTNET: {
      return _role === 'redeemer'
        ? `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
        : `${_account.slice(0, 12)}...${_account.slice(_account.length - 9, _account.length)}`
    }
    case PETH_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PYFI_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PMKR_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PLINK_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PNT_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PTERIA_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PUNI_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PBAND_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PBAL_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PCOMP_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PSNX_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case POMG_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PDAI_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PANT_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PLRC_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PUOS_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PBAT_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PREP_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PZRX_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PPNK_ON_EOS_MAINNET: {
      return _role === 'redeemer'
        ? _account
        : `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PDOGE_ON_ETH_MAINNET: {
      return _role === 'redeemer'
        ? `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
        : `${_account.slice(0, 12)}...${_account.slice(_account.length - 9, _account.length)}`
    }
    case PEOS_ON_ETH_MAINNET: {
      return _role === 'redeemer'
        ? `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
        : _account
    }
    case PBTC_ON_BSC_MAINNET: {
      return _role === 'redeemer'
        ? `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
        : `${_account.slice(0, 12)}...${_account.slice(_account.length - 9, _account.length)}`
    }
    case PEOS_ON_POLYGON_MAINNET: {
      return _role === 'redeemer'
        ? `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
        : _account
    }
    case PBTC_ON_XDAI_MAINNET: {
      return _role === 'redeemer'
        ? `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
        : `${_account.slice(0, 12)}...${_account.slice(_account.length - 9, _account.length)}`
    }
    case IQ_ON_ETH_MAINNET: {
      return _role === 'redeemer'
        ? `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
        : _account
    }
    case TLOS_ON_ETH_MAINNET: {
      return _role === 'redeemer'
        ? `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
        : _account
    }
    case PNT_ON_BSC_MAINNET: {
      return `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case POPIUM_ON_BSC_MAINNET: {
      return `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PTERIA_ON_BSC_MAINNET: {
      return `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PDEFIPLUSPLUS_ON_BSC_MAINNET: {
      return `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case PBCP_ON_BSC_MAINNET: {
      return `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    case CGG_ON_BSC_MAINNET: {
      return `${_account.slice(0, 6)}...${_account.slice(_account.length - 4, _account.length)}`
    }
    default:
      break
  }
}

const slicer = _address => `${_address.slice(0, 6)}...${_address.slice(_address.length - 4, _address.length)}`

export { getCorresponsingVisibleAddressFormat, slicer }
