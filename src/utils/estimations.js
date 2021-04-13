const estimations = {
  eth: 5,
  btc: 10,
  eos: 4,
  telos: 4,
  bsc: 5,
  xdai: 5,
  polygon: 5
}

const getPeginOrPegoutMinutesEstimation = _from => estimations[_from.toLowerCase()]

export { getPeginOrPegoutMinutesEstimation }
