import BigNumber from 'bignumber.js'

const onChainFormat = (_amount: BigNumber.Value, _decimals: number) =>
  BigNumber(_amount).multipliedBy(new BigNumber(Math.pow(10, _decimals)))

const offChainFormat = (_amount: BigNumber.Value, _decimals: number) =>
  BigNumber(_amount).dividedBy(new BigNumber(Math.pow(10, _decimals)))

const parseAmount = (_decimals: number, _amount: number) => {
  const num = new BigNumber(Math.trunc(_amount * Math.pow(10, _decimals)))
  const den = new BigNumber(Math.pow(10, _decimals).toFixed(_decimals))
  return num.dividedBy(den)
}

const strip = (_number: string) =>
  BigNumber(_number)
    .toFixed()
    .match(/^-?\d*\.?0*\d{0,4}/)[0]

const formattedFixedStrip = (_number: BigNumber.Value, _decimals = 3) =>
  !BigNumber(_number).isZero()
    ? BigNumber(_number)
        .toFixed(_decimals)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : '0'

const numberWithCommas = (_stringNumber: string | number) => {
  const decimalChar = '.'
  let stringNumber

  {
    let number

    switch (typeof _stringNumber) {
      case 'string':
        if (_stringNumber.length < (_stringNumber[0] === '-' ? 5 : 4)) {
          return _stringNumber
        }

        stringNumber = _stringNumber

        number = Number(decimalChar !== '.' ? stringNumber.replace(decimalChar, '.') : stringNumber)
        break

      case 'number':
        stringNumber = String(_stringNumber)
        number = _stringNumber
        if ('.' !== decimalChar && !Number.isInteger(_stringNumber)) {
          stringNumber = stringNumber.replace('.', decimalChar)
        }
        break

      default:
        return _stringNumber
    }

    if ((-1000 < number && number < 1000) || isNaN(number) || !isFinite(number)) {
      return stringNumber
    }
  }

  {
    const decimalIndex = stringNumber.lastIndexOf(decimalChar)
    let decimal
    if (decimalIndex > -1) {
      decimal = stringNumber.slice(decimalIndex)
      stringNumber = stringNumber.slice(0, decimalIndex)
    }

    const parts = parse(stringNumber, ',')

    if (decimal) {
      parts.push(decimal)
    }

    return parts.join('')
  }
}

const parse = (string: string, separator: string) => {
  let i = ((string.length - 1) % 3) + 1

  if (i === 1 && string[0] === '-') {
    i = 4
  }

  const strings = [string.slice(0, i)]

  for (; i < string.length; i += 3) {
    strings.push(separator, string.substr(i, 3))
  }

  return strings
}

const getSeparator = () => {
  const _thousandSeparator = Intl.NumberFormat()
    .format(1111)
    .replace(/\p{Number}/gu, '')
  const _decimalSeparator = Intl.NumberFormat()
    .format(1.1)
    .replace(/\p{Number}/gu, '')
  if (
    (_decimalSeparator === ',' || _decimalSeparator === '.') &&
    (_thousandSeparator === ',' || _thousandSeparator === '.')
  )
    return { thousandSeparator: _thousandSeparator, decimalSeparator: _decimalSeparator }
  else return { thousandSeparator: ',', decimalSeparator: '.' }
}

const getThousandSeparator = () => getSeparator().thousandSeparator

const getDecimalSeparator = () => getSeparator().decimalSeparator

const formatDecimalSeparator = (num: number) => num.toString().replace('.', getDecimalSeparator())

export {
  onChainFormat,
  offChainFormat,
  parseAmount,
  strip,
  formattedFixedStrip,
  numberWithCommas,
  getThousandSeparator,
  getDecimalSeparator,
  formatDecimalSeparator,
}
