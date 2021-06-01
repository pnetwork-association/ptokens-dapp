import assets from '../../settings/swap-assets'
import { loadEvmCompatibleBalance } from '../swap/utils/balances'
import settings from '../../settings'
import { ASSETS_LOADED_SWAP_OLD_PNT, PNT_ON_BSC_MAINNET } from '../../constants/index'
import { resetProgress, updateSwapButton, updateProgress, loadBalances } from '../swap/swap.actions'
import { getWalletByBlockchain } from '../wallets/wallets.selectors'
import Erc20Abi from '../../utils/abi/ERC20.json'
import SwapOldPntAbi from '../../utils/abi/SWAP_OLD_PNT/Swap.json'
import Web3 from 'web3'
import { getOldPnt } from './swap-old-pnt-selector'
import BigNumber from 'bignumber.js'
import { getCorrespondingBaseTxExplorerLinkByBlockchain } from '../../utils/explorer'

const loadSwapOldPntData = () => ({
  type: ASSETS_LOADED_SWAP_OLD_PNT,
  payload: {
    assets: [
      { defaultFrom: true, ...settings.swapOldPntOnBsc.asset },
      { defaultTo: true, ...assets.find(({ id }) => id === PNT_ON_BSC_MAINNET) }
    ]
  }
})

const loadOldPntBalance = _account => {
  return _dispatch => {
    // NOTE: used by swap old pnt
    loadEvmCompatibleBalance({
      asset: settings.swapOldPntOnBsc.asset,
      account: _account,
      dispatch: _dispatch,
      blockchain: 'BSC'
    })
  }
}

const swap = (_amount, _address) => {
  return async _dispatch => {
    try {
      let withApprove = false
      let link

      const amount = BigNumber(_amount).multipliedBy(10 ** 18)

      _dispatch(resetProgress())

      _dispatch(
        updateProgress({
          show: true,
          percent: 0,
          message: `Swap starts ...`,
          steps: [0, 25, 50, 75, 100],
          terminated: false
        })
      )

      const { provider, account } = getWalletByBlockchain('BSC')
      const web3 = new Web3(provider)

      const oldPntContract = new web3.eth.Contract(Erc20Abi, getOldPnt().address)
      const swapContract = new web3.eth.Contract(SwapOldPntAbi, settings.swapOldPntOnBsc.swapContractAddress)

      const allowance = await oldPntContract.methods
        .allowance(_address, settings.swapOldPntOnBsc.swapContractAddress)
        .call()
      if (!BigNumber(allowance).isGreaterThanOrEqualTo(amount)) {
        withApprove = true
        _dispatch(
          updateProgress({
            show: true,
            percent: 25,
            message: `Approving ...`,
            steps: [0, 25, 50, 75, 100],
            terminated: false
          })
        )

        const _approve = () =>
          new Promise(_resolve =>
            oldPntContract.methods
              .approve(settings.swapOldPntOnBsc.swapContractAddress, amount)
              .send({ from: account, gas: 75000 })
              .once('transactionHash', _hash => {
                link = `${getCorrespondingBaseTxExplorerLinkByBlockchain('BSC')}${_hash}`
                _dispatch(
                  updateProgress({
                    show: true,
                    percent: 50,
                    message: `<a href="${link}" target="_blank">Transaction</a> broadcasted! Waiting for confirmation ...`,
                    steps: [0, 25, 50, 75, 100],
                    terminated: false
                  })
                )
              })
              .then(_resolve)
              .catch(() => {
                _dispatch(resetProgress())
                _dispatch(updateSwapButton('Swap'))
              })
          )

        await _approve()
      }

      _dispatch(
        updateProgress({
          show: true,
          percent: 50,
          message: `Amount ${!withApprove ? 'already' : ''} approved, swapping ...`,
          steps: [0, 25, 50, 75, 100],
          terminated: false
        })
      )

      const _swap = () =>
        new Promise(_resolve =>
          swapContract.methods
            .swap(amount, _address)
            .send({ from: account, gas: 120000 })
            .once('transactionHash', _hash => {
              link = `${getCorrespondingBaseTxExplorerLinkByBlockchain('BSC')}${_hash}`
              _dispatch(
                updateProgress({
                  show: true,
                  percent: 75,
                  message: `<a href="${link}" target="_blank">Transaction</a> broadcasted! Waiting for confirmation ...`,
                  steps: [0, 25, 50, 75, 100],
                  terminated: false
                })
              )
            })
            .then(() => {
              console.log('coao')
              _resolve()
            })
            .catch(() => {
              _dispatch(resetProgress())
              _dispatch(updateSwapButton('Swap'))
            })
        )

      await _swap()

      _dispatch(loadBalances(account, 'BSC'))
      _dispatch(loadOldPntBalance(account))

      _dispatch(
        updateProgress({
          show: true,
          percent: 100,
          message: `<a href="${link}" target="_blank">Swap</a> completed.`,
          steps: [0, 25, 50, 75, 100],
          terminated: true
        })
      )
    } catch (_err) {
      console.error(_err)
      _dispatch(updateSwapButton('Swap'))
    }
  }
}

export { loadSwapOldPntData, loadOldPntBalance, swap }
