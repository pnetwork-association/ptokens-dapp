import { useState, useEffect, useCallback, useMemo } from 'react'
import { isValidAccount } from '../utils/account-validator'

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

  const onChangeFromAmount = useCallback(
    _amount => {
      setFromAmount(_amount)
      // NOTE: when fees will be introduces we need to change 1
      setToAmount(_amount !== '' ? (_amount * 1).toString() : _amount.toString())
    },
    [setFromAmount, setToAmount]
  )

  const onChangeToAmount = useCallback(
    _amount => {
      setToAmount(_amount)
      setFromAmount(_amount !== '' ? (_amount * 1).toString() : _amount.toString())
    },
    [setToAmount, setFromAmount]
  )

  const onChangeOrder = useCallback(() => {
    const currentFrom = from
    setFrom(to)
    setTo(currentFrom)
  }, [setFrom, from, to])

  const onFromMax = useCallback(() => {
    const amount = from.balance
    setFromAmount(amount)
    setToAmount(amount !== '' ? (amount * 1).toString() : amount.toString())
  }, [setFromAmount, from])

  const onToMax = useCallback(() => {
    const amount = to.balance
    setFromAmount(amount)
    setToAmount(amount !== '' ? (amount * 1).toString() : amount.toString())
  }, [setToAmount, to])

  const onSwap = useCallback(() => {
    if (swapButton.text === 'Connect Wallet') {
      connectWithWallet(from.blockchain)
    }

    if (swapButton.text === 'Get Deposit Address' || swapButton.text === 'Swap') {
      updateSwapButton(swapButton.text === 'Swap' ? 'Swapping ...' : 'Generating ...', true)
      swap(from, to, fromAmount, address)
    }
  }, [from, swapButton.text, to, address, fromAmount, swap, connectWithWallet, updateSwapButton])

  const onSelectFrom = useCallback(
    _asset => {
      setShowModalFrom(false)
      setFrom(_asset)
    },
    [setFrom]
  )

  const onSelectTo = useCallback(
    _asset => {
      setShowModalTo(false)
      setTo(_asset)
    },
    [setTo]
  )

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

      if (to.symbol.slice(1) !== from.symbol) {
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
    if (!assetsLoaded && assets.length > 0) {
      setFrom(assets.find(({ symbol }) => symbol === 'BTC'))
      setTo(assets.find(({ symbol }) => symbol === 'PBTC'))
      setAssetsLoaded(true)
    }
  }, [assets, assetsLoaded, setFrom, setTo])

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

    if (fromAmount === '' && (from.blockchain !== 'BTC' || from.blockchain !== 'LTC' || from.blockchain !== 'DOGE')) {
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
  }, [wallets, from, fromAmount, to, address, isValidSwap, swapType, setAddress, updateSwapButton])

  // NOTE: filters based on from selection
  const [filteredAssets] = useMemo(() => {
    if (from && !from.isPtoken) {
      const filtered = assets.filter(
        ({ name, isPtoken }) =>
          isPtoken &&
          (name === 'p' + from.symbol ||
            (name === 'PNT' && name === from.symbol) ||
            (name === 'PTERIA' && name === from.symbol))
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
          (from.name.slice(1) === nativeSymbol ||
            (from.name === 'PNT' && from.name === nativeSymbol) ||
            (from.name === 'PTERIA' && from.name === nativeSymbol))
      )

      if (!isValidSwap) {
        setTo(filtered[0])
      }

      return [filtered]
    }

    return [assets]
  }, [assets, from, isValidSwap])

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

export { useSwap }
