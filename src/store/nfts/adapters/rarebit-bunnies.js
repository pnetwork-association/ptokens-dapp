import Web3 from 'web3'

import ERC1155Abi from '../../../utils/abi/ERC1155.json'
import HostAbi from '../../../utils/abi/RAREBITBUNNIES/Host.json'
import NativeAbi from '../../../utils/abi/RAREBITBUNNIES/Native.json'
import { executeEvmCompatibleTxWithToast } from '../../../utils/tx-utils'
import { loadNftData } from '../nfts.actions'
import { getProviderByBlockchain, getAccountByBlockchain } from '../nfts.selectors'

const moveRarebitBunnies = async ({ nft, destinationAccount, amount, dispatch }) => {
  try {
    const provider = getProviderByBlockchain(nft.blockchain)
    const account = getAccountByBlockchain(nft.blockchain)
    const web3 = new Web3(provider)

    if (nft.isNative) {
      const nftContract = new web3.eth.Contract(ERC1155Abi, nft.contractAddress)
      const portals = new web3.eth.Contract(NativeAbi, nft.portalsAddress)

      const isApprovedForAll = await nftContract.methods.isApprovedForAll(account, nft.portalsAddress).call()
      if (!isApprovedForAll) {
        await executeEvmCompatibleTxWithToast(nftContract.methods.setApprovalForAll(nft.portalsAddress, true), {
          from: account,
          blockchain: 'ETH',
        })
      }

      await executeEvmCompatibleTxWithToast(portals.methods.mint(nft.id, amount, account), {
        from: account,
        blockchain: 'ETH',
      })
    } else {
      const web3 = new Web3(provider)
      const portals = new web3.eth.Contract(HostAbi, nft.portalsAddress)
      await executeEvmCompatibleTxWithToast(portals.methods.burn(nft.id, amount, destinationAccount), {
        from: account,
        blockchain: 'BSC',
      })
    }

    dispatch(loadNftData(nft))
  } catch (_err) {
    console.error(_err)
  }
}

export { moveRarebitBunnies }
