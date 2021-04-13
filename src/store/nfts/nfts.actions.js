import nfts from '../../settings/nfts'
import Web3 from 'web3'
import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'
import ERC1155Abi from '../../utils/abi/ERC1155.json'
import { NFTS_DATA_LOADED } from '../../constants'
import axios from 'axios'
import { setLoading } from '../pages/pages.actions'
import { adapt } from '../../utils/nft-adapter'
import BigNumber from 'bignumber.js'
import { getProviderByBlockchain, getAccountByBlockchain } from './nfts.selectors'
import NativeAbi from '../../utils/abi/RAREBIT/Native.json'
import { toastr } from 'react-redux-toastr'
import { getCorrespondingBaseTxExplorerLinkByBlockchain } from '../../utils/explorer'

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
        ids: nftsEvents[_index] ? Array.from(new Set(nftsEvents[_index].map(({ returnValues: { _id } }) => _id))) : []
      }))

      const nfstArray = []
      for (const {
        blockchain,
        contractAddress,
        isNative,
        symbol,
        ids,
        type,
        portalsAddress,
        hostPortalsAddress
      } of nftsWithIds) {
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
          ids.map((_id, _index) => erc1155s[_index].methods.balanceOf(_account, _id).call())
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
            .filter((_, _index) => BigNumber(balances[_index]).isGreaterThan(0))
            .map((_data, _index) => ({
              ...adapt(symbol, _data),
              portalsAddress,
              hostPortalsAddress,
              blockchain,
              contractAddress,
              id: ids[_index],
              balance: new BigNumber(balances[_index]),
              isNative,
              symbol,
              type
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

const move = (_nft, _blockchain, _account, _amount) => {
  return async _dispatch => {
    try {
      const provider = getProviderByBlockchain(_nft.blockchain)
      const account = getAccountByBlockchain(_nft.blockchain)

      if (_nft.isNative) {
        const web3 = new Web3(provider)
        const nft = new web3.eth.Contract(ERC1155Abi, _nft.contractAddress)
        const portals = new web3.eth.Contract(NativeAbi, _nft.portalsAddress)

        const isApprovedForAll = await nft.methods.isApprovedForAll(account, _nft.portalsAddress).call()
        if (!isApprovedForAll) {
          await nft.methods.setApprovalForAll(_nft.portalsAddress, true).send({
            from: account
          })
        }

        portals.methods
          .mint(_nft.id, _amount, _account)
          .send({
            from: account
          })
          .once('hash', _hash => {
            toastr.success('Transaction broadcasted!', 'Click here to see it', {
              timeOut: 0,
              onToastrClick: () =>
                window.open(`${getCorrespondingBaseTxExplorerLinkByBlockchain('ETH')}${_hash}`, '_blank')
            })
          })
      }
    } catch (_err) {
      console.error(_err)
    }
  }
}

export { loadNftsData, move }
