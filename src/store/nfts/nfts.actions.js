import nfts from '../../settings/nfts'
import Web3 from 'web3'
import _ from 'lodash'
import { getReadOnlyProviderByBlockchain } from '../../utils/read-only-providers'
import { NFTS_DATA_LOADED } from '../../constants'
import { setLoading } from '../pages/pages.actions'
import { loadERC155Data } from './adapters/erc1155'
import { loadCgtData } from './adapters/cgt'
import { moveRarebitBunnies } from './adapters/rarebit-bunnies'

const loadNftsData = (_account, _blockchain) => {
  return async _dispatch => {
    try {
      _dispatch(
        setLoading({
          text: 'Retrieving your NFTs ...',
          isLoading: true
        })
      )

      const web3 = new Web3(getReadOnlyProviderByBlockchain(_blockchain))

      const nftsGrouped = _.groupBy(nfts, 'loadDataKey')
      const [erc1155s, cgts] = await Promise.all([
        loadERC155Data({
          nfts: nftsGrouped['erc1155'].filter(({ blockchain }) => blockchain === _blockchain),
          blockchain: _blockchain,
          account: _account,
          web3
        }),
        loadCgtData({
          nfts: nftsGrouped['cgt'].filter(({ blockchain }) => blockchain === _blockchain),
          blockchain: _blockchain,
          account: _account,
          web3
        })
      ])

      _dispatch({
        type: NFTS_DATA_LOADED,
        payload: {
          nfts: [...erc1155s, ...cgts]
        }
      })
    } catch (_err) {
      console.error(_err)
    }
    _dispatch(
      setLoading({
        isLoading: false
      })
    )
  }
}

const move = (_nft, _blockchain, _destinationAccount, _amount) => {
  return async _dispatch => {
    try {
      const moves = {
        'Rarebit Bunnies': (...params) => moveRarebitBunnies(...params)
      }
      await moves[_nft.name]({
        nft: _nft,
        blockchain: _blockchain,
        destinationAccount: _destinationAccount,
        amount: _amount
      })
    } catch (_err) {
      console.error(_err)
    }
  }
}

export { loadNftsData, move }
