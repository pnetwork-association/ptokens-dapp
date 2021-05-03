import Web3 from 'web3'
import CGTAbi from '../../../utils/abi/CHAINGUARDIANS/CGT.json'
import NativeAbi from '../../../utils/abi/CHAINGUARDIANS/Native.json'
import HostAbi from '../../../utils/abi/CHAINGUARDIANS/Host.json'
import { executeEvmCompatibleTxWithToast } from '../../../utils/tx-utils'
import { getProviderByBlockchain, getAccountByBlockchain } from '../nfts.selectors'

const moveChainGuardians = async ({ nft, destinationAccount }) => {
  try {
    const provider = getProviderByBlockchain(nft.blockchain)
    const account = getAccountByBlockchain(nft.blockchain)
    const web3 = new Web3(provider)

    if (nft.isNative) {
      const nftContract = new web3.eth.Contract(CGTAbi, nft.contractAddress)
      const portals = new web3.eth.Contract(NativeAbi, nft.portalsAddress)

      const approvedAccount = await nftContract.methods.getApproved(nft.id).call()
      if (approvedAccount.toLowerCase() !== nft.portalsAddress.toLowerCase()) {
        await executeEvmCompatibleTxWithToast(nftContract.methods.approve(nft.portalsAddress, nft.id), {
          from: account,
          blockchain: 'ETH'
        })
      }

      await executeEvmCompatibleTxWithToast(portals.methods.wrap(nft.id, destinationAccount), {
        from: account,
        blockchain: 'ETH'
      })
    } else {
      const portals = new web3.eth.Contract(HostAbi, nft.portalsAddress)
      await executeEvmCompatibleTxWithToast(portals.methods.unwrap(nft.id, destinationAccount), {
        from: account,
        blockchain: 'BSC'
      })
    }
  } catch (_err) {
    console.error(_err)
  }
}

export { moveChainGuardians }
