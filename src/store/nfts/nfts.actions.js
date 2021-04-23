import nfts from '../../settings/nfts'
import Web3 from 'web3'
import _ from 'lodash'
import { getCorrespondingReadOnlyProvider } from '../../utils/read-only-providers'
import ERC1155Abi from '../../utils/abi/ERC1155.json'
import { NFTS_DATA_LOADED } from '../../constants'
import { setLoading } from '../pages/pages.actions'
import { getProviderByBlockchain, getAccountByBlockchain } from './nfts.selectors'
import NativeAbi from '../../utils/abi/RAREBIT/Native.json'
import { toastr } from 'react-redux-toastr'
import { getCorrespondingBaseTxExplorerLinkByBlockchain } from '../../utils/explorer'
import { loadERC155Data } from './adapters/erc1155'
import { loadCgtData } from './adapters/cgt'

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
