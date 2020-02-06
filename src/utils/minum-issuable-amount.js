const MINIMUM_MINTABLE_PEOS_AMOUNT = 1
const PEOS_DECIMALS = 4

const getMinumIssuableAmount = _type => {
  switch (_type) {
    case 'pEOS': {
      return parseFloat(MINIMUM_MINTABLE_PEOS_AMOUNT).toFixed(PEOS_DECIMALS)
    }
    case 'pBTC': {
      return 0
    }
    case 'pLTC': {
      return 0
    }
    default:
      break
  }
}

export { getMinumIssuableAmount }
