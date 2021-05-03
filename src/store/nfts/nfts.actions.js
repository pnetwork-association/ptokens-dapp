import nfts from '../../settings/nfts'
import Web3 from 'web3'
import _ from 'lodash'
import { getReadOnlyProviderByBlockchain } from '../../utils/read-only-providers'
import { NFTS_DATA_LOADED } from '../../constants'
import { setLoading } from '../pages/pages.actions'
import { loadERC155Data } from './adapters/erc1155'
import { loadErc721Data } from './adapters/erc721'
import { moveChainGuardians, loadChainGuardiansFromEthereum } from './adapters/cgt'
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
      loadChainGuardiansFromEthereum({
        dispatch: _dispatch,
        nfts: nftsGrouped['cgt'].filter(({ blockchain }) => blockchain === _blockchain),
        blockchain: _blockchain,
        account: _account,
        web3
      })
      loadERC155Data({
        dispatch: _dispatch,
        nfts: nftsGrouped['erc1155'].filter(({ blockchain }) => blockchain === _blockchain),
        blockchain: _blockchain,
        account: _account,
        web3
      })
      loadErc721Data({
        dispatch: _dispatch,
        nfts: nftsGrouped['erc721'].filter(({ blockchain }) => blockchain === _blockchain),
        blockchain: _blockchain,
        account: _account,
        web3
      })
    } catch (_err) {
      console.error(_err)
    }
  }
}

const move = (_nft, _blockchain, _destinationAccount, _amount) => {
  return async _dispatch => {
    try {
      const moves = {
        RAREBITBUNNIES: (...params) => moveRarebitBunnies(...params),
        CHAINGUARDIANS: (...params) => moveChainGuardians(...params)
      }
      await moves[_nft.internalId]({
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

const nftsDataLoaded = _data => ({
  type: NFTS_DATA_LOADED,
  payload: {
    nfts: _data
  }
})

export { loadNftsData, move, nftsDataLoaded }
