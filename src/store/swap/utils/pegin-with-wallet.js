import { getCorrespondingBaseTxExplorerLink } from '../../../utils/ptokens-sm-utils'
import { eth } from 'ptokens-utils'
import Web3 from 'web3'
import ERC20Abi from '../../../utils/abi/ERC20.json'
import BigNumber from 'bignumber.js'
import { updateProgress, loadBalanceByAssetId, resetProgress, updateSwapButton } from '../swap.actions'
import { updateInfoModal } from '../../pages/pages.actions'
import { parseError } from '../../../utils/errors'
import {
  getWalletAccountByBlockchain,
  getWalletPermissionByBlockchain,
  getWalletByBlockchain
} from '../../wallets/wallets.selectors'
import { PUOS_ON_ULTRA_MAINNET } from '../../../constants'

let promiEvent = null

const peginWithWallet = async ({ ptokens, ptoken, params, dispatch }) => {
  if (promiEvent) {
    promiEvent.removeAllListeners()
  }

  let link

  // NOTE: avoids brave metamask gas estimation fails
  params[params.length] = {
    gas: ptoken.gasLimitPegin ? ptoken.gasLimitPegin : 200000,
    blocksBehind: 3,
    expireSeconds: 60,
    permission: getWalletPermissionByBlockchain(ptoken.nativeBlockchain) || 'active',
    actor: getWalletAccountByBlockchain(ptoken.nativeBlockchain)
  }
  params[0] = BigNumber(params[0])
    .multipliedBy(10 ** ptoken.nativeDecimals)
    .toFixed()

  // NOTE: peth uses ethers
  if ((ptoken.isPerc20 && ptoken.name !== 'pETH') || ptoken.isBep20) {
    try {
      await ptokens[ptoken.workingName].select()
      const info = await ptokens[ptoken.workingName].selectedNode.getInfo()
      const { account, provider } = getWalletByBlockchain(ptoken.nativeBlockchain)
      const web3 = new Web3(provider)

      const toApprove = new web3.eth.Contract(ERC20Abi, eth.addHexPrefix(info.native_smart_contract_address))
      const allowance = await toApprove.methods.allowance(account, eth.addHexPrefix(info.native_vault_address)).call()
      if (!BigNumber(allowance).isGreaterThanOrEqualTo(params[0])) {
        const _approve = () =>
          new Promise(_resolve =>
            toApprove.methods
              .approve(eth.addHexPrefix(info.native_vault_address), params[0])
              .send({ from: account, gas: 75000 })
              .once('hash', _hash => {
                link = `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'native')}${_hash}`
              })
              .then(_resolve)
          )

        await _approve()
      }
    } catch (_err) {
      console.error(_err)
      return
    }
  }

  dispatch(
    updateProgress({
      show: true,
      percent: 0,
      message: 'Waiting for the transaction to be signed ...',
      steps: [0, 20, 40, 60, 80, 100],
      terminated: false
    })
  )

  // NOTE: puos on ultra works different than the other ptokens
  if (ptoken.id === PUOS_ON_ULTRA_MAINNET) {
    const web3 = new Web3()
    const metadata = web3.utils.utf8ToHex(params[1])
    params[1] = 'swapcontract'
    params.splice(2, 0, metadata)
    console.log(params)
    return
    //promiEvent = ptokens[ptoken.workingName.toLowerCase()].issueWithMetadata(...params)
  } else {
    // TODO: fix peth since now would be pweth
    promiEvent = ptokens[ptoken.workingName.toLowerCase()].issue(...params)
  }

  promiEvent
    .once('nativeTxBroadcasted', _hash => {
      link = `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'native')}${_hash}`
      dispatch(
        updateProgress({
          show: true,
          percent: 20,
          message: `<a href="${link}" target="_blank">Transaction</a> broadcasted! Waiting for confirmation ...`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .once('nativeTxConfirmed', _e => {
      if (
        ptoken.nativeBlockchain === 'EOS' ||
        ptoken.nativeBlockchain === 'TELOS' ||
        ptoken.nativeBlockchain === 'ULTRA'
      ) {
        link = `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'native')}${_e.transaction_id}`
        dispatch(
          updateProgress({
            show: true,
            percent: 20,
            message: `<a href="${link}" target="_blank">Transaction</a> broadcasted! Waiting for confirmation ...`,
            steps: [0, 20, 40, 60, 80, 100],
            terminated: false
          })
        )
      }

      dispatch(
        updateProgress({
          show: true,
          percent: 40,
          message: `Waiting for the pNetwork to detect your <a href="${link}" target="_blank">transaction</a> ...`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .once('nodeReceivedTx', () => {
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
    .once('nodeBroadcastedTx', _report => {
      link = `${getCorrespondingBaseTxExplorerLink(ptoken.id, 'host')}${_report.broadcast_tx_hash}`
      dispatch(
        updateProgress({
          show: true,
          percent: 80,
          message: `Asset swap <a href="${link}" target="_blank">transaction</a> completed, waiting for confirmation ...`,
          steps: [0, 20, 40, 60, 80, 100],
          terminated: false
        })
      )
    })
    .then(_result => {
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
      setTimeout(() => dispatch(loadBalanceByAssetId(ptoken.id)), 2000)
    })
    .catch(_err => {
      console.error(_err)
      const { showModal } = parseError(_err)
      if (showModal) {
        dispatch(
          updateInfoModal({
            show: true,
            text: 'Error during pegin, try again!',
            icon: 'cancel'
          })
        )
      }
      dispatch(updateSwapButton('Swap'))
      dispatch(resetProgress())
    })
}

export default peginWithWallet
