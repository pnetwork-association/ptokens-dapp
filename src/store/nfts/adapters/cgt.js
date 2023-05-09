import Web3 from 'web3'
import CGTAbi from '../../../utils/abi/CHAINGUARDIANS/CGT.json'
import NativeAbi from '../../../utils/abi/CHAINGUARDIANS/Native.json'
import HostAbi from '../../../utils/abi/CHAINGUARDIANS/Host.json'
import { executeEvmCompatibleTxWithToast } from '../../../utils/tx-utils'
import { getProviderByBlockchain, getAccountByBlockchain } from '../nfts.selectors'
import { loadErc721Data } from './erc721'
import { loadNftData } from '../nfts.actions'

const moveChainGuardians = async ({ nft, destinationAccount, dispatch }) => {
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
          blockchain: 'ETH',
        })
      }

      await executeEvmCompatibleTxWithToast(portals.methods.wrap(nft.id, destinationAccount), {
        from: account,
        blockchain: 'ETH',
      })
    } else {
      const portals = new web3.eth.Contract(HostAbi, nft.portalsAddress)
      await executeEvmCompatibleTxWithToast(portals.methods.unwrap(nft.id, destinationAccount), {
        from: account,
        blockchain: 'BSC',
      })
    }

    // NOTE: reload balances considering that the host account is the same as native account
    dispatch(loadNftData(nft))
  } catch (_err) {
    console.error(_err)
  }
}

const loadChainGuardiansData = ({ nfts, blockchain: _blockchain, account, web3, dispatch }) =>
  loadErc721Data({ nfts, blockchain: _blockchain, account, web3, dispatch })

export { moveChainGuardians, loadChainGuardiansData }
