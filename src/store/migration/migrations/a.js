import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import ERC20Abi from '../../../utils/abi/ERC20.json'
import { getCorrespondingBaseTxExplorerLinkByBlockchain } from '../../../utils/explorer'
import settings from '../../../settings'
import { updateProgress, loadBalanceByAssetId } from '../migration.actions'
import { getWalletByBlockchain } from '../../wallets/wallets.selectors'

const migrateA = async (_amount, _from, _to, { dispatch }) => {
  let hash
  const wallet = getWalletByBlockchain('ETH')
  const web3 = new Web3(wallet.provider)
  const token = new web3.eth.Contract(ERC20Abi, _from.address)
  dispatch(
    updateProgress({
      show: true,
      percent: 0,
      message: 'Waiting for confirming the transaction ...',
      steps: [0, 50, 100],
      terminated: false
    })
  )

  const send = () =>
    new Promise(_resolve => {
      token.methods
        .transfer(
          settings.migration.contractAddresses.pTokensPbtcV1ToV2,
          BigNumber(_amount)
            .multipliedBy(10 ** 18)
            .toFixed()
        )
        .send({
          from: wallet.account
        })
        .once('transactionHash', _hash => {
          hash = _hash
          dispatch(
            updateProgress({
              show: true,
              percent: 50,
              // prettier-ignore
              message: `Asset migration <a href="${`${getCorrespondingBaseTxExplorerLinkByBlockchain('ETH')}${_hash}`}" target="_blank">transaction</a> completed, waiting for confirmation ...`,
              steps: [0, 50, 100],
              terminated: false
            })
          )
        })
        .once('receipt', _resolve)
    })
  await send()

  dispatch(
    updateProgress({
      show: true,
      percent: 100,
      message: `Transaction <a href="${`${getCorrespondingBaseTxExplorerLinkByBlockchain(
        'ETH'
      )}${hash}`}" target="_blank">transaction</a> Confirmed.`,
      steps: [0, 50, 100],
      terminated: true
    })
  )

  dispatch(loadBalanceByAssetId(_to.id))
}

export default migrateA
