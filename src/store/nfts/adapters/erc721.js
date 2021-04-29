import BigNumber from 'bignumber.js'
import axios from 'axios'
import ERC721Abi from '../../../utils/abi/ERC721.json'
import { nftsDataLoaded } from '../nfts.actions'

const loadErc721Data = async ({ nfts, blockchain: _blockchain, account, web3, dispatch }) => {
  try {
    if (nfts.length === 0) return []

    const erc721s = nfts.map(({ contractAddress }) => new web3.eth.Contract(ERC721Abi, contractAddress))
    const events = await Promise.all(
      erc721s.map((_erc721, _index) =>
        _erc721.getPastEvents('Transfer', {
          filter: {
            to: account
          },
          fromBlock: nfts[_index].fromBlock,
          toBlock: 'latest'
        })
      )
    )

    const erc721WithIds = nfts.map((_nft, _index) => ({
      ..._nft,
      ids: events[_index] ? Array.from(new Set(events[_index].map(({ returnValues: { tokenId } }) => tokenId))) : []
    }))

    for (const erc721 of erc721WithIds) {
      const { ids } = erc721
      const uris = await Promise.all(
        ids.map(
          (_id, _index) =>
            new Promise((_resolve, _reject) =>
              erc721s[_index].methods
                .tokenURI(_id)
                .call()
                .then(_uri =>
                  _resolve(_uri.includes('ipfs') ? _uri.replace('ipfs://', 'https://gateway.ipfs.io/') : _uri)
                )
                .catch(_reject)
            )
        )
      )

      const [owners, nftsData] = await Promise.all([
        Promise.all(ids.map((_id, _index) => erc721s[_index].methods.ownerOf(_id).call())),
        Promise.all(
          uris.map(
            _uri =>
              new Promise((_resolve, _reject) =>
                axios
                  .get(_uri)
                  .then(({ data }) => _resolve(data))
                  .catch(_reject)
              )
          )
        )
      ])

      dispatch(
        nftsDataLoaded(
          nftsData
            .filter((_, _index) => owners[_index].toLowerCase() === account.toLowerCase())
            .map((_data, _index) => ({
              ...erc721,
              ..._data,
              id: ids[_index],
              balance: new BigNumber(1)
            }))
        )
      )
    }
  } catch (_err) {
    console.error(_err)
  }
}

export { loadErc721Data }
