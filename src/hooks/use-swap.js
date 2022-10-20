import { useState, useEffect, useCallback, useMemo } from 'react'
import { isValidAccountByBlockchain } from '../utils/account-validator'
import { getPeginOrPegoutMinutesEstimationByBlockchainAndEta } from '../utils/estimations'
import { getFee } from '../utils/fee'
import BigNumber from 'bignumber.js'
import { getLegacyUrl, updateUrlForSwap } from '../utils/url'
import { useWalletByBlockchain } from './use-wallets'
import getMinimumPeggable from '../utils/minimum-peggables'
import { numberWithCommas } from '../utils/amount-utils'
import { TLOS_ON_BSC_MAINNET, TLOS_ON_ETH_MAINNET } from '../constants'
import { maybeOptInAlgoApp, maybeOptInAlgoAsset } from '../store/swap/utils/opt-in-algo'
import ReactGA from 'react-ga4'

const useSwap = ({
  wallets,
  bpm,
  swappersBalances,
  assets,
  connectWithWallet,
  swap,
  progress,
  swapButton,
  updateSwapButton,
  hideDepositAddressModal
}) => {
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [address, setAddress] = useState('')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [swapType, setSwapType] = useState(null)
  const [showModalFrom, setShowModalFrom] = useState(false)
  const [showModalTo, setShowModalTo] = useState(false)
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const [selectionChanged, setSelectionChanged] = useState(false)
  const [pegoutToTelosEvmAddress, setPegoutToTelosEvmAddress] = useState(false)

  const { fee, isPegin, isPegout, eta, poolAmount, minimumPeggable, onPnetworkV2 } = useSwapInfo({
    from,
    to,
    bpm,
    swappersBalances
  })

  const onChangeFromAmount = useCallback(
    _amount => {
      setFromAmount(_amount)
      setToAmount(
        _amount !== ''
          ? BigNumber(_amount)
              .multipliedBy(fee)
              .toFixed()
          : _amount.toString()
      )
    },
    [fee]
  )

  const onChangeToAmount = useCallback(
    _amount => {
      setToAmount(_amount)
      setFromAmount(
        _amount !== ''
          ? BigNumber(_amount)
              .dividedBy(fee)
              .toFixed()
          : _amount.toString()
      )
    },
    [fee]
  )

  const onChangeOrder = useCallback(() => {
    const currentFrom = from
    setFrom(to)
    setTo(currentFrom)
    setSelectionChanged(true)
    setPegoutToTelosEvmAddress(false)
  }, [from, to])

  const onFromMax = useCallback(() => {
    const amount = from.balance
    setFromAmount(BigNumber(amount).toFixed())
    setToAmount(
      amount !== ''
        ? BigNumber(amount)
            .multipliedBy(fee)
            .toFixed()
        : amount.toString()
    )
  }, [fee, from])

  const onToMax = useCallback(() => {
    const amount = to.balance
    setFromAmount(BigNumber(amount).toFixed())
    setToAmount(
      amount !== ''
        ? BigNumber(amount)
            .dividedBy(fee)
            .toFixed()
        : amount.toString()
    )
  }, [fee, to])

  const onSwap = useCallback(() => {
    if (swapButton.text === 'Connect Wallet') {
      connectWithWallet(from.blockchain)
    }

    if (swapButton.text === 'Get Deposit Address' || swapButton.text === 'Swap') {
      updateSwapButton(swapButton.text === 'Swap' ? 'Swapping ...' : 'Generating ...', true)
      ReactGA.event('swap_click', { asset_from: from.id, asset_to: to.id, from_amount: fromAmount })
      swap(from, to, fromAmount, address, {
        pegoutToTelosEvmAddress
      })
    }
  }, [
    from,
    swapButton.text,
    to,
    address,
    fromAmount,
    swap,
    pegoutToTelosEvmAddress,
    connectWithWallet,
    updateSwapButton
  ])

  const onSelectFrom = useCallback(_asset => {
    setShowModalFrom(false)
    setFrom(_asset)
    setFromAmount('')
    setToAmount('')
    setPegoutToTelosEvmAddress(false)
  }, [])

  const onSelectTo = useCallback(_asset => {
    setShowModalTo(false)
    setTo(_asset)
    setFromAmount('')
    setToAmount('')
    setPegoutToTelosEvmAddress(false)
  }, [])

  const onCloseDepositAddressModal = useCallback(() => {
    updateSwapButton(!wallets[from.blockchain.toLowerCase()] ? 'Get Deposit Address' : 'Swap')
    hideDepositAddressModal()
  }, [from, wallets, updateSwapButton, hideDepositAddressModal])

  // NOTE: check combination
  const [isValidSwap] = useMemo(() => {
    if (!from || !to) return [false]

    // NOTE: pegin
    if (from.isNative && !to.isNative) {
      setSwapType('pegin')
      const ptokenId = to.id

      if (to.nativeSymbol !== from.nativeSymbol) {
        return [false]
      }

      if (from.onPnetworkV2 && !to.onPnetworkV2) {
        return [false]
      }

      const ptoken = assets.find(({ id }) => ptokenId === id)
      if (!ptoken) {
        return [false]
      }

      return [true]
    }
    // NOTE: pegout
    else if (!from.isNative) {
      setSwapType('pegout')
      if (to.nativeSymbol !== from.nativeSymbol) {
        return [false]
      }

      if (from.onPnetworkV2 && !to.isNative && (!to.onPnetworkV2 || to.isPseudoNative)) {
        return [false]
      }

      if (from.isPseudoNative && !to.isNative) {
        return [false]
      }

      return [true]
    }

    setSwapType(null)
    return [false]
  }, [from, to, assets])

  // NOTE: default selection
  useMemo(() => {
    if (assets.length > 0 && !assetsLoaded) {
      const defaultFromAsset = assets.find(({ defaultFrom }) => defaultFrom)
      const defaultToAsset = assets.find(({ defaultTo }) => defaultTo)

      if (defaultFromAsset && defaultToAsset) {
        setFrom(defaultFromAsset)
        setTo(defaultToAsset)
        setAssetsLoaded(true)
      }
    }
  }, [assets, assetsLoaded])

  // NOTE: reset data when pegin/pegout terminates
  useEffect(() => {
    if (progress.terminated) {
      setFromAmount('')
      setToAmount('')
      setAddress('')
    }
  }, [progress])

  // NOTE: change to address with a connected account
  useEffect(() => {
    if (to && wallets[to.blockchain.toLowerCase()] && wallets[to.blockchain.toLowerCase()].account)
      setAddress(wallets[to.blockchain.toLowerCase()].account)
  }, [wallets, to])

  // NOTE: calculates button text
  useEffect(() => {
    const validate = async () => {
      if (!from || !to) {
        updateSwapButton('Loading ...', true)
        return
      }

      if (!isValidSwap) {
        setAddress('')
        updateSwapButton('Invalid Swap', true)
        return
      }

      if (!onPnetworkV2) {
        updateSwapButton('Go to Legacy dApp', false, getLegacyUrl(from, to))
        return
      }

      // NOTE: if wallet is connected but balance is still null it means that we are loading balances
      if (wallets[from.blockchain.toLowerCase()] && wallets[from.blockchain.toLowerCase()].account && !from.balance) {
        updateSwapButton('Loading balances ...', true)
        return
      }

      if (wallets[to.blockchain.toLowerCase()] && wallets[to.blockchain.toLowerCase()].account && !to.balance) {
        updateSwapButton('Loading balances ...', true)
        return
      }

      if (minimumPeggable && BigNumber(fromAmount).isLessThan(minimumPeggable)) {
        updateSwapButton('Amount too low', true)
        return
      }

      // NOTE: pegin with deposit address
      if (!wallets[from.blockchain.toLowerCase()]) {
        if (swapType === 'pegin' && !(await isValidAccountByBlockchain(address, to.blockchain))) {
          updateSwapButton('Invalid Address', true)
          return
        }

        if (
          to.blockchain === 'ALGORAND' &&
          !(await maybeOptInAlgoAsset(address, parseInt(to.address, 10), updateSwapButton))
        )
          return

        updateSwapButton('Get Deposit Address')
        return
      }

      if (fromAmount === '' && !from.peginWithDepositAddress) {
        updateSwapButton('Enter an amount', true)
        return
      }

      if (swapType === 'pegout' && from.blockchain === 'ALGORAND' && from.isPseudoNative && poolAmount < fromAmount) {
        updateSwapButton('Insufficient liquidity', true)
        return
      }

      // NOTE: missing from account for a non deposit address pegin
      if (!wallets[from.blockchain.toLowerCase()].account) {
        updateSwapButton('Connect Wallet')
        return
      }

      if (!address || address === '') {
        updateSwapButton('Enter an address', true)
        return
      }

      if (swapType === 'pegin' && !(await isValidAccountByBlockchain(address, to.blockchain))) {
        updateSwapButton('Invalid Address', true)
        return
      }

      // handle enabling pegout to telos evm
      if (
        swapType === 'pegout' &&
        pegoutToTelosEvmAddress &&
        (from.id === TLOS_ON_ETH_MAINNET || from.id === TLOS_ON_BSC_MAINNET) &&
        !isValidAccountByBlockchain(address, 'ETH')
      ) {
        updateSwapButton('Invalid Address', true)
        return
      }

      if (
        swapType === 'pegout' &&
        !pegoutToTelosEvmAddress &&
        !(await isValidAccountByBlockchain(address, to.blockchain))
      ) {
        updateSwapButton('Invalid Address', true)
        return
      }

      if (swapType === 'pegin' && to.blockchain === 'ALGORAND') {
        if (!(await maybeOptInAlgoAsset(address, parseInt(to.address, 10), updateSwapButton))) return
        if (to.ptokenAddress && !(await maybeOptInAlgoAsset(address, parseInt(to.ptokenAddress, 10), updateSwapButton)))
          return
      }

      if (
        swapType === 'pegout' &&
        from.blockchain === 'ALGORAND' &&
        from.isPseudoNative &&
        !(await maybeOptInAlgoApp(parseInt(from.swapperAddress, 10), updateSwapButton))
      )
        return

      updateSwapButton('Swap')
    }
    validate()
  }, [
    wallets,
    from,
    fromAmount,
    to,
    address,
    isValidSwap,
    minimumPeggable,
    swapType,
    pegoutToTelosEvmAddress,
    updateSwapButton,
    poolAmount,
    onPnetworkV2
  ])

  // NOTE: filters based on from selection
  const [filteredAssets] = useMemo(() => {
    if (from && from.isNative) {
      const filtered = assets.filter(
        ({ isNative, nativeSymbol }) => !isNative && nativeSymbol.toLowerCase() === from.nativeSymbol.toLowerCase()
      )
      if (!isValidSwap) {
        setTo(filtered[0])
      }

      return [filtered]
    }

    if (from && !from.isNative) {
      let filtered = assets.filter(
        ({ nativeSymbol, id }) => from.id !== id && from.nativeSymbol.toLowerCase() === nativeSymbol.toLowerCase()
      )
      filtered = filtered.filter(({ onPnetworkV2, isNative, isPseudoNative }) =>
        from.onPnetworkV2 ? (onPnetworkV2 && !isPseudoNative) || isNative : isNative
      )
      filtered = filtered.filter(({ isNative }) => (from.isPseudoNative ? isNative : true))
      if (!isValidSwap) {
        setTo(filtered.filter(({ isNative }) => isNative)[0])
      }
      return [filtered]
    }

    return [assets]
  }, [assets, isValidSwap, from])

  // NOTE: update amounts when the selection changes
  useEffect(() => {
    if (selectionChanged) {
      if (isPegin) {
        setFromAmount(
          toAmount !== ''
            ? BigNumber(toAmount)
                .multipliedBy(fee)
                .toFixed()
            : toAmount.toString()
        )
      }

      if (isPegout) {
        setToAmount(
          fromAmount !== ''
            ? BigNumber(fromAmount)
                .multipliedBy(fee)
                .toFixed()
            : fromAmount.toString()
        )
      }
      setSelectionChanged(false)
    }
  }, [selectionChanged, fee, isPegin, isPegout, fromAmount, toAmount])

  // NOTE: from balance is null but it has been loaded
  useEffect(() => {
    if (!from) return
    const maybeFromWithBalance = assets.find(({ id }) => from.id === id)
    if (!from.balance && maybeFromWithBalance && maybeFromWithBalance.balance) {
      setFrom(maybeFromWithBalance)
    }
  }, [assets, from])

  // NOTE: to balance is null but it has been loaded
  useEffect(() => {
    if (!to) return
    const maybeToWithBalance = assets.find(({ id }) => to.id === id)
    if (!to.balance && maybeToWithBalance && maybeToWithBalance.balance) {
      setTo(maybeToWithBalance)
    }
  }, [assets, to])

  // NOTE: update url after a selection
  useEffect(() => {
    if (from && to) {
      updateUrlForSwap(from, to)
    }
  }, [from, to])

  // NOTE: wallet selection
  const fromWallet = useWalletByBlockchain(wallets, from ? from.blockchain : null)
  const toWallet = useWalletByBlockchain(wallets, to ? to.blockchain : null)

  return {
    from,
    to,
    setFrom,
    setTo,
    address,
    setAddress,
    fromAmount,
    toAmount,
    isValidSwap,
    filteredAssets,
    fromWallet,
    toWallet,
    eta,
    poolAmount,
    onPnetworkV2,
    onChangeFromAmount,
    onChangeToAmount,
    onChangeOrder,
    onFromMax,
    onToMax,
    onSwap,
    onSelectFrom,
    onSelectTo,
    showModalFrom,
    showModalTo,
    setShowModalFrom,
    setShowModalTo,
    onCloseDepositAddressModal,
    pegoutToTelosEvmAddress,
    setPegoutToTelosEvmAddress
  }
}

