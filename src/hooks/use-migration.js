import { useState, useEffect, useCallback, useMemo } from 'react'
import { useWalletByBlockchain } from './use-wallets'
import history from '../utils/history'
import { PBTC_ON_ETH_MAINNET_V2_MIGRATION } from '../constants'
import BigNumber from 'bignumber.js'

const useMigration = ({
  wallets,
  assets,
  connectWithWallet,
  migrate,
  progress,
  migrateButton,
  updateMigrateButton
}) => {
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, _setToAmount] = useState('')
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  const setToAmount = useCallback(
    _amount => {
      if (_amount === '' || parseFloat(_amount) === 0) {
        _setToAmount(_amount)
        return
      }

      if (to && to.id === PBTC_ON_ETH_MAINNET_V2_MIGRATION) {
        _setToAmount(_amount)
        return
      }

      _setToAmount(`~${_amount}`)
    },
    [to]
  )

  const onChangeFromAmount = useCallback(
    _amount => {
      setFromAmount(_amount)
      setToAmount(_amount)
    },
    [setToAmount]
  )

  const onChangeToAmount = useCallback(
    _amount => {
      setToAmount(_amount)
      setFromAmount(_amount)
    },
    [setToAmount]
  )

  const onFromMax = useCallback(() => {
    const amount = BigNumber(from.balance).toFixed()
    setFromAmount(amount)
    setToAmount(amount)
  }, [from, setToAmount])

  const onMigrate = useCallback(() => {
    if (migrateButton.text === 'Connect Wallet') {
      connectWithWallet(from.blockchain)
    }

    if (migrateButton.text === 'Migrate') {
      updateMigrateButton('Migrating ...')

      const strategy = history.location.pathname.split('/')[2]

      migrate(strategy, fromAmount, from, to)
    }
  }, [from, migrateButton.text, to, fromAmount, migrate, connectWithWallet, updateMigrateButton])

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
    }
  }, [progress, setToAmount])

  // NOTE: calculates button text
  useEffect(() => {
    if (!from || !to) {
      updateMigrateButton('Loading ...', true)
      return
    }

    // NOTE: if wallet is connected but balance is still null it means that we are loading balances
    if (wallets[from.blockchain.toLowerCase()] && wallets[from.blockchain.toLowerCase()].account && !from.balance) {
      updateMigrateButton('Loading balances ...', true)
      return
    }

    if (wallets[to.blockchain.toLowerCase()] && wallets[to.blockchain.toLowerCase()].account && !to.balance) {
      updateMigrateButton('Loading balances ...', true)
      return
    }

    if (!wallets[from.blockchain.toLowerCase()].account) {
      updateMigrateButton('Connect Wallet')
      return
    }

    if (fromAmount === '') {
      updateMigrateButton('Enter an amount', true)
      return
    }

    updateMigrateButton('Migrate')
  }, [wallets, from, fromAmount, to, updateMigrateButton])

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
      //updateUrlForSwap(from, to)
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
    fromAmount,
    toAmount,
    fromWallet,
    toWallet,
    onChangeFromAmount,
    onChangeToAmount,
    onFromMax,
    onMigrate
  }
}

export { useMigration }
