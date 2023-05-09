import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import ERC20Abi from '../../../utils/abi/ERC20.json'
import { getCorrespondingTxExplorerLinkByBlockchain } from '../../../utils/explorer'
import settings from '../../../settings'
import { updateProgress, loadBalanceByAssetId, resetProgress, updateMigrateButton } from '../migration.actions'
import { getWalletByBlockchain } from '../../wallets/wallets.selectors'
import { updateInfoModal } from '../../pages/pages.actions'
import { parseError } from '../../../utils/errors'

const migratePBTC = async (_amount, _from, _to, { dispatch }) => {
  try {
    let hash
    const wallet = getWalletByBlockchain('ETH')
    const web3 = new Web3(wallet.provider)
    const token = new web3.eth.Contract(ERC20Abi, _from.address)
    dispatch(
      updateProgress({
        show: true,
        percent: 0,
        message: 'Waiting for user’s approval ...',
        steps: [0, 50, 100],
        terminated: false,
      })
    )

    const send = () =>
      new Promise((_resolve, _reject) => {
        token.methods
          .transfer(
            settings.migration.contractAddresses.pbtcV1Migrator,
            BigNumber(_amount)
              .multipliedBy(10 ** 18)
              .toFixed()
          )
          .send({
            from: wallet.account,
          })
          .once('transactionHash', (_hash) => {
            hash = _hash
            dispatch(
              updateProgress({
                show: true,
                percent: 50,
                // prettier-ignore
                message: `Asset migration <a href="${getCorrespondingTxExplorerLinkByBlockchain('ETH', _hash)}" target="_blank">transaction</a> sent, waiting for confirmation ...`,
                steps: [0, 50, 100],
                terminated: false,
              })
            )
          })
          .once('receipt', _resolve)
          .once('error', _reject)
      })
    await send()

    dispatch(
      updateProgress({
        show: true,
        percent: 100,
        // prettier-ignore
        message: `Migration <a href="${getCorrespondingTxExplorerLinkByBlockchain('ETH', hash)}" target="_blank">transaction</a> confirmed.`,
        steps: [0, 50, 100],
        terminated: true,
      })
    )

    dispatch(loadBalanceByAssetId(_to.id))
    dispatch(updateMigrateButton('Migrate'))
  } catch (_err) {
    const { showModal } = parseError(_err)
    if (showModal) {
      dispatch(
        updateInfoModal({
          show: true,
          text: 'Error during migration, try again!',
          showMoreText: _err.message ? _err.message : _err,
          showMoreLabel: 'Show Details',
          icon: 'cancel',
        })
      )
    }
    dispatch(updateMigrateButton('Migrate'))
    dispatch(resetProgress())
  }
}

export default migratePBTC