const useSwapInfo = ({ from, to, bpm, swappersBalances }) => {
  return useMemo(() => {
    if (!from || !to || Object.keys(bpm).length === 0) {
      return {
        fee: 1,
        formattedFee: '-',
        estimatedSwapTime: `-`,
        show: false,
        eta: null
      }
    }

    const onPnetworkV2 = Boolean((from && from.onPnetworkV2) || (to && to.onPnetworkV2))

    // NOTE: fee hardcoded at the moment
    if (from.isNative && !to.isNative) {
      const minimumPeggable = getMinimumPeggable(to.id, 'pegin')
      const fee = getFee(from, to)
      const selectedBpm = bpm[`${to.symbol.toLowerCase()}-on-${to.blockchain.toLowerCase()}`]
      const eta = selectedBpm && selectedBpm.native ? selectedBpm.native.eta : 0
      const amounts = { ...swappersBalances }
      const poolAmount =
        to.isPseudoNative && amounts[to.swapperAddress]
          ? amounts[to.swapperAddress][to.address] / 10 ** to.decimals
          : undefined
      return {
        minimumPeggable: minimumPeggable ? BigNumber(minimumPeggable).toFixed() : 0,
        formattedMinimumPeggable: minimumPeggable
          ? `${numberWithCommas(minimumPeggable.toString())} ${from.symbol}`
          : null,
        fee: 1 - fee / 100,
        formattedFee: `${fee}%`,
        estimatedSwapTime: getPeginOrPegoutMinutesEstimationByBlockchainAndEta(to.blockchain, eta),
        show: true,
        isPegin: true,
        isPegout: false,
        eta,
        poolAmount,
        onPnetworkV2
      }
    } else if (!from.isNative) {
      const minimumPeggable = getMinimumPeggable(from.id, 'pegout')
      const fee = getFee(from, to)
      const selectedBpm = bpm[`${from.symbol.toLowerCase()}-on-${from.blockchain.toLowerCase()}`]
      const eta = selectedBpm && selectedBpm.host ? selectedBpm.host.eta : 0
      const amounts = { ...swappersBalances }
      const poolAmount =
        from.isPseudoNative && amounts[from.swapperAddress]
          ? amounts[from.swapperAddress][from.ptokenAddress] / 10 ** from.decimals
          : undefined
      return {
        minimumPeggable: minimumPeggable ? BigNumber(minimumPeggable).toFixed() : 0,
        formattedMinimumPeggable: minimumPeggable
          ? `${numberWithCommas(minimumPeggable.toString())} ${from.symbol}`
          : null,
        fee: 1 - fee / 100,
        formattedFee: `${fee}%`,
        estimatedSwapTime: getPeginOrPegoutMinutesEstimationByBlockchainAndEta(from.blockchain, eta),
        show: true,
        isPegin: false,
        isPegout: true,
        eta,
        poolAmount,
        onPnetworkV2
      }
    }

    // NOTE: it should never happen
    return {
      fee: 1,
      formattedFee: '-',
      estimatedSwapTime: `-`,
      show: false
    }
  }, [from, to, bpm, swappersBalances])
}

export { useSwap, useSwapInfo }
