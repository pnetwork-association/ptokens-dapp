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
