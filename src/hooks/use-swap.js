import { useState, useEffect, useCallback, useMemo } from 'react'
import { isValidAccount, isValidAccountByBlockchain } from '../utils/account-validator'
import { getPeginOrPegoutMinutesEstimationByBlockchainAndEta } from '../utils/estimations'
import { getFee } from '../utils/fee'
import BigNumber from 'bignumber.js'
import { updateUrlForSwap } from '../utils/url'
import { useWalletByBlockchain } from './use-wallets'
import getMinimumPeggable from '../utils/minimum-peggables'
import { numberWithCommas } from '../utils/amount-utils'
import { TLOS_ON_BSC_MAINNET, TLOS_ON_ETH_MAINNET } from '../constants'

const useSwap = ({
  wallets,
  bpm,
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

  const { fee, isPegin, isPegout, eta, minimumPeggable, onPnetworkV2 } = useSwapInfo({ from, to, bpm })

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
    if (!from.isPtoken && to.isPtoken) {
      setSwapType('pegin')
      const ptokenId = to.id

      if (to.symbol.slice(1) !== from.symbol && !to.isSpecial) {
        return [false]
      }

      if (to.nativeSymbol !== from.nativeSymbol && to.isSpecial) {
        return [false]
      }

      const ptoken = assets.find(({ id }) => ptokenId === id)
      if (!ptoken) {
        return [false]
      }

      return [true]
    }
    // NOTE: pegout
    else if (from.isPtoken && !to.isPtoken) {
      setSwapType('pegout')
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
    setAddress(
      to && wallets[to.blockchain.toLowerCase()] && wallets[to.blockchain.toLowerCase()].account
        ? wallets[to.blockchain.toLowerCase()].account
        : ''
    )
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
        if (!address || address === '') {
          updateSwapButton('Enter an address', true)
          return
        }

        if (swapType === 'pegin' && !(await isValidAccount(to.id, address, 'pegout'))) {
          updateSwapButton(address === '' ? 'Insert an address' : 'Invalid Address', true)
          return
        }

        if (swapType === 'pegout' && !(await isValidAccount(from.id, address, 'pegin'))) {
          updateSwapButton(address === '' ? 'Insert an address' : 'Invalid Address', true)
          return
        }

        updateSwapButton('Get Deposit Address')
        return
      }

      // NOTE: missing from account for a non deposit address pegin
      if (!wallets[from.blockchain.toLowerCase()].account) {
        updateSwapButton('Connect Wallet')
        return
      }

      if (fromAmount === '' && !from.peginWithDepositAddress) {
        updateSwapButton('Enter an amount', true)
        return
      }

      if (!address || address === '') {
        updateSwapButton('Enter an address', true)
      }

      if (swapType === 'pegin' && !(await isValidAccount(to.id, address, 'pegout'))) {
        updateSwapButton(address === '' ? 'Insert an address' : 'Invalid Address', true)
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

      if (swapType === 'pegout' && !pegoutToTelosEvmAddress && !(await isValidAccount(from.id, address, 'pegin'))) {
        updateSwapButton('Invalid Address', true)
        return
      }

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
    updateSwapButton
  ])

  // NOTE: filters based on from selection
  const [filteredAssets] = useMemo(() => {
    if (from && !from.isPtoken) {
      const filtered = assets.filter(
        ({ isPtoken, nativeSymbol }) => isPtoken && nativeSymbol.toLowerCase() === from.nativeSymbol.toLowerCase()
      )
      if (!isValidSwap) {
        setTo(filtered[0])
      }

      return [filtered]
    }

    if (from && from.isPtoken) {
      const filtered = assets.filter(
        ({ isPtoken, nativeSymbol }) => !isPtoken && from.nativeSymbol.toLowerCase() === nativeSymbol.toLowerCase()
      )

      if (!isValidSwap) {
        setTo(filtered[0])
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

const useSwapInfo = ({ from, to, bpm }) => {
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
    if (!from.isPtoken && to.isPtoken) {
      const minimumPeggable = getMinimumPeggable(to.id, 'pegin')
      const fee = getFee(to.id, 'pegin')
      const selectedBpm = bpm[`${to.symbol.toLowerCase()}-on-${to.blockchain.toLowerCase()}`]
      const eta = selectedBpm && selectedBpm.native ? selectedBpm.native.eta : 0

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
        onPnetworkV2
      }
    } else if (from.isPtoken && !to.isPtoken) {
      const minimumPeggable = getMinimumPeggable(from.id, 'pegout')
      const fee = getFee(from.id, 'pegout')
      const selectedBpm = bpm[`${from.symbol.toLowerCase()}-on-${from.blockchain.toLowerCase()}`]
      const eta = selectedBpm && selectedBpm.host ? selectedBpm.host.eta : 0

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
  }, [bpm, from, to])
}

export { useSwap, useSwapInfo }
