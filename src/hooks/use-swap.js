import { useState, useEffect, useCallback } from 'react'
import BigNumber from 'bignumber.js'

const useSwap = ({ wallets, assets, connectWithWallet, swap }) => {
  const [action, setAction] = useState(null)
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [address, setAddress] = useState('')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')

  useEffect(() => {
    if (from) {
      setFrom(assets.find(({ id }) => id === from.id))
    }

    if (to) {
      setTo(assets.find(({ id }) => id === to.id))
    }
  }, [assets, to, from])

  useEffect(() => {
    if (to && wallets[to.blockchain.toLowerCase()].account) {
      setAddress(wallets[to.blockchain.toLowerCase()].account)
    }
  }, [wallets, to])

  useEffect(() => {
    if (!from || assets.length === 0) {
      setAction('Loading ...')
      return
    }

    // NOTE: pegin with deposit address
    if (!wallets[from.blockchain.toLowerCase()]) {
      setAction('Get Deposit Address')
      return
    }

    if (!wallets[from.blockchain.toLowerCase()].account) {
      setAction('Connect Wallet')
      return
    }

    setAction('Swap')
  }, [wallets, assets, from])

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
    const amount = BigNumber(from.balance)
      .dividedBy(10 ** from.decimals)
      .toFixed()
    setFromAmount(amount)
    setToAmount(amount !== '' ? (amount * 1).toString() : amount.toString())
  }, [setFromAmount, from])

  const onToMax = useCallback(() => {
    const amount = BigNumber(to.balance)
      .dividedBy(10 ** to.decimals)
      .toFixed()
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

  return {
    action,
    setAction,
    from,
    to,
    setFrom,
    setTo,
    address,
    setAddress,
    fromAmount,
    toAmount,
    onChangeFromAmount,
    onChangeToAmount,
    onChangeOrder,
    onFromMax,
    onToMax,
    onSwap
  }
}

export { useSwap }
