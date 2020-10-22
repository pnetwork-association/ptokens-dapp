const MINIMUM_REDEEMABLE_PETH_AMOUNT = 0.000000001
const MINIMUM_REDEEMABLE_PBTC_AMOUNT = 0.00005
const MINIMUM_REDEEMABLE_PLTC_AMOUNT = 0.0000546
const MINIMUM_REDEEMABLE_PMKR_AMOUNT = 0.000000001
const MINIMUM_REDEEMABLE_PNT_AMOUNT = 0.000000001
const MINIMUM_REDEEMABLE_PYFI_AMOUNT = 0.000000001
const MINIMUM_REDEEMABLE_PLINK_AMOUNT = 0.000000001
const PBTC_DECIMALS = 8
const PLTC_DECIMALS = 8
const PETH_DECIMALS = 18
const PNT_DECIMALS = 18
const PMKR_DECIMALS = 18
const PLINK_DECIMALS = 18
const PYFI_DECIMALS = 18

const getMinumRedeemableAmount = _pTokenName => {
  switch (_pTokenName) {
    case 'pETH': {
      return parseFloat(MINIMUM_REDEEMABLE_PETH_AMOUNT).toFixed(PETH_DECIMALS)
    }
    case 'PNT': {
      return parseFloat(MINIMUM_REDEEMABLE_PNT_AMOUNT).toFixed(PNT_DECIMALS)
    }
    case 'pMKR': {
      return parseFloat(MINIMUM_REDEEMABLE_PMKR_AMOUNT).toFixed(PMKR_DECIMALS)
    }
    case 'pYFI': {
      return parseFloat(MINIMUM_REDEEMABLE_PYFI_AMOUNT).toFixed(PYFI_DECIMALS)
    }
    case 'pLINK': {
      return parseFloat(MINIMUM_REDEEMABLE_PLINK_AMOUNT).toFixed(PLINK_DECIMALS)
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
