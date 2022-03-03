import { getReadOnlyProviderByBlockchain } from '../../../utils/read-only-providers'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { SWAP_BALANCE_LOADED } from '../../../constants/index'
import ERC20 from '../../../utils/abi/ERC20'
import * as utils from 'ptokens-utils'

const loadEvmCompatibleBalances = async ({ assets, account, blockchain = 'ETH', dispatch }) =>
  Promise.all(assets.map(asset => loadEvmCompatibleBalance({ asset, account, blockchain, dispatch })))

const loadEvmCompatibleBalance = async ({ asset, account, dispatch, blockchain = 'ETH' }) => {
  try {
    const web3 = new Web3(getReadOnlyProviderByBlockchain(blockchain))
    if (asset.id === blockchain) {
      const balance = await web3.eth.getBalance(account)
      dispatch({
        type: SWAP_BALANCE_LOADED,
        payload: {
          id: asset.id,
          balance: BigNumber(balance).toFixed()
        }
      })
    } else {
      const token = new web3.eth.Contract(ERC20, utils.eth.addHexPrefix(asset.address))
      const balance = await token.methods.balanceOf(account).call()
      dispatch({
        type: SWAP_BALANCE_LOADED,
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

const loadEosioCompatibleBalances = async ({ assets, account, blockchain = 'EOS', dispatch }) =>
  Promise.all(assets.map(asset => loadEosioCompatibleBalance({ asset, account, blockchain, dispatch })))

const loadEosioCompatibleBalance = async ({ asset, account, dispatch, blockchain = 'EOS' }) => {
  try {
    const provider = getReadOnlyProviderByBlockchain(blockchain)
    const balance = await provider.get_currency_balance(
      asset.address,
      account,
      asset.symbolBalance ? asset.symbolBalance.toUpperCase() : asset.symbol.toUpperCase()
    )
    dispatch({
      type: SWAP_BALANCE_LOADED,
      payload: {
        id: asset.id,
        balance: BigNumber(balance[0] ? balance[0].split(' ')[0] : '0').toFixed()
      }
    })
  } catch (_err) {
    console.error(`Error during getting ${asset.name} on ${blockchain} balance`, _err)
  }
}

const loadAlgorandBalances = async ({ assets, account, dispatch, blockchain = 'ALGORAND' }) => {
  try {
    const algodclient = getReadOnlyProviderByBlockchain(blockchain)
    const accountInfo = await algodclient.accountInformation(account).do()

    assets.forEach(_asset => {
      if (_asset.id === blockchain) {
        dispatch({
          type: SWAP_BALANCE_LOADED,
          payload: {
            id: _asset.id,
            balance: BigNumber(accountInfo.amount).toFixed()
          }
        })
        return
      }

      const exist = Boolean(accountInfo.assets.find(_a => _a['asset-id'] === parseInt(_asset.address, 10)))
      if (!exist) {
        dispatch({
          type: SWAP_BALANCE_LOADED,
          payload: {
            id: _asset.id,
            balance: '0'
          }
        })
      }

      for (let idx = 0; idx < accountInfo.assets.length; idx++) {
        const scrutinizedAsset = accountInfo.assets[idx]
        if (scrutinizedAsset['asset-id'] === parseInt(_asset.address, 10)) {
          dispatch({
            type: SWAP_BALANCE_LOADED,
            payload: {
              id: _asset.id,
              balance: BigNumber(scrutinizedAsset.amount).toFixed()
            }
          })
        }
      }
    })
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
