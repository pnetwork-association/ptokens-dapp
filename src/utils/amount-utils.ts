const nativeToWei = (input: string, decimalLength: number): string => {
  input.replace(/,/g, '')
  const parts = input.split('.')
  const integerPart = parts[0]
  const decimalPart = parts[1] || ''
  const zerosToAdd = decimalLength - decimalPart.length
  const paddedDecimalPart = zerosToAdd >= 0 ? decimalPart + '0'.repeat(zerosToAdd) : decimalPart
  return integerPart + paddedDecimalPart
}

const weiToNative = (input: string, decimalLength: number): string => {
  const paddedString = input.padStart(decimalLength, '0')
  const decimalPart = input.length > decimalLength ? paddedString.slice(-decimalLength) : paddedString
  const trimmedDecimalPart = decimalPart.replace(/0+$/, '');
  const integerPart = input.length > decimalLength ? paddedString.slice(0, paddedString.length - decimalLength) : '0'
  return integerPart + '.' + trimmedDecimalPart
}

export {nativeToWei, weiToNative}