import pTokens from 'ptokens'
import {
  getCorrespondingReadOnlyProvider
} from './read-only-providers'

const ETH_GOOD = 2
const ETH_BAD = 180

const BTC_GOOD = 2
const BTC_BAD = 6

const EOS_GOOD = 1200 // (500ms each block -> 2blocks x second -> 120 block x minute -> 1200 blocks each 10 minutes)
const EOS_BAD = 7200 //each hours

const getEnclaveBlockHeightStatusComparedWithTheReals = async (_pTokenName, _role, _enclaveBlockHeight) => {

  if (_pTokenName === 'pBTC' && _role === 'issuer') {
    const ptokens = new pTokens({
      pbtc: {
        btcNetwork: 'testnet'
      }
    })

     const btcLastBlock = await ptokens.pbtc.esplora.makeApiCall(
      'GET',
      '/blocks/tip/height'
    )

    return _calculateStatus(
      _enclaveBlockHeight,
      btcLastBlock,
      BTC_GOOD,
      BTC_BAD
    )
  }

  if (_pTokenName === 'pBTC' && _role === 'redeemer') {
    const web3 = getCorrespondingReadOnlyProvider('pBTC', 'ETH')
    const ethLastBlock = await web3.eth.getBlockNumber()

    return _calculateStatus(
      _enclaveBlockHeight,
      ethLastBlock,
      ETH_GOOD,
      ETH_BAD
    )
  }

  if (_pTokenName === 'pEOS' && _role === 'issuer') {
    const eosjs = getCorrespondingReadOnlyProvider('pEOS', 'EOS')
    const info = await eosjs.rpc.get_info()
    const eosLastBlock = info.head_block_num

    return _calculateStatus(
      _enclaveBlockHeight,
      eosLastBlock,
      EOS_GOOD,
      EOS_BAD
    )
  }

  if (_pTokenName === 'pEOS' && _role === 'redeemer') {

    const web3 = getCorrespondingReadOnlyProvider('pEOS', 'ETH')
    const ethLastBlock = await web3.eth.getBlockNumber()

    return _calculateStatus(
      _enclaveBlockHeight,
      ethLastBlock,
      ETH_GOOD,
      ETH_BAD
    )
  }

}

const _calculateStatus = (_b1, _b2, _good, _bad) => {
  if (_b2 - _b1 <= _good) {
    return 1
  }

  if (_b2 - _b1 > _good && _b2 - _b1 <= _bad) {
    return 2
  }

  if (_b2 - _b1 > _bad) {
    return 3
  }

  return 1
}

export {
  getEnclaveBlockHeightStatusComparedWithTheReals
}