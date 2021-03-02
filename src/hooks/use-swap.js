import { useState, useEffect, useCallback } from 'react'

const useSwap = ({ wallets, assets }) => {
  const [action, setAction] = useState(null)
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [address, setAddress] = useState('')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')

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
      setToAmount(_amount !== '' ? _amount * 1 : _amount)
    },
    [setFromAmount, setToAmount]
  )

  const onChangeToAmount = useCallback(
    _amount => {
      setToAmount(_amount)
      setFromAmount(_amount !== '' ? _amount * 1 : _amount)
    },
    [setToAmount, setFromAmount]
  )

  const onChangeOrder = useCallback(() => {
    const currentFrom = from
    setFrom(to)
    setTo(currentFrom)
  })

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
    onChangeOrder
  }
}

export { useSwap }
