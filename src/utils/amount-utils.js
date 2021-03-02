import BigNumber from 'bignumber.js'

const onChainFormat = (_amount, _decimals) => BigNumber(_amount).multipliedBy(new BigNumber(Math.pow(10, _decimals)))

const offChainFormat = (_amount, _decimals) => BigNumber(_amount).dividedBy(new BigNumber(Math.pow(10, _decimals)))

const parseAmount = (_decimals, _amount) => {
  const num = new BigNumber(Math.trunc(_amount * Math.pow(10, _decimals)))
  const den = new BigNumber(Math.pow(10, _decimals).toFixed(_decimals))

  return num.dividedBy(den)
}

const strip = _number =>
  BigNumber(_number)
    .toFixed()
    .match(/^-?\d*\.?0*\d{0,4}/)[0]

const formattedFixedStrip = (_number, _decimals = 3) =>
  !BigNumber(_number).isZero()
    ? BigNumber(_number)
        .toFixed(_decimals)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : '0'

export { onChainFormat, offChainFormat, parseAmount, strip, formattedFixedStrip }
