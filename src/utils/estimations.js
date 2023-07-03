import BigNumber from 'bignumber.js'
import { Blockchain } from 'ptokens-constants'

const estimations = {
  [Blockchain.Gnosis]: 5 * 60,
  [Blockchain.Arbitrum]: 5 * 60,
}

const getPeginOrPegoutMinutesEstimationByBlockchainAndEta = (_blockchain, bpm) => {
  const eta = (bpm && bpm[_blockchain]) || estimations[_blockchain]
  return `~${BigNumber(eta).dividedBy(60).toFixed(0)} minutes`
}

export { getPeginOrPegoutMinutesEstimationByBlockchainAndEta }
