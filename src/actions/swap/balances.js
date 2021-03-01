import { getCorrespondingReadOnlyProviderV2 } from '../../utils/read-only-providers'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { SWAP_BALANCE_LOADED } from '../../constants/index'

const loadEthBalances = async (_assets, _account, _dispatch) => {
  try {
    const ethAssets = _assets.filter(({ blockchain }) => blockchain === 'ETH')
    const web3 = new Web3(getCorrespondingReadOnlyProviderV2('ETH'))

    for (const { id, address } of ethAssets) {
      if (id === 'ETH') {
        const balance = await web3.eth.getBalance(_account)
        _dispatch({
          type: SWAP_BALANCE_LOADED,
          payload: {
            id,
            balance: new BigNumber(balance)
          }
        })
      }
    }
  } catch (_err) {
    console.error(_err)
  }
}

export { loadEthBalances }
