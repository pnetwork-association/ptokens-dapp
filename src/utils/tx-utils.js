import { toastr } from 'react-redux-toastr'
import { getCorrespondingBaseTxExplorerLinkByBlockchain } from './explorer'

const executeEvmCompatibleTxWithToast = (_fx, { from, blockchain }) =>
  new Promise((_resolve, _reject) =>
    _fx
      .send({
        from
      })
      .once('hash', _hash => {
        toastr.success('Transaction broadcasted!', 'Click here to see it', {
          timeOut: 0,
          onToastrClick: () =>
            window.open(`${getCorrespondingBaseTxExplorerLinkByBlockchain(blockchain.toUppercase())}${_hash}`, '_blank')
        })
      })
      .once('receipt', _resolve)
      .once('error', _reject)
  )

export { executeEvmCompatibleTxWithToast }
