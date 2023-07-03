import BigNumber from 'bignumber.js'
import { Blockchain } from 'ptokens-constants'
import { stringUtils } from 'ptokens-helpers'
import Web3 from 'web3'

import { AppDispatch } from '../..'
import { SWAP_BALANCE_LOADED } from '../../../constants/index'
import { Asset } from '../../../settings/swap-assets'
import ERC20 from '../../../utils/abi/ERC20.json'
import { blockchainSymbolToName } from '../../../utils/maps'
import { getReadOnlyProviderByBlockchain } from '../../../utils/read-only-providers'
import { swapBalanceLoaded } from '../swap.reducer'

const loadEvmCompatibleBalances =
  ({ assets, account, blockchain = Blockchain.Gnosis, actionType = SWAP_BALANCE_LOADED }) =>
  (_dispatch: AppDispatch) => console.info('loadEvmCompatibleBalances') ||
    Promise.all(assets.map((asset) => _dispatch(loadEvmCompatibleBalance({ asset, account, blockchain, actionType }))))

const loadEvmCompatibleBalance = ({
  asset,
  account,
  blockchain = Blockchain.Gnosis,
  actionType = SWAP_BALANCE_LOADED,
}) => {
  return async (_dispatch: AppDispatch) => {
    try {
      console.info('loadEvmCompatibleBalance')
      const web3 = new Web3(getReadOnlyProviderByBlockchain(blockchain))
      const token = new web3.eth.Contract(ERC20, stringUtils.addHexPrefix(asset.address))
      const balance = await token.methods.balanceOf(account).call()
      _dispatch(swapBalanceLoaded({id: asset.id, balance: BigNumber(balance).toFixed()}))
      return
    } catch (_err) {
      console.error(`Error during getting ${asset.name} on ${blockchainSymbolToName(blockchain)} balance`, _err)
    }
  }
}

export { loadEvmCompatibleBalances, loadEvmCompatibleBalance }
