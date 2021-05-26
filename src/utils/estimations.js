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
  rvn: 5
}

const getPeginOrPegoutMinutesEstimation = _from => `~${estimations[_from.toLowerCase()]} minutes`

const getPeginOrPegoutMinutesEstimationByBpm = (
  { native: { eta: nativeEta }, host: { eta: hostEta } },
  _blockchain
) => {
  if (nativeEta === -1 || hostEta === -1) return 'Very High'
  return `~${nativeEta + hostEta} minutes`
}

export { getPeginOrPegoutMinutesEstimation, getPeginOrPegoutMinutesEstimationByBpm }
