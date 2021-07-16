import { Node } from 'ptokens-node'
import { eos, eth, constants } from 'ptokens-utils'
import { HttpProvider } from 'ptokens-providers'
import EventEmitter from 'eventemitter3'
import Web3 from 'web3'
import { getCorrespondingBaseTxExplorerLink } from '../../../utils/ptokens-sm-utils'
import { updateProgress, loadBalanceByAssetId, resetProgress, updateSwapButton } from '../swap.actions'
import { updateInfoModal } from '../../pages/pages.actions'
import { parseError } from '../../../utils/errors'
import { getWalletByBlockchain } from '../../wallets/wallets.selectors'
import { getReadOnlyProviderByBlockchain } from '../../../utils/read-only-providers'
import { PUOS_ON_ULTRA_MAINNET } from '../../../constants'

const pegoutPuosOnUltra = async ({ params, dispatch }) => {
  try {
    const web3 = new Web3(getReadOnlyProviderByBlockchain('ETH'))
    const { permission = 'active', account: actor, provider } = getWalletByBlockchain('ULTRA')
    const api = eos.getApi(null, getReadOnlyProviderByBlockchain('ULTRA'), provider)

    // U L T R A   T R A N S A C T I O N
    const { transaction_id } = await api.transact(
      {
        actions: [
          {
            account: 'eosio.token',
            name: 'transfer',
            authorization: [
              {
                actor,
                permission
              }
            ],
            data: {
              from: actor,
              to: 'ultra.swap',
              quantity: eos.getAmountInEosFormat(params[0], 8, 'UOS'),
              memo: params[1]
            }
          }
        ]
      },
      {
        blocksBehind: 3,
        expireSeconds: 60
      }
    )

    // prettier-ignore
    let link = `${getCorrespondingBaseTxExplorerLink(PUOS_ON_ULTRA_MAINNET, 'host')}${transaction_id}`
    dispatch(
      updateProgress({
        show: true,
        percent: 20,
        message: `<a href="${link}" target="_blank">Transaction</a> broadcasted! Waiting for confirmation ...`,
        steps: [0, 20, 40, 60, 80, 100],
        terminated: false
      })
    )

    dispatch(
      updateProgress({
        show: true,
        percent: 40,
        message: `Waiting for the pNetwork to detect your <a href="${link}" target="_blank">transaction</a> ...`,
        steps: [0, 20, 40, 60, 80, 100],
        terminated: false
      })
    )

    // p N E T W O R K   N O D E
    const node = new Node({
      pToken: constants.pTokens.pUOS,
      blockchain: constants.blockchains.Ultra,
      provider: new HttpProvider('https://puosonultra-testnet-1a.ngrok.io', {
        'Access-Control-Allow-Origin': '*'
      })
    })

    let broadcastTxHash = null
    const monitorTransaction = () =>
      new Promise(_resolve => {
        const eventEmitter = new EventEmitter()
        eventEmitter.on('nodeReceivedTx', _report => {
          dispatch(
            updateProgress({
              show: true,
              percent: 60,
              message: `Enclave received the <a href="${link}" target="_blank">transaction</a>, broadcasting ...`,
              steps: [0, 20, 40, 60, 80, 100],
              terminated: false
            })
          )
        })
        eventEmitter.on('nodeBroadcastedTx', _report => {
          broadcastTxHash = _report.broadcast_tx_hash
          link = `${getCorrespondingBaseTxExplorerLink(PUOS_ON_ULTRA_MAINNET, 'native')}${broadcastTxHash}`
          dispatch(
            updateProgress({
              show: true,
              percent: 80,
              message: `Asset swap <a href="${link}" target="_blank">transaction</a> completed, waiting for confirmation ...`,
              steps: [0, 20, 40, 60, 80, 100],
              terminated: false
            })
          )
          _resolve()
        })
        node.monitorIncomingTransaction(transaction_id, eventEmitter)
      })
    await monitorTransaction()

    // E T H   T R A N S A C T I O N
    await eth.waitForTransactionConfirmation(web3, broadcastTxHash, 5000)
    dispatch(
      updateProgress({
        show: true,
        percent: 100,
        message: `<a href="${link}" target="_blank">Transaction</a> Confirmed.`,
        steps: [0, 20, 40, 60, 80, 100],
        terminated: true
      })
    )

    dispatch(updateSwapButton('Swap'))
    // TODO: load balance also for native asset
    setTimeout(() => dispatch(loadBalanceByAssetId(PUOS_ON_ULTRA_MAINNET)), 5000)
  } catch (_err) {
    console.error(_err)
    const { showModal } = parseError(_err)
    if (showModal) {
      dispatch(
        updateInfoModal({
          show: true,
          text: 'Error during pegout, try again!',
          icon: 'cancel'
        })
      )
    }
    dispatch(updateSwapButton('Swap'))
    dispatch(resetProgress())
  }
}

export default pegoutPuosOnUltra
