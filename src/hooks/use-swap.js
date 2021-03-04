import { useState, useEffect, useCallback, useMemo } from 'react'
import { isValidAccount } from '../utils/account-validator'

const useSwap = ({ wallets, assets, connectWithWallet, swap, progress, depositAddress }) => {
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [address, setAddress] = useState('')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [swapType, setSwapType] = useState(null)
  const [action, setAction] = useState('')

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
    if (action === 'Connect Wallet') {
      connectWithWallet(from.blockchain)
    }

    if (action === 'Get Deposit Address' || action === 'Swap') {
      setAction(action === 'Swap' ? 'Swapping ...' : 'Generating ...')
      swap(from, to, fromAmount, address)
    }
  }, [from, action, to, address, fromAmount, swap, connectWithWallet])

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

  useEffect(() => {
    if (from) {
      setFrom(assets.find(({ id }) => id === from.id))
    }
    if (to) {
      setTo(assets.find(({ id }) => id === to.id))
    }
  }, [assets, to, from])

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
    if (!from || !to || assets.length === 0) {
      setAction('Loading ...')
      return
    }

    if (!isValidSwap) {
      setAddress('')
      setAction('Invalid Swap')
      return
    }

    // NOTE: pegin with deposit address
    if (!wallets[from.blockchain.toLowerCase()]) {
      if (!address || address === '') {
        setAction('Enter an address')
        return
      }

      if (swapType === 'pegin' && !isValidAccount(to.id, address, 'pegout')) {
        setAction('Invalid Address')
        return
      }

      if (swapType === 'pegout' && !isValidAccount(from.id, address, 'pegin')) {
        setAction('Invalid Address')
        return
      }

      setAction('Get Deposit Address')
      return
    }

    if (!wallets[from.blockchain.toLowerCase()].account) {
      setAction('Connect Wallet')
      return
    }

    if (fromAmount === '' && (from.blockchain !== 'BTC' || from.blockchain !== 'LTC' || from.blockchain !== 'DOGE')) {
      setAction('Enter an amount')
      return
    }

    if (!address || address === '') {
      setAction('Enter an address')
    }

    if (swapType === 'pegin' && !isValidAccount(to.id, address, 'pegout')) {
      setAction('Invalid Address')
      return
    }

    if (swapType === 'pegout' && !isValidAccount(from.id, address, 'pegin')) {
      setAction('Invalid Address')
      return
    }

    setAction('Swap')
  }, [wallets, assets, from, fromAmount, to, address, isValidSwap, swapType, setAddress])

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

  // NOTE: reset button text immediately after the deposit address is generated
  useEffect(() => {
    if (!from) return
    if (depositAddress) {
      setAction(!wallets[from.blockchain.toLowerCase()] ? 'Get Deposit Address' : 'Swap')
    }
  }, [depositAddress, from, wallets])

  return {
    action,
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
    onSwap
  }
}

export { useSwap }
