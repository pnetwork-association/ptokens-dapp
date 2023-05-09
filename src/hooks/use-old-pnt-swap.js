import { useState, useEffect, useCallback, useMemo } from 'react'
import { isValidAccountByBlockchain } from '../utils/account-validator'
import BigNumber from 'bignumber.js'
import { useWalletByBlockchain } from './use-wallets'

const useSwap = ({ wallets, assets, connectWithWallet, swap, progress, swapButton, updateSwapButton }) => {
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [address, setAddress] = useState('')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  const onChangeAmount = useCallback((_amount) => {
    setFromAmount(_amount)
    setToAmount(_amount !== '' ? BigNumber(_amount).toFixed() : _amount.toString())
  }, [])

  const onMax = useCallback(() => {
    const amount = from.balance
    setFromAmount(BigNumber(amount).toFixed())
    setToAmount(amount !== '' ? BigNumber(amount).toFixed() : amount.toString())
  }, [from])

  const onSwap = useCallback(() => {
    if (swapButton.text === 'Connect Wallet') {
      connectWithWallet('BSC')
    }

    if (swapButton.text === 'Swap') {
      updateSwapButton('Swapping ...', true)
      swap(fromAmount, address)
    }
  }, [swapButton.text, fromAmount, address, swap, connectWithWallet, updateSwapButton])

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

  useEffect(() => {
    if (progress.terminated) {
      setFromAmount('')
      setToAmount('')
      setAddress('')
    }
  }, [progress])

  useEffect(() => {
    setAddress(
      to && wallets[to.blockchain.toLowerCase()] && wallets[to.blockchain.toLowerCase()].account
        ? wallets[to.blockchain.toLowerCase()].account
        : ''
    )
  }, [wallets, to])

  useEffect(() => {
    if (!from || !to) {
      updateSwapButton('Loading ...', true)
      return
    }

    if (wallets[from.blockchain.toLowerCase()] && wallets[from.blockchain.toLowerCase()].account && !from.balance) {
      updateSwapButton('Loading balances ...', true)
      return
    }

    if (wallets[to.blockchain.toLowerCase()] && wallets[to.blockchain.toLowerCase()].account && !to.balance) {
      updateSwapButton('Loading balances ...', true)
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

    if (!isValidAccountByBlockchain(address, 'BSC')) {
      updateSwapButton(address === '' ? 'Insert an address' : 'Invalid Address', true)
      return
    }

    updateSwapButton('Swap')
  }, [wallets, from, fromAmount, to, address, updateSwapButton])

  useEffect(() => {
    if (!from) return
    const maybeFromWithBalance = assets.find(({ id }) => from.id === id)
    if (!from.balance && maybeFromWithBalance && maybeFromWithBalance.balance) {
      setFrom(maybeFromWithBalance)
    }
  }, [assets, from])

  useEffect(() => {
    if (!to) return
    const maybeToWithBalance = assets.find(({ id }) => to.id === id)
    if (!to.balance && maybeToWithBalance && maybeToWithBalance.balance) {
      setTo(maybeToWithBalance)
    }
  }, [assets, to])

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
    fromWallet,
    toWallet,
    onChangeAmount,
    onMax,
    onSwap,
  }
}

export { useSwap }
