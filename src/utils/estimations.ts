import BigNumber from 'bignumber.js'
import { Blockchain } from 'ptokens-constants'

const DEFAULT_CHALLENGE_PERIOD = 60 * 5

const getPeginOrPegoutMinutesEstimationByBlockchainAndEta = (
  _blockchain: Blockchain,
  bpm: Record<Blockchain, number>
) => {
  const eta = (_blockchain in bpm && bpm[_blockchain]) || DEFAULT_CHALLENGE_PERIOD
  return `~${BigNumber(eta).dividedBy(60).toFixed(0)} minutes`
}

export { getPeginOrPegoutMinutesEstimationByBlockchainAndEta }
