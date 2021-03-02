const issueWithDepositAddress = async (_ptokens, _address, _ptoken, _dispatch) => {
  //[0] should be the value but here there isn't
  let depositAddress = null

  try {
    depositAddress = await _ptokens[_ptoken.toLowerCase()].getDepositAddress(_address)
  } catch (_err) {
    console.log(_err)
    return
  }

  depositAddress
    .waitForDeposit()
    .once('nativeTxBroadcasted', _tx => {
      const nativeTransactionField = {
        btc: 'txid',
        ltc: 'txid',
        doge: 'tx_hash'
      }

      /* _dispatch({
        type: PTOKENS_SET_DEPOSIT_ADDRESS,
        payload: {
          pToken: {
            depositAddress: {
              value: depositAddress.toString(),
              waiting: true
            }
          }
        }
      })

      _dispatch(
        LogHandler.updateItem('broadcasting-pending', {
          value: `new ${_ptoken.issueFrom.toUpperCase()} deposit detected`,
          success: true,
          link: `${getCorrespondingBaseTxExplorerLink(_ptoken, 'issuer')}${tx[nativeTransactionField[_ptoken.issueFrom.toLowerCase()]]
            }`,
          id: 'broadcasting-pending'
        })
      )

      _dispatch(
        LogHandler.addItem({
          value: 'Waiting for confirmation...',
          success: false,
          waiting: true,
          id: 'mint-confirmation'
        })
      )*/
    })
    .once('nativeTxConfirmed', () => {
      /*_dispatch(
        LogHandler.updateItem('mint-confirmation', {
          value: `Minting transaction confirmed`,
          success: true,
          link: null, //explorer,
          id: 'mint-confirmation'
        })
      )

      _dispatch(
        LogHandler.addItem({
          value: 'Waiting for enclave to witness mint event ...',
          success: false,
          waiting: true,
          link: null,
          id: 'id-witness-mint-event'
        })
      )*/
    })
    .once('nodeReceivedTx', () => {
      /*_dispatch(
        LogHandler.updateItem('id-witness-mint-event', {
          value: 'Mint event witnessed by enclave!',
          success: true,
          waiting: false,
          link: null,
          id: 'id-witness-mint-event'
        })
      )

      _dispatch(
        LogHandler.addItem({
          value: 'Enclave is broadcasting transaction...',
          success: false,
          waiting: true,
          link: null,
          id: 'enclave-transaction-broadcast'
        })
      )*/
    })
    .once('nodeBroadcastedTx', report => {
      /*_dispatch(
        LogHandler.updateItem('enclave-transaction-broadcast', {
          value: `${_ptoken.redeemFrom} Transaction broadcasted by the enclave!`,
          success: true,
          waiting: false,
          link: null,
          id: 'enclave-transaction-broadcast'
        })
      )

      const explorer = `${getCorrespondingBaseTxExplorerLink(_ptoken, 'redeemer')}${report.broadcast_tx_hash}`

      _dispatch(
        LogHandler.addItem({
          value: `${_ptoken.redeemFrom} transaction pending...`,
          success: true,
          link: explorer,
          id: 'transaction-final-pending'
        })
      )

      _dispatch(
        LogHandler.addItem({
          value: 'Waiting for confirmation',
          success: false,
          waiting: true,
          link: null,
          id: 'confirmation-final-mint'
        })
      )*/
    })
    .then(_result => {
      /*_dispatch(
        LogHandler.updateItem('confirmation-final-mint', {
          value: `${_ptoken.redeemFrom} transaction confirmed!`,
          success: true,
          waiting: false,
          link: null
        })
      )

      setTimeout(() => {
        const {
          wallets: { redeemerAccount }
        } = store.getState()
        _dispatch(getBalance(redeemerAccount))
      }, 5000)

      _dispatch({
        type: PTOKENS_ISSUE_SUCCEDEED
      })*/
    })
    .catch(_err => {
      /*const { message } = err

      _dispatch(LogHandler.clearWaitingItem())
      _dispatch(
        LogHandler.addItem({
          value: message,
          success: false
        })
      )

      _dispatch({
        type: PTOKENS_ISSUE_NOT_SUCCEDEED,
        payload: {
          error: err
        }
      })*/
    })
}

export default issueWithDepositAddress
