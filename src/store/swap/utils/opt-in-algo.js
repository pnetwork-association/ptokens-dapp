import algosdk from 'algosdk'
import { getWalletAccountByBlockchain, getWalletProviderByBlockchain } from '../../wallets/wallets.selectors'
import { getReadOnlyProviderByBlockchain } from '../../../utils/read-only-providers'
import { toastr } from 'react-redux-toastr'

export const maybeOptInAlgoAsset = async (_account, _assetIndex, updateButton = undefined) => {
  try {
    const walletAccount = getWalletAccountByBlockchain('ALGORAND')
    const provider = getWalletProviderByBlockchain('ALGORAND')
    const client = getReadOnlyProviderByBlockchain('ALGORAND')

    // check if the user has already opted in this asset
    const accountInfo = await client.accountInformation(_account).do()
    const alreadyOptedIn = accountInfo.assets.some(element => element['asset-id'] === _assetIndex)

    if (alreadyOptedIn) return true
    else if (!alreadyOptedIn && walletAccount === _account) {
      // generate and sign optin tx
      if (updateButton) updateButton('Waiting for opt-in tx signature', true)
      const suggestedParams = await client.getTransactionParams().do()

      const optinTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: _account,
        to: _account,
        assetIndex: _assetIndex,
        amount: 0,
        suggestedParams
      })

      const signedTxs = await provider.signTxn([optinTxn])

      const signedTxBlob = signedTxs[0].blob ? signedTxs[0].blob : signedTxs[0]
      const binarySignedTx = new Uint8Array(
        Buffer.from(signedTxBlob, 'base64')
          .toString('binary')
          .split('')
          .map(x => x.charCodeAt(0))
      )
      await client.sendRawTransaction(binarySignedTx).do()
      await algosdk.waitForConfirmation(client, optinTxn.txID().toString(), 5)
      return true
    }
    if (updateButton) updateButton('The recipient has not opted-in', true)
    return false
  } catch (err) {
    console.error(err)
    toastr.error(err.message)
    if (updateButton) updateButton('The recipient has not opted-in', true)
    return false
  }
}

export const maybeOptInAlgoApp = async (_appIndex, updateButton = undefined) => {
  try {
    const walletAccount = getWalletAccountByBlockchain('ALGORAND')
    const provider = getWalletProviderByBlockchain('ALGORAND')
    const client = getReadOnlyProviderByBlockchain('ALGORAND')

    // check if the user has already opted in this asset
    const accountInfo = await client.accountInformation(walletAccount).do()
    const alreadyOptedIn = accountInfo['apps-local-state'].some(element => element.id === _appIndex)

    if (alreadyOptedIn) return true
    else if (!alreadyOptedIn) {
      // generate and sign optin tx
      if (updateButton) updateButton('Waiting for opt-in tx signature', true)
      const suggestedParams = await client.getTransactionParams().do()

      const optinTxn = algosdk.makeApplicationOptInTxnFromObject({
        from: walletAccount,
        appIndex: _appIndex,
        suggestedParams
      })

      const signedTxs = await provider.signTxn([optinTxn])

      const signedTxBlob = signedTxs[0].blob ? signedTxs[0].blob : signedTxs[0]
      const binarySignedTx = new Uint8Array(
        Buffer.from(signedTxBlob, 'base64')
          .toString('binary')
          .split('')
          .map(x => x.charCodeAt(0))
      )
      await client.sendRawTransaction(binarySignedTx).do()
      await algosdk.waitForConfirmation(client, optinTxn.txID().toString(), 5)
      return true
    }
    if (updateButton) updateButton('The recipient has not opted-in', true)
    return false
  } catch (err) {
    console.error(err)
    toastr.error(err.message)
    if (updateButton) updateButton('The recipient has not opted-in', true)
    return false
  }
}
