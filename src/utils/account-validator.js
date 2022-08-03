import Web3 from 'web3'
import pTokenUtils from 'ptokens/node_modules/ptokens-utils'
import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_EOS_MAINNET,
  PBTC_ON_XDAI_MAINNET,
  PBTC_ON_BSC_MAINNET,
  PBTC_ON_TELOS_MAINNET,
  PBTC_ON_POLYGON_MAINNET,
  PBTC_ON_ARBITRUM_MAINNET,
  PLTC_ON_ETH_MAINNET,
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
  PEOS_ON_POLYGON_MAINNET,
  IQ_ON_ETH_MAINNET,
  TLOS_ON_ETH_MAINNET,
  PNT_ON_BSC_MAINNET,
  POPIUM_ON_BSC_MAINNET,
  PDEFIPLUSPLUS_ON_BSC_MAINNET,
  PTERIA_ON_BSC_MAINNET,
  PBCP_ON_BSC_MAINNET,
  CGG_ON_BSC_MAINNET,
  PETH_ON_TELOS_MAINNET,
  PLINK_ON_TELOS_MAINNET,
  PNT_ON_TELOS_MAINNET,
  PUSDT_ON_TELOS_MAINNET,
  PUSDC_ON_TELOS_MAINNET,
  PNT_ON_XDAI_MAINNET,
  PRVN_ON_BSC_MAINNET,
  TLOS_ON_BSC_MAINNET,
  POPEN_ON_BSC_MAINNET,
  OCP_ON_ETH_MAINNET,
  ANRX_ON_BSC_MAINNET,
  TFF_ON_POLYGON_MAINNET,
  PSAFEMOON_ON_ETH_MAINNET,
  EFX_ON_BSC_MAINNET,
  PSEEDS_ON_ETH_MAINNET,
  PLBC_ON_BSC_MAINNET,
  USDO_ON_POLYGON_MAINNET,
  GALA_ON_BSC_MAINNET,
  PUOS_ON_ULTRA_MAINNET,
  EFX_ON_ETH_MAINNET,
  ZMT_ON_BSC_MAINNET,
  BIST_ON_BSC_MAINNET,
  PNT_ON_POLYGON_MAINNET,
  PVAI_ON_ETH_MAINNET,
  WSB_ON_ETH_MAINNET,
  PNT_ON_ARBITRUM_MAINNET,
  LUXO_ON_LUXOCHAIN_MAINNET,
  LUXO_ON_BSC_MAINNET,
  PETH_ON_ALGORAND_MAINNET,
  PTET_ON_ALGORAND_MAINNET,
  PKEYS_ON_BSC_MAINNET,
  OATH_ON_ETH_MAINNET,
  PFTM_ON_ETH_MAINNET,
  NUCO_ON_TELOS_MAINNET,
  PBTC_ON_ALGORAND_MAINNET,
  PUSDC_ON_ALGORAND_MAINNET,
  USDC_ON_ALGORAND_MAINNET,
  PUSDT_ON_ALGORAND_MAINNET,
  USDT_ON_ALGORAND_MAINNET,
  ORE_ON_ETH_MAINNET,
  PWOMBAT_ON_EOS_MAINNET
} from '../constants'
import { getReadOnlyProviderByBlockchain } from '../utils/read-only-providers'

const web3 = new Web3()

