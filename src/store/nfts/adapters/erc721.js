import BigNumber from 'bignumber.js'
import axios from 'axios'
import CGTAbi from '../../../utils/abi/ERC721.json'

const loadErc721 = async ({ nfts, blockchain: _blockchain, account, web3 }) => {
  try {
    if (nfts.length === 0) return []

    const { portalsAddress, hostPortalsAddress, blockchain, contractAddress, isNative, symbol, fromBlock } = nfts[0]
    const erc721 = new web3.eth.Contract(CGTAbi, contractAddress)

    // NOTE: get all received nfts
    const events = await erc721.getPastEvents('Transfer', {
      filter: {
        to: [account]
      },
      fromBlock: fromBlock,
      toBlock: 'latest'
    })

    // NOTE: remove double ids
    const erc721WithIds = nfts.map((_nft, _index) => ({
      ..._nft,
      ids: events[_index] ? Array.from(new Set(events[_index].map(({ returnValues: { id } }) => id))) : []
    }))

    const nfstArray = []
    for (const erc721 of erc721WithIds) {
      const { ids, type } = erc721
      const uris = await Promise.all(
        ids.map(
          _id =>
            new Promise((_resolve, _reject) =>
              erc721.methods
                .uri(_id)
                .call()
                .then(_uri =>
                  _resolve(_uri.includes('ipfs') ? _uri.replace('ipfs://', 'https://gateway.ipfs.io/') : _uri)
                )
                .catch(_reject)
            )
        )
      )

      const balances = await Promise.all(ids.map(_id => erc721.methods.balanceOf(account, _id).call()))

      const nftsData = await Promise.all(
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

      nfstArray.push(
        ...nftsData
          .filter((_, _index) => BigNumber(balances[_index]).isGreaterThan(0))
          .map((_data, _index) => ({
            ...erc721,
            ..._data,
            id: ids[_index],
            balance: new BigNumber(balances[_index])
          }))
      )
    }

    return []
  } catch (_err) {
    console.error(_err)
    return []
  }
}

export { loadErc721 }
