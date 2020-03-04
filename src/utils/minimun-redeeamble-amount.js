const MINIMUM_REDEEMABLE_PEOS_AMOUNT = 0
const MINIMUM_REDEEMABLE_PBTC_AMOUNT = 0.00005
const MINIMUM_REDEEMABLE_PLTC_AMOUNT = 0.0000546
const PBTC_DECIMALS = 8
const PLTC_DECIMALS = 8

const getMinumRedeemableAmount = _pTokenName => {
  switch (_pTokenName) {
    case 'pEOS': {
      return MINIMUM_REDEEMABLE_PEOS_AMOUNT
    }
    case 'pBTC': {
      return parseFloat(MINIMUM_REDEEMABLE_PBTC_AMOUNT).toFixed(PBTC_DECIMALS)
    }
    case 'pLTC': {
      return parseFloat(MINIMUM_REDEEMABLE_PLTC_AMOUNT).toFixed(PLTC_DECIMALS)
    }
    default:
      break
  }
}

export { getMinumRedeemableAmount }
