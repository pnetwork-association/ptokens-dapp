const getDefaultSelection = (_assets, { strategy = 'a' }) => {
  let from, to
  switch (strategy) {
    case 'a':
      from = _assets.find(({ id }) => id === 'PBTC_ON_ETH_MAINNET_V1')
      to = _assets.find(({ id }) => id === 'PBTC_ON_ETH_MAINNET_V2')
      break
    case 'b':
      break
    default:
      break
  }

  return [
    {
      ...from,
      defaultFrom: true
    },
    {
      ...to,
      defaultTo: true
    }
  ]
}

export { getDefaultSelection }
