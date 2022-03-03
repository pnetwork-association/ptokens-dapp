import algosdk from 'algosdk'
import { getWalletAccountByBlockchain, getWalletProviderByBlockchain } from '../../wallets/wallets.selectors'
import { getReadOnlyProviderByBlockchain } from '../../../utils/read-only-providers'

export const maybeOptInAlgoAsset = async _assetIndex => {
  const account = getWalletAccountByBlockchain('ALGORAND')
  const provider = getWalletProviderByBlockchain('ALGORAND')
  const client = await getReadOnlyProviderByBlockchain('ALGORAND')

  // check if the user has already opted in this asset
  const accountInfo = await client.accountInformation(account).do()
  const alreadyOptedIn = Boolean(
    accountInfo['created-assets'].find(_scrutinizedAsset => _scrutinizedAsset.index === _assetIndex)
  )

  if (!alreadyOptedIn) {
    // generate and sign optin tx
    const suggestedParams = await client.getTransactionParams().do()

    const optinTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: account,
      to: account,
      assetIndex: _assetIndex,
      amount: 0,
      suggestedParams
    })

    const signedTxs = await provider.signTxn([
      {
        txn: Buffer.from(algosdk.encodeUnsignedTransaction(optinTxn)).toString('base64')
      }
    ])

    const binarySignedTx = provider.encoding.base64ToMsgpack(signedTxs[0].blob)
    await client.sendRawTransaction(binarySignedTx).do()
    await algosdk.waitForConfirmation(client, optinTxn.txId)
  }
}
