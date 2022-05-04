import { getReadOnlyProviderByBlockchain } from '../../../utils/read-only-providers'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { SWAP_BALANCE_LOADED } from '../../../constants/index'
import ERC20 from '../../../utils/abi/ERC20'
import * as utils from 'ptokens-utils'

const loadEvmCompatibleBalances = async ({
  assets,
  account,
  blockchain = 'ETH',
  dispatch,
  actionType = SWAP_BALANCE_LOADED
}) => Promise.all(assets.map(asset => loadEvmCompatibleBalance({ asset, account, blockchain, dispatch, actionType })))

const loadEvmCompatibleBalance = async ({
  asset,
  account,
  dispatch,
  blockchain = 'ETH',
  actionType = SWAP_BALANCE_LOADED
}) => {
  try {
    const web3 = new Web3(getReadOnlyProviderByBlockchain(blockchain))
    if (asset.id === blockchain) {
      const balance = await web3.eth.getBalance(account)
      dispatch({
        type: actionType,
        payload: {
          id: asset.id,
          balance: BigNumber(balance).toFixed()
        }
      })
    } else {
      const token = new web3.eth.Contract(ERC20, utils.eth.addHexPrefix(asset.address))
      const balance = await token.methods.balanceOf(account).call()
      dispatch({
        type: actionType,
        payload: {
          id: asset.id,
          balance: BigNumber(balance).toFixed()
        }
      })
    }
    return
  } catch (_err) {
    console.error(`Error during getting ${asset.name} on ${blockchain} balance`, _err)
  }
}

const loadEosioCompatibleBalances = async ({
  assets,
  account,
  blockchain = 'EOS',
  dispatch,
  actionType = SWAP_BALANCE_LOADED
}) => Promise.all(assets.map(asset => loadEosioCompatibleBalance({ asset, account, blockchain, dispatch, actionType })))

const loadEosioCompatibleBalance = async ({
  asset,
  account,
  dispatch,
  blockchain = 'EOS',
  actionType = SWAP_BALANCE_LOADED
}) => {
  try {
    const provider = getReadOnlyProviderByBlockchain(blockchain)
    const balance = await provider.get_currency_balance(
      asset.address,
      account,
      asset.symbolBalance ? asset.symbolBalance.toUpperCase() : asset.symbol.toUpperCase()
    )
    dispatch({
      type: actionType,
      payload: {
        id: asset.id,
        balance: BigNumber(balance[0] ? balance[0].split(' ')[0] : '0').toFixed()
      }
    })
  } catch (_err) {
    console.error(`Error during getting ${asset.name} on ${blockchain} balance`, _err)
  }
}

const loadAlgorandBalances = async ({
  assets,
  account,
  dispatch,
  blockchain = 'ALGORAND',
  actionType = SWAP_BALANCE_LOADED
}) => {
  try {
    const algodclient = getReadOnlyProviderByBlockchain(blockchain)
    const accountInfo = await algodclient.accountInformation(account).do()

    assets.forEach(_asset => {
      console.log(accountInfo)
      if (_asset.id === blockchain) {
        dispatch({
          type: actionType,
          payload: {
            id: _asset.id,
            balance: BigNumber(accountInfo.amount).toFixed()
          }
        })
        return
      }

      for (let idx = 0; idx < accountInfo['created-assets'].length; idx++) {
        let scrutinizedAsset = accountInfo['created-assets'][idx]
        if (scrutinizedAsset.index === _asset.id) {
          console.log('AssetID = ' + scrutinizedAsset.index)
          let myparms = JSON.stringify(scrutinizedAsset.params, undefined, 2)
          console.log('parms = ' + myparms)
          break
        }
      }
    })

    /*const balance = await provider.get_currency_balance(
      asset.address,
      account,
      asset.symbolBalance ? asset.symbolBalance.toUpperCase() : asset.symbol.toUpperCase()
    )*/

    /*dispatch({
      type: actionType,
      payload: {
        id: asset.id,
        balance: BigNumber(balance[0] ? balance[0].split(' ')[0] : '0').toFixed()
      }
    })*/
  } catch (_err) {
    console.error(`Error during getting ALGORAND balances`, _err)
  }
}

export {
  loadEvmCompatibleBalances,
  loadEvmCompatibleBalance,
  loadEosioCompatibleBalances,
  loadEosioCompatibleBalance,
  loadAlgorandBalances
}
