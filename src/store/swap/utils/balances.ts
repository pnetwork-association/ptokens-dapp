import BigNumber from 'bignumber.js'
import { Blockchain } from 'ptokens-constants'
import { stringUtils } from 'ptokens-helpers'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

import { AppDispatch, AppThunk } from '../..'
import ERC20 from '../../../utils/abi/ERC20.json'
import { blockchainSymbolToName } from '../../../utils/maps'
import { getReadOnlyProviderByBlockchain } from '../../../utils/read-only-providers'
import { AssetWithAddress, swapBalanceLoaded } from '../swap.reducer'

const loadEvmCompatibleBalances =
  (_obj: { assets: AssetWithAddress[]; account: string; blockchain: Blockchain }): AppThunk =>
  (_dispatch: AppDispatch) => {
    _obj.assets.map((asset) =>
      _dispatch(loadEvmCompatibleBalance({ asset: _obj.asset, account: _obj.account, blockchain: _obj.blockchain }))
    )
  }

const loadEvmCompatibleBalance =
  (_obj: { asset: AssetWithAddress; account: string; blockchain: Blockchain }): AppThunk =>
  async (_dispatch: AppDispatch) => {
    try {
      const web3 = new Web3(getReadOnlyProviderByBlockchain(_obj.blockchain))
      const token = new web3.eth.Contract(ERC20 as unknown as AbiItem, stringUtils.addHexPrefix(_obj.asset.address))
      const balance = (await token.methods.balanceOf(_obj.account).call()) as string
      _dispatch(swapBalanceLoaded({ id: _obj.asset.id, balance: BigNumber(balance).toFixed() }))
    } catch (_err) {
      console.error(
        `Error during getting ${_obj.asset.name} on ${blockchainSymbolToName[_obj.blockchain]} balance`,
        _err
      )
    }
  }

export { loadEvmCompatibleBalances, loadEvmCompatibleBalance }
