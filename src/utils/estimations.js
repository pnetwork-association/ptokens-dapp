import BigNumber from 'bignumber.js'

const estimations = {
  eth: 5,
  btc: 10,
  eos: 4,
  telos: 4,
  bsc: 5,
  xdai: 5,
  polygon: 5,
  ltc: 10,
  doge: 5,
  rvn: 5,
  lbc: 5,
  ultra: 4,
  arbitrum: 5,
  luxochain: 5,
  algorand: 5,
  ftm: 5
}

const getPeginOrPegoutMinutesEstimationByBlockchainAndEta = (_blockchain, _eta) => {
  if (_eta >= 0 && _eta <= 15) {
    return `~${BigNumber(estimations[_blockchain.toLowerCase()]).toFixed(0)} minutes`
  }

  if (_eta === -1) {
    return `Unknown`
  }

  return `~${_eta} minutes`
}

export { getPeginOrPegoutMinutesEstimationByBlockchainAndEta }
