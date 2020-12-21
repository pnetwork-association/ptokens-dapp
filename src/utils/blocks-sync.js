import { getCorrespondingReadOnlyProvider } from './read-only-providers'
import { PBTC_ON_ETH_MAINNET, PBTC_ON_ETH_TESTNET, PBTC_ON_EOS_TESTNET, PBTC_ON_EOS_MAINNET } from '../constants'

import Web3 from 'web3'
/*import settings from '../settings'
import { Api, JsonRpc } from 'eosjs'
import fetch from 'node-fetch'
import encoding from 'text-encoding'*/
import axios from 'axios'
import settings from '../settings'

const ETH_GOOD = 2
const ETH_BAD = 180

const BTC_GOOD = 2
const BTC_BAD = 6

const LTC_GOOD = 4
const LTC_BAD = 24

//const EOS_GOOD = 1200 // (500ms each block -> 2blocks x second -> 120 block x minute -> 1200 blocks each 10 minutes)
//const EOS_BAD = 7200 //each hours

const _getEsploraApi = _network =>
  axios.create({
    baseURL:
      _network === 'mainnet' ? settings.BLOCKSTREAM_BASE_MAINNET_ENDPOINT : settings.BLOCKSTREAM_BASE_TESTNET_ENDPOINT,
    timeout: 50000,
    headers: {
      'Content-Type': 'text/plain'
    }
  })

const _getInsightLiteApi = _network =>
  axios.create({
    baseURL: _network === 'mainnet' ? settings.LTC_PTOKENS_NODE_MAINNET_API : settings.LTC_PTOKENS_NODE_TESTNET_API,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

const getBlockHeightStatusComparedWithTheReals = async (_pToken, _role, _enclaveBlockHeight, _network) => {
  if (_pToken.name === 'pBTC' && _role === 'issuer') {
    const btcLastBlock = await _makeEsploraApiCall('GET', '/blocks/tip/height', _network)

    return _calculateStatus(_enclaveBlockHeight, btcLastBlock, BTC_GOOD, BTC_BAD)
  }

  if ((_pToken.id === PBTC_ON_ETH_MAINNET || _pToken.id === PBTC_ON_ETH_TESTNET) && _role === 'redeemer') {
    const ethProvider = getCorrespondingReadOnlyProvider(_pToken)
    const web3 = new Web3(ethProvider)
    const ethLastBlock = await web3.eth.getBlockNumber()

    return _calculateStatus(_enclaveBlockHeight, ethLastBlock, ETH_GOOD, ETH_BAD)
  }

  if (_pToken.id === PBTC_ON_EOS_TESTNET || _pToken.id === PBTC_ON_EOS_MAINNET) {
    /*const rpc = new JsonRpc(settings[2].eos.endpoint, {
      fetch
    })
    const eosjs = new Api({
      rpc,
      textDecoder: new encoding.TextDecoder(),
      textEncoder: new encoding.TextEncoder()
    })

    const info = await eosjs.rpc.get_info()
    const eosLastBlock = info.head_block_num

    return _calculateStatus(
      _enclaveBlockHeight,
      eosLastBlock,
      EOS_GOOD,
      EOS_BAD
    )*/
    // NOTE: get block not implemented in the backend yet
    return 1
  }

  if (_pToken.name === 'pEOS' && _role === 'redeemer') {
    const ethProvider = getCorrespondingReadOnlyProvider(_pToken)
    const web3 = new Web3(ethProvider)
    const ethLastBlock = await web3.eth.getBlockNumber()

    return _calculateStatus(_enclaveBlockHeight, ethLastBlock, ETH_GOOD, ETH_BAD)
  }

  if (_pToken.name === 'pLTC' && _role === 'issuer') {
    const ltcLastBlock = await _makeInsightLiteApiCall('GET', '/blocks?limit=1', _network)

    return _calculateStatus(_enclaveBlockHeight, ltcLastBlock.blocks[0].height, LTC_GOOD, LTC_BAD)
  }

  if (_pToken.name === 'pLTC' && _role === 'redeemer') {
    const ethProvider = getCorrespondingReadOnlyProvider(_pToken)
    const web3 = new Web3(ethProvider)
    const ethLastBlock = await web3.eth.getBlockNumber()

    return _calculateStatus(_enclaveBlockHeight, ethLastBlock, ETH_GOOD, ETH_BAD)
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

const _makeEsploraApiCall = (_callType, _apiPath, _network, _params) =>
  new Promise((resolve, reject) => {
    _getEsploraApi(_network)
      [_callType.toLowerCase()](_apiPath, _params)
      .then(_res => resolve(_res.data))
      .catch(_err => reject(_err))
  })

const _makeInsightLiteApiCall = (_callType, _apiPath, _network, _params) =>
  new Promise((resolve, reject) => {
    _getInsightLiteApi(_network)
      [_callType.toLowerCase()](_apiPath, _params)
      .then(_res => resolve(_res.data))
      .catch(_err => reject(_err))
  })

export { getBlockHeightStatusComparedWithTheReals }
