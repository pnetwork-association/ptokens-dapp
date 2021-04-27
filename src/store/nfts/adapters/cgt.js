import BigNumber from 'bignumber.js'
import axios from 'axios'
import CGTAbi from '../../../utils/abi/CHAINGUARDIANS/CGT.json'
import { loadErc721 } from './erc721'

// NOTE: this fx will be called with alwats nfts.length = 0
const loadCgtData = ({ nfts, blockchain, account, web3 }) => {
  if (blockchain === 'ETH') return loadCgtFromEthereum({ nfts, blockchain, account, web3 })
  if (blockchain === 'BSC') return loadErc721({ nfts, blockchain, account, web3 })
}

const loadCgtFromEthereum = async ({ nfts, blockchain: _blockchain, account, web3 }) => {
  try {
    if (nfts.length === 0) return []

    const { portalsAddress, hostPortalsAddress, blockchain, contractAddress, isNative, symbol } = nfts[0]
    const cgt = new web3.eth.Contract(CGTAbi, nfts[0].contractAddress)
    const { tokens } = await cgt.methods.getOwnedTokenData(account).call()
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
}

export { loadCgtData }
