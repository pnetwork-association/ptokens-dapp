import { pTokensEvmAsset, pTokensEvmAssetBuilder, pTokensEvmProvider } from '@p.network/ptokens-assets-evm'
import { pTokensNode, pTokensNodeProvider } from '@p.network/ptokens-node'
import { pTokensSwapBuilder } from '@p.network/ptokens-swap'
import Web3 from 'web3'

import { PNETWORK_NODE_V3 } from '../../../constants'
import { isSmartContract } from '../../../utils/account-validator'
import { parseError } from '../../../utils/errors'
import { getReadOnlyProviderByBlockchain } from '../../../utils/read-only-providers'
import { updateInfoModal } from '../../pages/pages.actions'
import { getWalletByBlockchain } from '../../wallets/wallets.selectors'
import { resetProgress, updateMigrateButton } from '../migration.actions'
import migrationPegin from '../utils/migration-pegin'

const createAsset = async (_node, _asset, _wallet) => {
  const builder = new pTokensEvmAssetBuilder(_node)
  builder.setBlockchain(_asset.chainId)
  builder.setSymbol(_asset.symbol)
  builder.setDecimals(_asset.decimals)
  const provider = new pTokensEvmProvider(
    _wallet.provider || getReadOnlyProviderByBlockchain(_asset.blockchain.toUpperCase())
  )
  builder.setProvider(provider)
  const asset = await builder.build()
  return asset
}

const migratePNT = async (_amount, _from, _to, { dispatch }) => {
  try {
    dispatch(resetProgress())
    const wallet = getWalletByBlockchain(_from.blockchain)
    const provider = new pTokensNodeProvider(PNETWORK_NODE_V3)
    const node = new pTokensNode(provider)
    // Here _to is used for the symbol in order to get PNT assetInfo.
    // ethPNT is not directly supported and it is used as PNT only modifying the contract address.
    const assetInfo = await node.getAssetInfoByChainId(_to.symbol, _from.chainId)
    const providerInfo = new pTokensEvmProvider(
      wallet.provider || getReadOnlyProviderByBlockchain(_from.blockchain.toUpperCase())
    )
    assetInfo.tokenAddress = _from.address
    assetInfo.decimals = _from.decimals
    const config = {
      node: node,
      assetInfo: assetInfo,
      symbol: _from.symbol,
      chainId: _from.chainId,
      provider: providerInfo,
    }
    const sourceAsset = new pTokensEvmAsset(config)
    const destinationAsset = await createAsset(node, _to, wallet)
    const swapBuilder = new pTokensSwapBuilder(node)
    swapBuilder.setAmount(_amount)
    swapBuilder.setSourceAsset(sourceAsset)
    const web3 = new Web3(wallet.provider)
    if (await isSmartContract(wallet.account, web3)) throw new Error('Destination address is a smart contract')
    swapBuilder.addDestinationAsset(destinationAsset, wallet.account)
    const swap = swapBuilder.build()
    migrationPegin({
      swap: swap,
      ptokenFrom: _from,
      ptokenTo: _to,
      web3: web3,
      dispatch: dispatch,
    })
  } catch (_err) {
    const { showModal } = parseError(_err)
    if (showModal) {
      dispatch(
        updateInfoModal({
          show: true,
          text: 'Error during migration, try again!',
          showMoreText: _err.message ? _err.message : _err,
          showMoreLabel: 'Show Details',
          icon: 'cancel',
        })
      )
    }
    dispatch(updateMigrateButton('Migrate'))
    dispatch(resetProgress())
  }
}

export default migratePNT
