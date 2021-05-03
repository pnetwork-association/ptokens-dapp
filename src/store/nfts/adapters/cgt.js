import Web3 from 'web3'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import CGTAbi from '../../../utils/abi/CHAINGUARDIANS/CGT.json'
import NativeAbi from '../../../utils/abi/CHAINGUARDIANS/Native.json'
import HostAbi from '../../../utils/abi/CHAINGUARDIANS/Host.json'
import { executeEvmCompatibleTxWithToast } from '../../../utils/tx-utils'
import { getProviderByBlockchain, getAccountByBlockchain } from '../nfts.selectors'
import { nftsDataLoaded } from '../nfts.actions'

const loadChainGuardiansFromEthereum = async ({ nfts, blockchain: _blockchain, account, web3, dispatch }) => {
  try {
    if (nfts.length === 0) return []

    const { contractAddress, baseUri } = nfts[0]
    const cgt = new web3.eth.Contract(CGTAbi, contractAddress)
    const totalbalance = await cgt.methods.balanceOf(account).call()

    const ids = await Promise.all(
      [...Array(BigNumber(totalbalance).toNumber()).keys()].map((_, _index) =>
        cgt.methods.tokenOfOwnerByIndex(account, _index).call()
      )
    )

    const data = await Promise.all(
      ids.map(
        _id =>
          new Promise((_resolve, _reject) =>
            axios
              .get(`${baseUri}/${_id}`)
              .then(({ data }) => _resolve(data))
              .catch(_reject)
          )
      )
    )

    dispatch(
      nftsDataLoaded(
        ids.map((_id, _index) => ({
          ...nfts[0],
          ...data[_index],
          id: _id,
          balance: BigNumber(1)
        }))
      )
    )
  } catch (_err) {
    console.error(_err)
    return []
  }
}

const moveChainGuardians = async ({ nft, blockchain, destinationAccount }) => {
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

export { moveChainGuardians, loadChainGuardiansFromEthereum }
