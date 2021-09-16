import {
  PBTC_ON_ETH_MAINNET,
  PBTC_ON_TELOS_MAINNET,
  PBTC_ON_EOS_MAINNET,
  PBTC_ON_BSC_MAINNET,
  PBTC_ON_XDAI_MAINNET,
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
  PTERIA_ON_BSC_MAINNET,
  PDEFIPLUSPLUS_ON_BSC_MAINNET,
  CGG_ON_BSC_MAINNET,
  PBCP_ON_BSC_MAINNET,
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
  PUOS_ON_ULTRA_MAINNET
} from '../constants'
import { constants } from 'ptokens-utils'
import settings from '../settings'

const getConfigs = (_pTokenId, _configs) => {
  const {
    ethProvider,
    eosSignatureProvider,
    telosSignatureProvider,
    polygonProvider,
    xdaiProvider,
    bscProvider,
    ultraSignatureProvider,
    arbitrumProvider
  } = _configs
  const { networks, blockchains, pTokens } = constants

  if (_pTokenId === PBTC_ON_ETH_MAINNET) {
    return {
      pbtc: {
        network: networks.Mainnet,
        blockchain: blockchains.Ethereum,
        ethProvider
      }
    }
  }
  if (_pTokenId === PBTC_ON_EOS_MAINNET) {
    return {
      pbtc: {
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PBTC_ON_TELOS_MAINNET) {
    return {
      pbtc: {
        nativeNetwork: networks.BitcoinMainnet,
        nativeBlockchain: blockchains.Bitcoin,
        hostNetwork: networks.TelosMainnet,
        hostBlockchain: blockchains.Telos,
        eosRpc: settings.rpc.mainnet.telos.endpoint,
        eosSignatureProvider: telosSignatureProvider
      }
    }
  }
  if (_pTokenId === PBTC_ON_ARBITRUM_MAINNET) {
    return {
      pbtc: {
        network: networks.Mainnet,
        blockchain: blockchains.Arbitrum,
        ethProvider: arbitrumProvider
      }
    }
  }
  if (_pTokenId === PLTC_ON_ETH_MAINNET) {
    return {
      pltc: {
        network: networks.Mainnet,
        blockchain: blockchains.Ethereum,
        ethProvider
      }
    }
  }
  if (_pTokenId === PLTC_ON_EOS_MAINNET) {
    return {
      pltc: {
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PETH_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pETH,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PNT_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.PNT,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PMKR_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pMKR,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PLINK_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pLINK,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PYFI_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pYFI,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PTERIA_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.PTERIA,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PUNI_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pUNI,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PBAND_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pBAND,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PBAL_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pBAL,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PCOMP_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pCOMP,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PSNX_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pSNX,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === POMG_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pOMG,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PDAI_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pDAI,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PANT_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pANT,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PLRC_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pLRC,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PUOS_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pUOS,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PBAT_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pBAT,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PREP_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pREP,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PZRX_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pZRX,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PPNK_ON_EOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pPNK,
        network: networks.Mainnet,
        blockchain: blockchains.Eosio,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PDOGE_ON_ETH_MAINNET) {
    return {
      pdoge: {
        network: networks.Mainnet,
        blockchain: blockchains.Ethereum,
        ethProvider
      }
    }
  }
  if (_pTokenId === PEOS_ON_ETH_MAINNET) {
    return {
      peosioToken: {
        pToken: pTokens.pEOS,
        network: networks.Mainnet,
        blockchain: blockchains.Ethereum,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PBTC_ON_BSC_MAINNET) {
    return {
      pbtc: {
        network: networks.Mainnet,
        blockchain: blockchains.BinanceSmartChain,
        ethProvider: bscProvider
      }
    }
  }
  if (_pTokenId === PEOS_ON_POLYGON_MAINNET) {
    return {
      peosioToken: {
        pToken: pTokens.pEOS,
        network: networks.Mainnet,
        blockchain: blockchains.Polygon,
        ethProvider: polygonProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PBTC_ON_XDAI_MAINNET) {
    return {
      pbtc: {
        network: networks.Mainnet,
        blockchain: blockchains.xDai,
        ethProvider: xdaiProvider
      }
    }
  }
  if (_pTokenId === IQ_ON_ETH_MAINNET) {
    return {
      peosioToken: {
        pToken: pTokens.IQ,
        network: networks.Mainnet,
        blockchain: blockchains.Ethereum,
        ethProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === TLOS_ON_ETH_MAINNET) {
    return {
      peosioToken: {
        pToken: pTokens.TLOS,
        nativeBlockchain: blockchains.Telos,
        nativeNetwork: networks.Mainnet,
        hostBlockchain: blockchains.Ethereum,
        hostNetwork: networks.Mainnet,
        ethProvider,
        telosRpc: settings.rpc.mainnet.telos.endpoint,
        telosSignatureProvider
      }
    }
  }
  if (_pTokenId === PNT_ON_BSC_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.PNT,
        network: networks.BinanceSmartChainMainnet,
        blockchain: blockchains.BinanceSmartChain,
        ethProvider,
        bscProvider
      }
    }
  }
  if (_pTokenId === POPIUM_ON_BSC_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pOPIUM,
        network: networks.BinanceSmartChainMainnet,
        blockchain: blockchains.BinanceSmartChain,
        ethProvider,
        bscProvider
      }
    }
  }
  if (_pTokenId === PTERIA_ON_BSC_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.PTERIA,
        network: networks.BinanceSmartChainMainnet,
        blockchain: blockchains.BinanceSmartChain,
        ethProvider,
        bscProvider
      }
    }
  }
  if (_pTokenId === PDEFIPLUSPLUS_ON_BSC_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pDEFIPlusPlus,
        network: networks.BinanceSmartChainMainnet,
        blockchain: blockchains.BinanceSmartChain,
        ethProvider,
        bscProvider
      }
    }
  }
  if (_pTokenId === PBCP_ON_BSC_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pBCP,
        network: networks.BinanceSmartChainMainnet,
        blockchain: blockchains.BinanceSmartChain,
        ethProvider,
        bscProvider
      }
    }
  }
  if (_pTokenId === CGG_ON_BSC_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.CGG,
        network: networks.BinanceSmartChainMainnet,
        blockchain: blockchains.BinanceSmartChain,
        ethProvider,
        bscProvider
      }
    }
  }
  if (_pTokenId === PETH_ON_TELOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pETH,
        network: networks.TelosMainnet,
        blockchain: blockchains.Telos,
        ethProvider,
        telosRpc: settings.rpc.mainnet.telos.endpoint,
        telosSignatureProvider
      }
    }
  }
  if (_pTokenId === PLINK_ON_TELOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pLINK,
        network: networks.TelosMainnet,
        blockchain: blockchains.Telos,
        ethProvider,
        telosRpc: settings.rpc.mainnet.telos.endpoint,
        telosSignatureProvider
      }
    }
  }
  if (_pTokenId === PNT_ON_TELOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.PNT,
        network: networks.TelosMainnet,
        blockchain: blockchains.Telos,
        ethProvider,
        telosRpc: settings.rpc.mainnet.telos.endpoint,
        telosSignatureProvider
      }
    }
  }
  if (_pTokenId === PUSDC_ON_TELOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pUSDC,
        network: networks.TelosMainnet,
        blockchain: blockchains.Telos,
        ethProvider,
        telosRpc: settings.rpc.mainnet.telos.endpoint,
        telosSignatureProvider
      }
    }
  }
  if (_pTokenId === PUSDT_ON_TELOS_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pUSDT,
        network: networks.TelosMainnet,
        blockchain: blockchains.Telos,
        ethProvider,
        telosRpc: settings.rpc.mainnet.telos.endpoint,
        telosSignatureProvider
      }
    }
  }
  if (_pTokenId === PNT_ON_XDAI_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.PNT,
        network: networks.XdaiMainnet,
        blockchain: blockchains.Xdai,
        ethProvider,
        xdaiProvider
      }
    }
  }
  if (_pTokenId === PRVN_ON_BSC_MAINNET) {
    return {
      prvn: {
        network: networks.Mainnet,
        blockchain: blockchains.BinanceSmartChain,
        bscProvider
      }
    }
  }
  if (_pTokenId === TLOS_ON_BSC_MAINNET) {
    return {
      peosioToken: {
        pToken: pTokens.TLOS,
        nativeBlockchain: blockchains.Telos,
        nativeNetwork: networks.Mainnet,
        hostBlockchain: blockchains.BinanceSmartChain,
        hostNetwork: networks.Mainnet,
        bscProvider,
        telosRpc: settings.rpc.mainnet.telos.endpoint,
        telosSignatureProvider
      }
    }
  }
  if (_pTokenId === POPEN_ON_BSC_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pOPEN,
        network: networks.BinanceSmartChainMainnet,
        blockchain: blockchains.BinanceSmartChain,
        ethProvider,
        bscProvider
      }
    }
  }
  if (_pTokenId === OCP_ON_ETH_MAINNET) {
    return {
      pbep20: {
        pToken: pTokens.OCP,
        network: networks.EthereumMainnet,
        blockchain: blockchains.Ethereum,
        ethProvider,
        bscProvider
      }
    }
  }
  if (_pTokenId === ANRX_ON_BSC_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.ANRX,
        network: networks.BinanceSmartChainMainnet,
        blockchain: blockchains.BinanceSmartChain,
        ethProvider,
        bscProvider
      }
    }
  }
  if (_pTokenId === PBTC_ON_POLYGON_MAINNET) {
    return {
      pbtc: {
        network: networks.Mainnet,
        blockchain: blockchains.Polygon,
        ethProvider: polygonProvider
      }
    }
  }
  if (_pTokenId === TFF_ON_POLYGON_MAINNET) {
    return {
      pbep20: {
        pToken: pTokens.TFF,
        network: networks.PolygonMainnet,
        blockchain: blockchains.Polygon,
        polygonProvider,
        bscProvider
      }
    }
  }
  if (_pTokenId === PSAFEMOON_ON_ETH_MAINNET) {
    return {
      pbep20: {
        pToken: pTokens.pSAFEMOON,
        network: networks.EthereumMainnet,
        blockchain: blockchains.Ethereum,
        ethProvider,
        bscProvider
      }
    }
  }
  if (_pTokenId === EFX_ON_BSC_MAINNET) {
    return {
      peosioToken: {
        pToken: pTokens.EFX,
        nativeBlockchain: blockchains.Eosio,
        nativeNetwork: networks.Mainnet,
        hostBlockchain: blockchains.BinanceSmartChain,
        hostNetwork: networks.Mainnet,
        bscProvider,
        eosRpc: settings.rpc.mainnet.eos.endpoint,
        eosSignatureProvider
      }
    }
  }
  if (_pTokenId === PSEEDS_ON_ETH_MAINNET) {
    return {
      peosioToken: {
        pToken: pTokens.pSEEDS,
        nativeBlockchain: blockchains.Telos,
        nativeNetwork: networks.Mainnet,
        hostBlockchain: blockchains.Ethereum,
        hostNetwork: networks.Mainnet,
        ethProvider,
        telosRpc: settings.rpc.mainnet.telos.endpoint,
        telosSignatureProvider
      }
    }
  }
  if (_pTokenId === PLBC_ON_BSC_MAINNET) {
    return {
      pbtc: {
        pToken: pTokens.pLBC,
        nativeBlockchain: blockchains.Lbry,
        nativeNetwork: networks.Mainnet,
        hostBlockchain: blockchains.BinanceSmartChain,
        hostNetwork: networks.Mainnet,
        ethProvider: bscProvider
      }
    }
  }
  if (_pTokenId === USDO_ON_POLYGON_MAINNET) {
    return {
      pbep20: {
        pToken: pTokens.USDO,
        network: networks.PolygonMainnet,
        blockchain: blockchains.Polygon,
        polygonProvider,
        bscProvider
      }
    }
  }
  if (_pTokenId === GALA_ON_BSC_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.GALA,
        network: networks.BinanceSmartChainMainnet,
        blockchain: blockchains.BinanceSmartChain,
        ethProvider,
        bscProvider
      }
    }
  }
  if (_pTokenId === PUOS_ON_ULTRA_MAINNET) {
    return {
      perc20: {
        pToken: pTokens.pUOS,
        network: networks.UltraMainnet,
        blockchain: blockchains.Ultra,
        ethProvider,
        ultraRpc: settings.rpc.mainnet.ultra.endpoint,
        ultraSignatureProvider
      }
    }
  }
  throw new Error('Invalid id', _pTokenId)
}

export { getConfigs }
