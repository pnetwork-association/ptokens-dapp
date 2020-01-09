const sleep = ms => {
  return new Promise(resolve => 
    setTimeout(resolve, ms)
  )
}

const isJsonString = str => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const mask = (value, precision = 2, decimalSeparator = '.', thousandSeparator = '', allowNegative = false, prefix = '', suffix = '') => {
  if (value === undefined) {
    return {
      value: 0,
      maskedValue: ''
    }
  }

  value = String(value)

  if (value.length === 0) {
    return {
      value: 0,
      maskedValue: ''
    }
  }

  let digits = value.match(/\d/g) || ['0']
  let numberIsNegative = false

  if (allowNegative) {
    let negativeSignCount = (value.match(/-/g) || []).length
    numberIsNegative = negativeSignCount % 2 === 1
    let allDigitsAreZero = true
    for (let idx = 0; idx < digits.length; idx += 1) {
      if (digits[idx] !== '0') {
        allDigitsAreZero = false
        break
      }
    }
    if (allDigitsAreZero) {
      numberIsNegative = false
    }
  }

  while (digits.length <= precision) { 
    digits.unshift('0') 
  }

  if (precision > 0) {
    digits.splice(digits.length - precision, 0, ".")
  }

  digits = Number(digits.join('')).toFixed(precision).split('')
  let raw = Number(digits.join(''))

  let decimalpos = digits.length - precision - 1

  if (precision > 0) {
    digits[decimalpos] = decimalSeparator
  } else {
    decimalpos = digits.length
  }

  for (let x = decimalpos - 3; x > 0; x = x - 3) {
    digits.splice(x, 0, thousandSeparator)
  }

  if (prefix.length > 0) { 
    digits.unshift(prefix) 
  }
  if (suffix.length > 0) { 
    digits.push(suffix) 
  }

  if (allowNegative && numberIsNegative) {
    digits.unshift('-')
    raw = -raw
  }

  return {
    value: raw,
    maskedValue: digits.join('').trim()
  }
}

const timestampInSecondsToDate = timestamp => {
  if (!timestamp) {
    return '-'
  }

  const date = new Date(timestamp * 1000)
  const todate = date.getDate()
  const tomonth = date.getMonth() + 1
  const toyear = date.getFullYear()
  const hours = date.getHours()
  const minutes = `0${date.getMinutes()}`
  const seconds = `0${date.getSeconds()}`
  return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)} - ${tomonth}/${todate}/${toyear}`
}

const calculateObjectValuesString = obj => {
  if (!obj) {
    return
  }
  let key = ''
  Object.values(obj).forEach(v => 
    key = key + v.toString()
  )
  return key
}

export {
  sleep,
  isJsonString,
  mask,
  timestampInSecondsToDate,
  calculateObjectValuesString
}