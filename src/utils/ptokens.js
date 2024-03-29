import { pTokensAlgorandAssetBuilder, pTokensAlgorandProvider } from '@p.network/ptokens-assets-algorand'
import { pTokensEosioAssetBuilder, pTokensEosioProvider } from '@p.network/ptokens-assets-eosio'
import { pTokensEvmAssetBuilder, pTokensEvmProvider, pTokensEvmAsset } from '@p.network/ptokens-assets-evm'
import { pTokensUtxoAssetBuilder, pTokensBlockstreamUtxoProvider } from '@p.network/ptokens-assets-utxo'
import { pTokensNode, pTokensNodeProvider } from '@p.network/ptokens-node'
import { pTokensSwapBuilder } from '@p.network/ptokens-swap'
import _ from 'lodash'

import { ETHPNT_ON_ETH_MAINNET, PNETWORK_NODE_V3 } from '../constants/index'
import swapAssets from '../settings/swap-assets'
import { getWalletByBlockchain } from '../store/wallets/wallets.selectors'

import { getReadOnlyProviderByBlockchain } from './read-only-providers'

const utxoBlockchains = ['btc', 'ltc']
const evmBlockchains = ['eth', 'bsc', 'ftm', 'polygon', 'luxochain', 'arbitrum', 'gnosis']
const eosioBlockchains = ['telos', 'eos', 'libre', 'ultra']
const algorandBlockchains = ['algorand']

const getNodeProvider = _.memoize((_url) => new pTokensNodeProvider(_url))

const getNode = _.memoize(() => {
  const nodeProvider = getNodeProvider(PNETWORK_NODE_V3)
  return new pTokensNode(nodeProvider)
})

const getAssetBuilder = (_asset) => {
  const node = getNode()
  if (utxoBlockchains.includes(_asset.blockchain.toLowerCase())) return new pTokensUtxoAssetBuilder(node)
  if (evmBlockchains.includes(_asset.blockchain.toLowerCase())) return new pTokensEvmAssetBuilder(node)
  if (eosioBlockchains.includes(_asset.blockchain.toLowerCase())) return new pTokensEosioAssetBuilder(node)
  if (algorandBlockchains.includes(_asset.blockchain.toLowerCase())) return new pTokensAlgorandAssetBuilder(node)
}

const getProvider = (_asset, _wallets) => {
  const wallet = _wallets[_asset.blockchain.toLowerCase()]
  if (utxoBlockchains.includes(_asset.blockchain.toLowerCase()))
    return new pTokensBlockstreamUtxoProvider(getReadOnlyProviderByBlockchain(_asset.blockchain.toUpperCase()), {
      'Content-Type': 'text/plain',
    })
  else if (evmBlockchains.includes(_asset.blockchain.toLowerCase()))
    return new pTokensEvmProvider(
      _wallets[_asset.blockchain.toLowerCase()].provider ||
        getReadOnlyProviderByBlockchain(_asset.blockchain.toUpperCase())
    )
  else if (eosioBlockchains.includes(_asset.blockchain.toLowerCase())) {
    const provider = new pTokensEosioProvider(
      getReadOnlyProviderByBlockchain(_asset.blockchain.toUpperCase()),
      wallet.provider || undefined
    )
    if (wallet.account) provider.setActor(wallet.account)
    if (wallet.permission) provider.setPermission(wallet.permission)
    return provider
  } else if (algorandBlockchains.includes(_asset.blockchain.toLowerCase())) {
    const provider = new pTokensAlgorandProvider(
      getReadOnlyProviderByBlockchain(_asset.blockchain.toUpperCase()),
      wallet.provider || undefined
    )
    if (wallet.account) provider.setAccount(wallet.account)
    return provider
  }
}

export const createAsset = async (_asset, _wallets) => {
  const builder = getAssetBuilder(_asset)
  builder.setBlockchain(_asset.chainId)
  builder.setSymbol(_asset.symbol)
  builder.setDecimals(_asset.decimals)
  if (_wallets) {
    const provider = getProvider(_asset, _wallets)
    builder.setProvider(provider)
  }
  const asset = await builder.build()
  return asset
}

export const createEthPntAsset = async () => {
  const ethPnt = swapAssets.find((asset) => asset.id === ETHPNT_ON_ETH_MAINNET)
  if (!ethPnt) throw new Error('ethPnt not found')
  const wallet = getWalletByBlockchain(ethPnt.blockchain)
  const provider = new pTokensNodeProvider(PNETWORK_NODE_V3)
  const node = new pTokensNode(provider)
  // Here _to is used for the symbol in order to get PNT assetInfo.
  // ethPNT is not directly supported and it is used as PNT only modifying the contract address.
  const assetInfo = await node.getAssetInfoByChainId('PNT', ethPnt.chainId)
  const providerInfo = new pTokensEvmProvider(
    wallet.provider || getReadOnlyProviderByBlockchain(ethPnt.blockchain.toUpperCase())
  )
  const config = {
    node: node,
    assetInfo: { ...assetInfo, tokenAddress: ethPnt.address, decimals: ethPnt.decimals },
    symbol: ethPnt.symbol,
    chainId: ethPnt.chainId,
    provider: providerInfo,
  }
  return new pTokensEvmAsset(config)
}

export const getSwapBuilder = () => {
  const node = getNode()
  return new pTokensSwapBuilder(node)
}
