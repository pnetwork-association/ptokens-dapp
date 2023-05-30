import _ from 'lodash'
import { pTokensUtxoAssetBuilder, pTokensBlockstreamUtxoProvider } from 'ptokens-assets-utxo'
import { pTokensEvmAssetBuilder, pTokensEvmProvider } from 'ptokens-assets-evm'
import { pTokensEosioAssetBuilder, pTokensEosioProvider } from 'ptokens-assets-eosio'
import { pTokensAlgorandAssetBuilder, pTokensAlgorandProvider } from 'ptokens-assets-algorand'
import { pTokensSwapBuilder } from 'ptokens-swap'
import { pTokensNode, pTokensNodeProvider } from 'ptokens-node'

import { getReadOnlyProviderByBlockchain } from './read-only-providers'
import { PNETWORK_NODE_V3 } from '../constants/index'

const utxoBlockchains = ['btc']
const evmBlockchains = ['eth', 'bsc', 'ftm', 'polygon', 'luxochain', 'arbitrum']
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

export const getSwapBuilder = () => {
  const node = getNode()
  return new pTokensSwapBuilder(node)
}
