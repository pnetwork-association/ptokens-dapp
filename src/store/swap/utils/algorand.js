import algosdk from 'algosdk'
import { encode } from '@msgpack/msgpack'
import { getReadOnlyProviderByBlockchain } from '../../../utils/read-only-providers'

function encodeUint64Number(num) {
  const tmp = new window.BigUint64Array(1)
  tmp[0] = window.BigInt(num)
  return new Uint8Array(tmp.buffer).reverse()
}

export function encodeUserData(destAccount, inAssetId, inAmount, outAssetId, minOutAmount) {
  const encodedDestAccount = algosdk.decodeAddress(destAccount).publicKey
  const encodedInAssetId = encodeUint64Number(inAssetId)
  const encodedInAmount = encodeUint64Number(inAmount)
  const encodedOutAssetId = encodeUint64Number(outAssetId)
  const encodedMinOutAmount = encodeUint64Number(minOutAmount)
  const a = encode([encodedDestAccount, encodedInAssetId, encodedInAmount, encodedOutAssetId, encodedMinOutAmount])
  return encode([a, [algosdk.decodeAddress(destAccount).publicKey], [], [inAssetId, outAssetId]])
}

export async function getAlgoBalance(_client, _account, _assetIndex) {
  if (parseInt(_account)) _account = algosdk.getApplicationAddress(_account)
  if (!algosdk.isValidAddress(_account)) return 0
  const accountInfo = await _client.accountInformation(_account).do()
  return accountInfo.amount
}

export async function getAsaBalance(_client, _account, _assetIndex) {
  if (parseInt(_account)) _account = algosdk.getApplicationAddress(_account)
  if (!algosdk.isValidAddress(_account)) return 0
  const accountInfo = await _client.accountInformation(_account).do()
  const balance = accountInfo.assets.find(obj => obj['asset-id'] === parseInt(_assetIndex))
  return balance ? balance['amount'] : 0
}

function encodeStringForArgs(str) {
  return new Uint8Array(Buffer.from(str))
}

function parseHexString(str) {
  let inStr = str
  var result = []
  while (inStr.length >= 2) {
    result.push(parseInt(inStr.substring(0, 2), 16))
    inStr = inStr.substring(2, inStr.length)
  }
  return result
}

export const buildPoolSwapTransactions = async ({
  amount,
  to,
  from,
  assetIndex,
  destinationChainId,
  nativeAccount,
  swapInfo
}) => {
  const client = getReadOnlyProviderByBlockchain('ALGORAND')
  const suggestedParams = await client.getTransactionParams().do()
  const encodedDestinationChainId = parseHexString(destinationChainId.substring(2))
  const asaTransferTx = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from,
    to: algosdk.getApplicationAddress(parseInt(swapInfo.appId)),
    assetIndex: parseInt(swapInfo.inputAssetId),
    amount: parseInt(amount, 10),
    suggestedParams,
    note: encode([0, encodedDestinationChainId, nativeAccount, []])
  })

  const appCallTx = algosdk.makeApplicationCallTxnFromObject({
    from,
    suggestedParams,
    appIndex: parseInt(swapInfo.appId),
    appArgs: [
      encodeStringForArgs('swap'),
      algosdk.encodeUint64(parseInt(assetIndex, 10)),
      algosdk.decodeAddress(to).publicKey
    ],
    foreignAssets: [parseInt(assetIndex), parseInt(swapInfo.inputAssetId)],
    accounts: [to]
  })
  return [asaTransferTx, appCallTx].map(_tx => _tx.get_obj_for_encoding())
}
