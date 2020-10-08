const MINIMUM_ISSUABLE_PETH_AMOUNT = 1e-9
const PETH_DECIMALS = 18

const getMinumIssuableAmount = _type => {
  switch (_type) {
    case 'pETH': {
      return parseFloat(MINIMUM_ISSUABLE_PETH_AMOUNT).toFixed(PETH_DECIMALS)
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
