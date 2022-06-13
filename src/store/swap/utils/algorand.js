import algosdk from 'algosdk'
import { encode } from '@msgpack/msgpack'

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
