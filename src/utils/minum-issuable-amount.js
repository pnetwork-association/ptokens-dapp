const MINIMUM_ISSUABLE_PETH_AMOUNT = 0.000000001
const MINIMUM_ISSUABLE_PLINK_AMOUNT = 0.000000001
const MINIMUM_ISSUABLE_PNT_AMOUNT = 0.000000001
const MINIMUM_ISSUABLE_PMKR_AMOUNT = 0.000000001
const MINIMUM_ISSUABLE_PYFI_AMOUNT = 0.000000001
const MINIMUM_ISSUABLE_PTERIA_AMOUNT = 0.000000001
const MINIMUM_ISSUABLE_PUNI_AMOUNT = 0.000000001
const MINIMUM_ISSUABLE_PBAND_AMOUNT = 0.000000001
const MINIMUM_ISSUABLE_PBAL_AMOUNT = 0.000000001
const MINIMUM_ISSUABLE_PCOMP_AMOUNT = 0.000000001
const MINIMUM_ISSUABLE_PSNX_AMOUNT = 0.000000001
const PETH_DECIMALS = 18
const PNT_DECIMALS = 18
const PMKR_DECIMALS = 18
const PLINK_DECIMALS = 18
const PYFI_DECIMALS = 18
const PTERIA_DECIMALS = 18
const PUNI_DECIMALS = 18
const PBAND_DECIMALS = 18
const PBAL_DECIMALS = 18
const PCOMP_DECIMALS = 18
const PSNX_DECIMALS = 18

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
    case 'PTERIA': {
      return parseFloat(MINIMUM_ISSUABLE_PTERIA_AMOUNT).toFixed(PTERIA_DECIMALS)
    }
    case 'pLINK': {
      return parseFloat(MINIMUM_ISSUABLE_PLINK_AMOUNT).toFixed(PLINK_DECIMALS)
    }
    case 'pUNI': {
      return parseFloat(MINIMUM_ISSUABLE_PUNI_AMOUNT).toFixed(PUNI_DECIMALS)
    }
    case 'pBAND': {
      return parseFloat(MINIMUM_ISSUABLE_PBAND_AMOUNT).toFixed(PBAND_DECIMALS)
    }
    case 'pBAL': {
      return parseFloat(MINIMUM_ISSUABLE_PBAL_AMOUNT).toFixed(PBAL_DECIMALS)
    }
    case 'pCOMP': {
      return parseFloat(MINIMUM_ISSUABLE_PCOMP_AMOUNT).toFixed(PCOMP_DECIMALS)
    }
    case 'pSNX': {
      return parseFloat(MINIMUM_ISSUABLE_PSNX_AMOUNT).toFixed(PSNX_DECIMALS)
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
