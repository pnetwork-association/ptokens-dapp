import BigNumber from 'bignumber.js'
import { Blockchain } from 'ptokens-constants'

const estimations = {
  [Blockchain.Gnosis]: 5,
  [Blockchain.Arbitrum]: 5,
}

const getPeginOrPegoutMinutesEstimationByBlockchainAndEta = (_blockchain, _eta) => {
  if (_eta === -1 || _eta >= 45) {
    return `Unknown`
  }

  if (_eta < 2 * estimations[_blockchain]) {
    return `~${BigNumber(estimations[_blockchain]).toFixed(0)} minutes`
  }

  return `~${BigNumber(_eta).toFixed(0)} minutes`
}

export { getPeginOrPegoutMinutesEstimationByBlockchainAndEta }
