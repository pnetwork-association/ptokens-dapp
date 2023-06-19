import BigNumber from 'bignumber.js'
import { Blockchain } from '../constants'

const estimations = {
  [Blockchain.Ethereum]: 5,
  [Blockchain.Bitcoin]: 10,
  [Blockchain.EOS]: 4,
  [Blockchain.Telos]: 4,
  [Blockchain.Libre]: 4,
  [Blockchain.BSC]: 5,
  [Blockchain.XDAI]: 5,
  [Blockchain.Polygon]: 5,
  [Blockchain.Litecoin]: 10,
  [Blockchain.Dogecoin]: 5,
  [Blockchain.Ultra]: 4,
  [Blockchain.Arbitrum]: 5,
  [Blockchain.Luxochain]: 5,
  [Blockchain.Algorand]: 5,
  [Blockchain.Fantom]: 5,
  [Blockchain.Ore]: 4,
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
