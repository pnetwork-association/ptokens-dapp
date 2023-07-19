import BigNumber from 'bignumber.js'
import { Blockchain } from 'ptokens-constants'
import { stringUtils } from 'ptokens-helpers'
import { Web3 } from 'web3'

import { AppDispatch, AppThunk } from '../..'
import { AssetWithAddress } from '../../../settings/swap-assets'
import ERC20 from '../../../utils/abi/ERC20'
import { blockchainSymbolToName } from '../../../utils/maps'
import { getReadOnlyProviderByBlockchain } from '../../../utils/read-only-providers'
import { swapBalanceLoaded } from '../swap.reducer'

const loadEvmCompatibleBalances =
  (_obj: { assets: AssetWithAddress[]; account: string; blockchain: Blockchain }): AppThunk =>
  (_dispatch: AppDispatch) => {
    _obj.assets.map((asset) =>
      _dispatch(loadEvmCompatibleBalance({ asset, account: _obj.account, blockchain: _obj.blockchain }))
    )
  }

const loadEvmCompatibleBalance =
  (_obj: { asset: AssetWithAddress; account: string; blockchain: Blockchain }): AppThunk =>
  async (_dispatch: AppDispatch) => {
    try {
      const provider = getReadOnlyProviderByBlockchain(_obj.blockchain)
      if (!provider) throw new Error('Missing provider')
      const web3 = new Web3(provider)
      const token = new web3.eth.Contract(ERC20, stringUtils.addHexPrefix(_obj.asset.address))
      const balance = await token.methods.balanceOf(_obj.account).call()
      _dispatch(swapBalanceLoaded({ id: _obj.asset.id, balance: BigNumber(balance.toString()).toFixed() }))
    } catch (_err) {
      console.error(
        `Error during getting ${_obj.asset.name} on ${blockchainSymbolToName[_obj.blockchain]} balance`,
        _err
      )
    }
  }

export { loadEvmCompatibleBalances, loadEvmCompatibleBalance }
