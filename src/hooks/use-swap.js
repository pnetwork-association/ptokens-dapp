import { useState, useEffect, useCallback, useMemo } from 'react'
import { isValidAccount } from '../utils/account-validator'
import { getPeginOrPegoutMinutesEstimation } from '../utils/estimations'
import { getFee } from '../utils/fee'
import BigNumber from 'bignumber.js'
import { updateUrlForSwap } from '../utils/url'

const useSwap = ({
  wallets,
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

  const { fee, isPegin, isPegout } = useSwapInfo(from, to)

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
      swap(from, to, fromAmount, address)
    }
  }, [from, swapButton.text, to, address, fromAmount, swap, connectWithWallet, updateSwapButton])

  const onSelectFrom = useCallback(_asset => {
    setShowModalFrom(false)
    setFrom(_asset)
    setFromAmount('')
    setToAmount('')
  }, [])

  const onSelectTo = useCallback(_asset => {
    setShowModalTo(false)
    setTo(_asset)
    setFromAmount('')
    setToAmount('')
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

      if (to.symbol !== from.symbol && to.isSpecial) {
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

    // NOTE: pegin with deposit address
    if (!wallets[from.blockchain.toLowerCase()]) {
      if (!address || address === '') {
        updateSwapButton('Enter an address', true)
        return
      }

      if (swapType === 'pegin' && !isValidAccount(to.id, address, 'pegout')) {
        updateSwapButton(address === '' ? 'Insert an address' : 'Invalid Address', true)
        return
      }

      if (swapType === 'pegout' && !isValidAccount(from.id, address, 'pegin')) {
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

    if (swapType === 'pegin' && !isValidAccount(to.id, address, 'pegout')) {
      updateSwapButton(address === '' ? 'Insert an address' : 'Invalid Address', true)
      return
    }

    if (swapType === 'pegout' && !isValidAccount(from.id, address, 'pegin')) {
      updateSwapButton(address === '' ? 'Insert an address' : 'Invalid Address', true)
      return
    }

    updateSwapButton('Swap')
  }, [wallets, from, fromAmount, to, address, isValidSwap, swapType, updateSwapButton])

  // NOTE: filters based on from selection
  const [filteredAssets] = useMemo(() => {
    if (from && !from.isPtoken) {
      const filtered = assets.filter(
        ({ name, isPtoken, isSpecial }) =>
          (isPtoken && name.toLowerCase() === 'p' + from.symbol.toLowerCase()) ||
          (isSpecial && name.toLowerCase() === from.symbol.toLowerCase())
      )

      if (!isValidSwap) {
        setTo(filtered[0])
      }

      return [filtered]
    }

    if (from && from.isPtoken) {
      const filtered = assets.filter(
        ({ nativeSymbol, isPtoken }) =>
          !isPtoken &&
          (from.name.slice(1).toLowerCase() === nativeSymbol.toLowerCase() ||
            from.name.toLowerCase() === nativeSymbol.toLowerCase())
      )

      if (!isValidSwap) {
        setTo(filtered[0])
      }

      return [filtered]
    }

    return [assets]
  }, [assets, from])

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
    onCloseDepositAddressModal
  }
}

const useSwapInfo = (_from, _to) => {
  return useMemo(() => {
    if (!_from || !_to) {
      return {
        fee: 1,
        formattedFee: '-',
        estimatedSwapTime: `-`,
        show: false
      }
    }

    // NOTE: fee hardcoded at the moment
    if (!_from.isPtoken && _to.isPtoken) {
      const fee = getFee(_to.id, 'pegin')
      return {
        fee: 1 - fee / 100,
        formattedFee: `${fee}%`,
        estimatedSwapTime: `~${getPeginOrPegoutMinutesEstimation(_to.nativeBlockchain)} minutes`,
        show: true,
        isPegin: true,
        isPegout: false
      }
    } else if (_from.isPtoken && !_to.isPtoken) {
      const fee = getFee(_from.id, 'pegout')
      return {
        fee: 1 - fee / 100,
        formattedFee: `${fee}%`,
        estimatedSwapTime: `~${getPeginOrPegoutMinutesEstimation(_from.blockchain)} minutes`,
        show: true,
        isPegin: false,
        isPegout: true
      }
    }

    // NOTE: it should never happen
    return {
      fee: 1,
      formattedFee: '-',
      estimatedSwapTime: `-`,
      show: false
    }
  }, [_from, _to])
}

export { useSwap, useSwapInfo }
