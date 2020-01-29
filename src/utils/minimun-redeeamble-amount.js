const MINIMUM_REDEEMABLE_PEOS_AMOUNT = 0
const MINIMUM_REDEEMABLE_PBTC_AMOUNT = 0.00001
const PBTC_DECIMALS = 8

const getMinumRedeemableAmount = _pTokenName => {
  switch (_pTokenName) {
    case 'pEOS': {
      return MINIMUM_REDEEMABLE_PEOS_AMOUNT
    }
    case 'pBTC': {
      return parseFloat(MINIMUM_REDEEMABLE_PBTC_AMOUNT).toFixed(PBTC_DECIMALS)
    }
    default:
      break
  }
}

export { getMinumRedeemableAmount }
