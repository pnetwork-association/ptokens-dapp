import nfts from '../../settings/nfts'
import Web3 from 'web3'
import _ from 'lodash'
import { getReadOnlyProviderByBlockchain } from '../../utils/read-only-providers'
import { NFTS_DATA_LOADED } from '../../constants'
import { setLoading } from '../pages/pages.actions'
import { loadERC155Data } from './adapters/erc1155'
import { moveChainGuardians } from './adapters/cgt'
import { moveRarebitBunnies } from './adapters/rarebit-bunnies'
import { loadChainGuardiansData } from './adapters/cgt'
import { getWalletAccountByBlockchain } from '../wallets/wallets.selectors'

const loadNftsData = (_account, _blockchain) => {
  return async (_dispatch) => {
    _dispatch(
      setLoading({
        text: 'Retrieving your NFTs ...',
        isLoading: true,
      })
    )

    const web3 = new Web3(getReadOnlyProviderByBlockchain(_blockchain))

    const nftsGrouped = _.groupBy(nfts, 'loadDataKey')
    loadChainGuardiansData({
      dispatch: _dispatch,
      nfts: nftsGrouped['cgt'].filter(({ blockchain }) => blockchain === _blockchain),
      account: _account,
      web3,
    })
    loadERC155Data({
      dispatch: _dispatch,
      nfts: nftsGrouped['erc1155'].filter(({ blockchain }) => blockchain === _blockchain),
      account: _account,
      web3,
    })
  }
}

const loadNftData = (_nft) => {
  return async (_dispatch) => {
    try {
      // TODO: rarebit bunnies
      const loads = {
        CHAINGUARDIANS_ON_ETH: (...params) => loadChainGuardiansData(...params),
        CHAINGUARDIANS_ON_BSC: (...params) => loadChainGuardiansData(...params),
      }

      await loads[_nft.id]({
        nfts: [_nft],
        account: getWalletAccountByBlockchain(_nft.blockchain),
        web3: new Web3(getReadOnlyProviderByBlockchain(_nft.blockchain)),
        dispatch: _dispatch,
      })
    } catch (_err) {
      console.error(_err)
    }
  }
}

const move = (_nft, _blockchain, _destinationAccount, _amount) => {
  return async (_dispatch) => {
    try {
      const moves = {
        RAREBITBUNNIES_ON_ETH: (...params) => moveRarebitBunnies(...params),
        RAREBITBUNNIES_ON_BSC: (...params) => moveRarebitBunnies(...params),
        CHAINGUARDIANS_ON_ETH: (...params) => moveChainGuardians(...params),
        CHAINGUARDIANS_ON_BSC: (...params) => moveChainGuardians(...params),
      }
      await moves[_nft.id]({
        nft: _nft,
        blockchain: _blockchain,
        destinationAccount: _destinationAccount,
        amount: _amount,
        dispatch: _dispatch,
      })
    } catch (_err) {
      console.error(_err)
    }
  }
}

const nftsDataLoaded = (_data) => ({
  type: NFTS_DATA_LOADED,
  payload: {
    nfts: _data,
  },
})

export { loadNftsData, move, nftsDataLoaded, loadNftData }