const isValidAccount = async (_pTokenId, _account, _type) => {
  if (_account === '') return false

  // const pTokenId = _pTokenId.includes('_DEFAULT') ? _pTokenId.split('_DEFAULT')[0] : _pTokenId

  switch (_pTokenId) {
    case PBTC_ON_ETH_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.btc.isValidAddress(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PBTC_ON_EOS_MAINNET: {
      return _type === 'pegin' ? pTokenUtils.btc.isValidAddress(_account) : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PBTC_ON_TELOS_MAINNET: {
      return _type === 'pegin' ? pTokenUtils.btc.isValidAddress(_account) : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PBTC_ON_ARBITRUM_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.btc.isValidAddress(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PLTC_ON_EOS_MAINNET: {
      return _type === 'pegin' ? pTokenUtils.ltc.isValidAddress(_account) : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PLTC_ON_ETH_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.ltc.isValidAddress(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PETH_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PNT_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PLINK_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PMKR_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PYFI_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PTERIA_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PUNI_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PBAND_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PBAL_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PCOMP_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PSNX_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case POMG_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PDAI_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PANT_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PLRC_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PUOS_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PBAT_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PREP_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PZRX_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PPNK_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PDOGE_ON_ETH_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.doge.isValidAddress(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PEOS_ON_ETH_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.eos.isValidAccountName(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PBTC_ON_BSC_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.btc.isValidAddress(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PEOS_ON_POLYGON_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.eos.isValidAccountName(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PBTC_ON_XDAI_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.btc.isValidAddress(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case IQ_ON_ETH_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.eos.isValidAccountName(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case TLOS_ON_ETH_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.eos.isValidAccountName(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PNT_ON_BSC_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case POPIUM_ON_BSC_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PTERIA_ON_BSC_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PDEFIPLUSPLUS_ON_BSC_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PBCP_ON_BSC_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case CGG_ON_BSC_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PETH_ON_TELOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PLINK_ON_TELOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PNT_ON_TELOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PUSDT_ON_TELOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PUSDC_ON_TELOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PNT_ON_XDAI_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PRVN_ON_BSC_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.rvn.isValidAddress(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case TLOS_ON_BSC_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.eos.isValidAccountName(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case POPEN_ON_BSC_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case OCP_ON_ETH_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case ANRX_ON_BSC_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PBTC_ON_POLYGON_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.btc.isValidAddress(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case TFF_ON_POLYGON_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PSAFEMOON_ON_ETH_MAINNET: {
      web3.setProvider(getReadOnlyProviderByBlockchain(_type === 'pegin' ? 'BSC' : 'ETH'))
      try {
        return (
          web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account)) && (await web3.eth.getCode(_account)) === '0x'
        )
      } catch (_err) {
        return false
      }
    }
    case EFX_ON_BSC_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.eos.isValidAccountName(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PSEEDS_ON_ETH_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.eos.isValidAccountName(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PLBC_ON_BSC_MAINNET: {
      return _type === 'pegin' ? true : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case USDO_ON_POLYGON_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case GALA_ON_BSC_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PUOS_ON_ULTRA_MAINNET: {
      if (_type === 'pegin') {
        return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
      }

      const rpc = getReadOnlyProviderByBlockchain('ULTRA')
      return new Promise(_resolve => {
        rpc
          .get_account(_account)
          .then(_res => {
            _resolve(!_res ? false : true)
          })
          .catch(() => {
            _resolve(false)
          })
      })
    }
    case EFX_ON_ETH_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.eos.isValidAccountName(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case ZMT_ON_BSC_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case BIST_ON_BSC_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PNT_ON_POLYGON_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PVAI_ON_ETH_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case WSB_ON_ETH_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PNT_ON_ARBITRUM_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case LUXO_ON_LUXOCHAIN_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case LUXO_ON_BSC_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PETH_ON_ALGORAND_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.algo.isValidAddress(_account)
    }
    case PTET_ON_ALGORAND_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.algo.isValidAddress(_account)
    }
    case PKEYS_ON_BSC_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case OATH_ON_ETH_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PFTM_ON_ETH_MAINNET: {
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case NUCO_ON_TELOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    case PBTC_ON_ALGORAND_MAINNET: {
      return _type === 'pegin' ? pTokenUtils.btc.isValidAddress(_account) : pTokenUtils.algo.isValidAddress(_account)
    }
    case PUSDC_ON_ALGORAND_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.algo.isValidAddress(_account)
    }
    case USDC_ON_ALGORAND_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.algo.isValidAddress(_account)
    }
    case PUSDT_ON_ALGORAND_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.algo.isValidAddress(_account)
    }
    case USDT_ON_ALGORAND_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.algo.isValidAddress(_account)
    }
    case ORE_ON_ETH_MAINNET: {
      return _type === 'pegin'
        ? pTokenUtils.eos.isValidAccountName(_account)
        : web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    }
    case PWOMBAT_ON_EOS_MAINNET: {
      return _type === 'pegin'
        ? web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
        : pTokenUtils.eos.isValidAccountName(_account)
    }
    default:
      break
  }
}

const isValidAccountByBlockchain = (_account, _blockchain) => {
  if (!_account) return false
  switch (_blockchain) {
    case 'ETH':
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    case 'XDAI':
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    case 'POLIYGON':
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    case 'BSC':
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    case 'ARBITRUM':
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    case 'LUXOCHAIN':
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    case 'TELOS':
      return pTokenUtils.eos.isValidAccountName(_account)
    case 'EOS':
      return pTokenUtils.eos.isValidAccountName(_account)
    case 'ULTRA':
      return pTokenUtils.eos.isValidAccountName(_account)
    case 'ALGORAND':
      return pTokenUtils.algo.isValidAddress(_account)
    case 'FTM':
      return web3.utils.isAddress(pTokenUtils.eth.addHexPrefix(_account))
    case 'ORE':
      return pTokenUtils.eos.isValidAccountName(_account)
    default:
      return false
  }
}

export { isValidAccount, isValidAccountByBlockchain }
