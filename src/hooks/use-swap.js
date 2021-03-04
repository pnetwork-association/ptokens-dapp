import { useState, useEffect, useCallback, useMemo } from 'react'
import { isValidAccount } from '../utils/account-validator'

const useSwap = ({ wallets, assets, connectWithWallet, swap, progress }) => {
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [address, setAddress] = useState('')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [swapType, setSwapType] = useState(null)

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

  useEffect(() => {
    if (progress.terminated) {
      setFromAmount('')
      setToAmount('')
    }
  }, [progress])

  useEffect(() => {
    if (to && wallets[to.blockchain.toLowerCase()] && wallets[to.blockchain.toLowerCase()].account) {
      setAddress(wallets[to.blockchain.toLowerCase()].account)
    }
  }, [wallets, to])

  const [action] = useMemo(() => {
    if (!from || !to || assets.length === 0) {
      return ['Loading ...']
    }

    if (!isValidSwap) {
      setAddress('')
      return ['Invalid Swap']
    }

    // NOTE: pegin with deposit address
    if (!wallets[from.blockchain.toLowerCase()]) {
      if (!address || address === '') {
        return ['Enter an address']
      }

      if (swapType === 'pegin' && !isValidAccount(to.id, address, 'pegout')) {
        return ['Invalid Address']
      }

      if (swapType === 'pegout' && !isValidAccount(from.id, address, 'pegin')) {
        return ['Invalid Address']
      }

      return ['Get Deposit Address']
    }

    if (!wallets[from.blockchain.toLowerCase()].account) {
      return ['Connect Wallet']
    }

    if (fromAmount === '' && (from.blockchain !== 'BTC' || from.blockchain !== 'LTC' || from.blockchain !== 'DOGE')) {
      return ['Enter an amount']
    }

    if (!address || address === '') {
      return ['Enter an address']
    }

    if (swapType === 'pegin' && !isValidAccount(to.id, address, 'pegout')) {
      return ['Invalid Address']
    }

    if (swapType === 'pegout' && !isValidAccount(from.id, address, 'pegin')) {
      return ['Invalid Address']
    }

    return ['Swap']
  }, [wallets, assets, from, fromAmount, to, address, isValidSwap, swapType, setAddress])

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
      swap(from, to, fromAmount, address)
    }
  }, [from, action, to, address, fromAmount, swap, connectWithWallet])

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
