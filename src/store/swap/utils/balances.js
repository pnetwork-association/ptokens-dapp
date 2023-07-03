import BigNumber from 'bignumber.js'
import { Blockchain } from 'ptokens-constants'
import { stringUtils } from 'ptokens-helpers'
import Web3 from 'web3'

import { SWAP_BALANCE_LOADED } from '../../../constants/index'
import ERC20 from '../../../utils/abi/ERC20.json'
import { blockchainSymbolToName } from '../../../utils/maps'
import { getReadOnlyProviderByBlockchain } from '../../../utils/read-only-providers'

const loadEvmCompatibleBalances = async ({
  assets,
  account,
  blockchain = Blockchain.Gnosis,
  dispatch,
  actionType = SWAP_BALANCE_LOADED,
}) => Promise.all(assets.map((asset) => loadEvmCompatibleBalance({ asset, account, blockchain, dispatch, actionType })))

const loadEvmCompatibleBalance = async ({
  asset,
  account,
  dispatch,
  blockchain = Blockchain.Gnosis,
  actionType = SWAP_BALANCE_LOADED,
}) => {
  try {
    const web3 = new Web3(getReadOnlyProviderByBlockchain(blockchain))
    const token = new web3.eth.Contract(ERC20, stringUtils.addHexPrefix(asset.address))
    const balance = await token.methods.balanceOf(account).call()
    dispatch({
      type: actionType,
      payload: {
        id: asset.id,
        balance: BigNumber(balance).toFixed(),
      },
    })
    return
  } catch (_err) {
    console.error(`Error during getting ${asset.name} on ${blockchainSymbolToName[blockchain]} balance`, _err)
  }
}

export { loadEvmCompatibleBalances, loadEvmCompatibleBalance }
