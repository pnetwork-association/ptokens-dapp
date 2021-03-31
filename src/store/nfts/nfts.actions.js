import nfts from '../../settings/nfts'
import Web3 from 'web3'
import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'
import ERC1155Abi from '../../utils/abi/ERC1155.json'
import { NFTS_DATA_LOADED } from '../../constants'
import axios from 'axios'
import { setLoading } from '../pages/pages.actions'

const loadNftsData = (_account, _blockchain) => {
  return async _dispatch => {
    try {
      _dispatch(
        setLoading({
          text: 'Retrieving your NFTs ...',
          isLoading: true
        })
      )

      const web3 = new Web3(getCorrespondingReadOnlyProvider(_blockchain))
      const erc1155s = nfts
        .filter(({ blockchain }) => blockchain === _blockchain)
        .map(_nft => new web3.eth.Contract(ERC1155Abi, _nft.contractAddress))

      // NOTE: get all received nfts
      const nftsEvents = await Promise.all(
        erc1155s.map((_erc1155, _index) =>
          _erc1155.getPastEvents('TransferSingle', {
            filter: {
              _to: [_account]
            },
            fromBlock: nfts[_index].fromBlock,
            toBlock: 'latest'
          })
        )
      )

      // NOTE: remove double ids
      const nftsWithIds = nfts.map((_nft, _index) => ({
        ..._nft,
        ids: Array.from(new Set(nftsEvents[_index].map(({ returnValues: { _id } }) => _id)))
      }))

      const nfstArray = []
      for (const { blockchain, contractAddress, id, isNative, name, symbol, ids, uri } of nftsWithIds) {
        const nftsData = await Promise.all(
          ids.map(
            _id =>
              new Promise((_resolve, _reject) =>
                axios
                  .get(`${uri}/${_id}`)
                  .then(({ data }) => _resolve(data))
                  .catch(_reject)
              )
          )
        )

        nfstArray.push(
          ...nftsData.map((_data, _index) => ({
            data: _data,
            blockchain,
            contractAddress,
            id: `${id}_${ids[_index]}`,
            isNative,
            name,
            symbol
          }))
        )
      }

      _dispatch({
        type: NFTS_DATA_LOADED,
        payload: {
          nfts: nfstArray
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

export { loadNftsData }
