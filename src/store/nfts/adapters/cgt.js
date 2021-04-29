import Web3 from 'web3'
import CGTAbi from '../../../utils/abi/CHAINGUARDIANS/CGT.json'
import NativeAbi from '../../../utils/abi/CHAINGUARDIANS/Native.json'
import HostAbi from '../../../utils/abi/CHAINGUARDIANS/Host.json'
import { executeEvmCompatibleTxWithToast } from '../../../utils/tx-utils'
import { getProviderByBlockchain, getAccountByBlockchain } from '../nfts.selectors'

/*const loadChainGuardiansFromEthereum = async ({ nfts, blockchain: _blockchain, account, web3 }) => {
  try {
    if (nfts.length === 0) return []

    const { portalsAddress, hostPortalsAddress, blockchain, contractAddress, isNative, symbol } = nfts[0]
    const cgt = new web3.eth.Contract(CGTAbi, nfts[0].contractAddress)
    const { tokens } = await cgt.methods.getOwnedTokenData('0xc97ef8b510ef22d9194b9542c37e631777225b3d').call()

    console.log(tokens, account)

    const uris = await Promise.all(tokens.map(_token => cgt.methods.tokenURI(_token).call()))
    const data = await Promise.all(
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

    return tokens.map((_token, _index) => ({
      ...data[_index],
      portalsAddress,
      hostPortalsAddress,
      blockchain,
      contractAddress,
      id: _token,
      balance: BigNumber(1),
      isNative,
      symbol
    }))
  } catch (_err) {
    console.error(_err)
    return []
  }
}*/

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

export { moveChainGuardians }
