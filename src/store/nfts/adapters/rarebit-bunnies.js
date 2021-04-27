import Web3 from 'web3'
import { toastr } from 'react-redux-toastr'
import NativeAbi from '../../../utils/abi/RAREBIT/Native.json'
import HostAbi from '../../../utils/abi/RAREBIT/Host.json'
import { getCorrespondingBaseTxExplorerLinkByBlockchain } from '../../../utils/explorer'
import { getProviderByBlockchain, getAccountByBlockchain } from '../nfts.selectors'
import ERC1155Abi from '../../../utils/abi/ERC1155.json'

const moveRarebitBunnies = async ({ nft, blockchain, destinationAccount, amount }) => {
  try {
    const provider = getProviderByBlockchain(nft.blockchain)
    const account = getAccountByBlockchain(nft.blockchain)

    if (nft.isNative) {
      const web3 = new Web3(provider)
      const nftContract = new web3.eth.Contract(ERC1155Abi, nft.contractAddress)
      const portals = new web3.eth.Contract(NativeAbi, nft.portalsAddress)

      const isApprovedForAll = await nftContract.methods.isApprovedForAll(account, nft.portalsAddress).call()
      if (!isApprovedForAll) {
        await nftContract.methods.setApprovalForAll(nft.portalsAddress, true).send({
          from: account
        })
      }

      portals.methods
        .mint(nft.id, amount, account)
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
    } else {
      const web3 = new Web3(provider)
      const portals = new web3.eth.Contract(HostAbi, nft.portalsAddress)

      portals.methods
        .burn(nft.id, amount, destinationAccount)
        .send({
          from: account
        })
        .once('hash', _hash => {
          toastr.success('Transaction broadcasted!', 'Click here to see it', {
            timeOut: 0,
            onToastrClick: () =>
              window.open(`${getCorrespondingBaseTxExplorerLinkByBlockchain('BSC')}${_hash}`, '_blank')
          })
        })
    }
  } catch (_err) {
    console.error(_err)
  }
}

export { moveRarebitBunnies }
