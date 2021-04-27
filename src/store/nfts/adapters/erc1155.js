import BigNumber from 'bignumber.js'
import axios from 'axios'
import ERC1155Abi from '../../../utils/abi/ERC1155.json'

const loadERC155Data = async ({ nfts, account, web3 }) => {
  try {
    const erc1155s = nfts.map(_nft => new web3.eth.Contract(ERC1155Abi, _nft.contractAddress))

    // NOTE: get all received nfts
    const events = await Promise.all(
      erc1155s.map((_erc1155, _index) =>
        _erc1155.getPastEvents('TransferSingle', {
          filter: {
            _to: [account]
          },
          fromBlock: nfts[_index].fromBlock,
          toBlock: 'latest'
        })
      )
    )

    // NOTE: remove double ids
    const erc1155WithIds = nfts.map((_nft, _index) => ({
      ..._nft,
      ids: events[_index] ? Array.from(new Set(events[_index].map(({ returnValues: { _id } }) => _id))) : []
    }))

    const nfstArray = []
    for (const erc1155 of erc1155WithIds) {
      const { ids, symbol } = erc1155
      const uris = await Promise.all(
        ids.map(
          (_id, _index) =>
            new Promise((_resolve, _reject) =>
              erc1155s[_index].methods
                .uri(_id)
                .call()
                .then(_uri =>
                  _resolve(_uri.includes('ipfs') ? _uri.replace('ipfs://', 'https://gateway.ipfs.io/') : _uri)
                )
                .catch(_reject)
            )
        )
      )

      const balances = await Promise.all(
        ids.map((_id, _index) => erc1155s[_index].methods.balanceOf(account, _id).call())
      )

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
          //.filter((_, _index) => BigNumber(balances[_index]).isGreaterThan(0))
          .map((_data, _index) => ({
            ...erc1155,
            ...adapt(symbol, _data),
            id: ids[_index],
            balance: new BigNumber(balances[_index])
          }))
      )
    }

    return nfstArray
  } catch (_err) {
    console.log(_err)
    return []
  }
}

const adapt = (_symbol, _data) => {
  switch (_symbol) {
    case 'RAREBIT': {
      const { image, attributes, name } = _data
      return {
        image: image.replace('ipfs://', 'https://gateway.ipfs.io/'),
        attributes,
        name
      }
    }
    default: {
      throw new Error('Invalid NFT symbol')
    }
  }
}

export { loadERC155Data }
