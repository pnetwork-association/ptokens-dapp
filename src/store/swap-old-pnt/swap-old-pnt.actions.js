import assets from '../../settings/swap-assets'
import { loadEvmCompatibleBalance } from '../swap/utils/balances'
import { ASSETS_LOADED_SWAP_OLD_PNT, PTokenId } from '../../constants'
import { resetProgress, updateSwapButton, updateProgress, loadBalances } from '../swap/swap.actions'
import { getWalletByBlockchain } from '../wallets/wallets.selectors'
import Erc20Abi from '../../utils/abi/ERC20.json'
import SwapOldPntAbi from '../../utils/abi/SWAP_OLD_PNT/Swap.json'
import Web3 from 'web3'
import { getOldPnt } from './swap-old-pnt-selector'
import BigNumber from 'bignumber.js'
import { getCorrespondingTxExplorerLinkByBlockchain } from '../../utils/explorer'
import { Blockchain } from '../../constants/index'

const loadSwapOldPntData = () => (_dispatch, _getState) => ({
  type: ASSETS_LOADED_SWAP_OLD_PNT,
  payload: {
    assets: [
      { defaultFrom: true, ..._getState().settings.swapOldPntOnBsc.asset },
      { defaultTo: true, ...assets.find(({ id }) => id === PTokenId.PNT_ON_BSC_MAINNET) },
    ],
  },
})

const loadOldPntBalance = (_account) => {
  return (_dispatch, _getState) => {
    // NOTE: used by swap old pnt
    loadEvmCompatibleBalance({
      asset: _getState().settings.swapOldPntOnBsc.asset,
      account: _account,
      dispatch: _dispatch,
      blockchain: Blockchain.BSC,
    })
  }
}

const swap = (_amount, _address) => {
  return async (_dispatch, _getState) => {
    try {
      let withApprove = false
      let link

      const amount = BigNumber(_amount)
        .multipliedBy(10 ** 18)
        .toFixed()

      _dispatch(resetProgress())

      _dispatch(
        updateProgress({
          show: true,
          percent: 0,
          message: `Swap starts ...`,
          steps: [0, 25, 50, 75, 100],
          terminated: false,
        })
      )

      const { provider, account } = getWalletByBlockchain(Blockchain.BSC)
      const web3 = new Web3(provider)

      const oldPntContract = new web3.eth.Contract(Erc20Abi, getOldPnt().address)
      const swapContract = new web3.eth.Contract(
        SwapOldPntAbi,
        _getState().settings.swapOldPntOnBsc.swapContractAddress
      )

      const allowance = await oldPntContract.methods
        .allowance(_address, _getState().settings.swapOldPntOnBsc.swapContractAddress)
        .call()
      if (!BigNumber(allowance).isGreaterThanOrEqualTo(amount)) {
        withApprove = true
        _dispatch(
          updateProgress({
            show: true,
            percent: 25,
            message: `Approving ...`,
            steps: [0, 25, 50, 75, 100],
            terminated: false,
          })
        )

        const _approve = () =>
          new Promise((_resolve) =>
            oldPntContract.methods
              .approve(_getState().settings.swapOldPntOnBsc.swapContractAddress, amount)
              .send({ from: account })
              .once('transactionHash', (_hash) => {
                link = getCorrespondingTxExplorerLinkByBlockchain(Blockchain.BSC, _hash)
                _dispatch(
                  updateProgress({
                    show: true,
                    percent: 50,
                    message: `<a href="${link}" target="_blank">Transaction</a> broadcasted! Waiting for confirmation ...`,
                    steps: [0, 25, 50, 75, 100],
                    terminated: false,
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
          terminated: false,
        })
      )

      const _swap = () =>
        new Promise((_resolve) =>
          swapContract.methods
            .swap(amount, _address)
            .send({ from: account, gas: 120000 })
            .once('transactionHash', (_hash) => {
              link = getCorrespondingTxExplorerLinkByBlockchain(Blockchain.BSC, _hash)
              _dispatch(
                updateProgress({
                  show: true,
                  percent: 75,
                  message: `<a href="${link}" target="_blank">Transaction</a> broadcasted! Waiting for confirmation ...`,
                  steps: [0, 25, 50, 75, 100],
                  terminated: false,
                })
              )
            })
            .then(_resolve)
            .catch(() => {
              _dispatch(resetProgress())
              _dispatch(updateSwapButton('Swap'))
            })
        )

      await _swap()

      _dispatch(loadBalances(account, Blockchain.BSC))
      _dispatch(loadOldPntBalance(account))

      _dispatch(
        updateProgress({
          show: true,
          percent: 100,
          message: `<a href="${link}" target="_blank">Swap</a> completed.`,
          steps: [0, 25, 50, 75, 100],
          terminated: true,
        })
      )
    } catch (_err) {
      console.error(_err)
      _dispatch(updateSwapButton('Swap'))
    }
  }
}

export { loadSwapOldPntData, loadOldPntBalance, swap }
