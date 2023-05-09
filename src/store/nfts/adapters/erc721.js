import BigNumber from 'bignumber.js'
import axios from 'axios'
import ERC721Abi from '../../../utils/abi/ERC721.json'
import { nftsDataLoaded } from '../nfts.actions'

const loadErc721Data = async ({ nfts, account, web3, dispatch }) => {
  try {
    if (nfts.length === 0) return []
    const erc721s = nfts.map(({ contractAddress }) => new web3.eth.Contract(ERC721Abi, contractAddress))

    await Promise.all(
      erc721s.map(async (_erc721, _index) => {
        const totalbalance = await _erc721.methods.balanceOf(account).call()

        const ids = await Promise.all(
          [...Array(BigNumber(totalbalance).toNumber()).keys()].map((_, _index) =>
            _erc721.methods.tokenOfOwnerByIndex(account, _index).call()
          )
        )

        const data = await Promise.all(
          ids.map(
            (_id) =>
              new Promise((_resolve, _reject) =>
                axios
                  .get(`${nfts[_index].baseUri}/${_id}`)
                  .then(({ data }) => _resolve(data))
                  .catch(_reject)
              )
          )
        )

        dispatch(
          nftsDataLoaded(
            ids.map((_id, _index) => ({
              ...nfts[0],
              ...data[_index],
              id: _id,
              balance: BigNumber(1),
            }))
          )
        )
      })
    )
  } catch (_err) {
    console.error(_err)
  }
}

export { loadErc721Data }
