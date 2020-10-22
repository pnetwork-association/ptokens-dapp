const MINIMUM_ISSUABLE_PETH_AMOUNT = 0.000000001
const MINIMUM_ISSUABLE_PLINK_AMOUNT = 0.000000001
const MINIMUM_ISSUABLE_PNT_AMOUNT = 0.000000001
const MINIMUM_ISSUABLE_PMKR_AMOUNT = 0.000000001
const MINIMUM_ISSUABLE_PYFI_AMOUNT = 0.000000001
const PETH_DECIMALS = 18
const PNT_DECIMALS = 18
const PMKR_DECIMALS = 18
const PLINK_DECIMALS = 18
const PYFI_DECIMALS = 18

const getMinumIssuableAmount = _type => {
  switch (_type) {
    case 'pETH': {
      return parseFloat(MINIMUM_ISSUABLE_PETH_AMOUNT).toFixed(PETH_DECIMALS)
    }
    case 'PNT': {
      return parseFloat(MINIMUM_ISSUABLE_PNT_AMOUNT).toFixed(PNT_DECIMALS)
    }
    case 'pMKR': {
      return parseFloat(MINIMUM_ISSUABLE_PMKR_AMOUNT).toFixed(PMKR_DECIMALS)
    }
    case 'pYFI': {
      return parseFloat(MINIMUM_ISSUABLE_PYFI_AMOUNT).toFixed(PYFI_DECIMALS)
    }
    case 'pLINK': {
      return parseFloat(MINIMUM_ISSUABLE_PLINK_AMOUNT).toFixed(PLINK_DECIMALS)
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
