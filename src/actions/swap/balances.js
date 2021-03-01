import { getCorrespondingReadOnlyProviderV2 } from '../../utils/read-only-providers'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { SWAP_BALANCE_LOADED } from '../../constants/index'
import ERC20 from '../../utils/abi/ERC20'
import * as utils from 'ptokens-utils'

const loadEthBalances = async (_assets, _account, _dispatch) => {
  try {
    const web3 = new Web3(getCorrespondingReadOnlyProviderV2('ETH'))
    for (const { id, address, name } of _assets) {
      try {
        if (id === 'ETH') {
          const balance = await web3.eth.getBalance(_account)
          _dispatch({
            type: SWAP_BALANCE_LOADED,
            payload: {
              id,
              balance: new BigNumber(balance)
            }
          })
        } else {
          const token = new web3.eth.Contract(ERC20, utils.eth.addHexPrefix(address))
          const balance = await token.methods.balanceOf(_account).call()
          _dispatch({
            type: SWAP_BALANCE_LOADED,
            payload: {
              id,
              balance: new BigNumber(balance)
            }
          })
        }
      } catch (_err) {
        console.error(`Error during getting ${name} on ETH balance`)
      }
    }
  } catch (_err) {
    console.error(_err)
  }
}

const loadEosBalances = async (_assets, _account, _dispatch) => {
  try {
    const provider = getCorrespondingReadOnlyProviderV2('EOS')
    for (const { id, address, name } of _assets) {
      try {
        const balance = await provider.get_currency_balance(address, _account, name.toUpperCase())

        _dispatch({
          type: SWAP_BALANCE_LOADED,
          payload: {
            id,
            balance: new BigNumber(balance[0] ? balance[0].split(' ')[0] : '0')
          }
        })
      } catch (_err) {
        console.error(`Error during getting ${name} on EOS balance`)
      }
    }
  } catch (_err) {
    console.error(_err)
  }
}

export { loadEthBalances, loadEosBalances }
