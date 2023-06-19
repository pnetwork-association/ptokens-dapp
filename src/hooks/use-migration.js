import { useState, useEffect, useCallback, useMemo } from 'react'
import { useWalletByBlockchain } from './use-wallets'
import history from '../utils/history'
import { computeMigrationAmount } from '../utils/fee'
import BigNumber from 'bignumber.js'

const useMigration = ({
  wallets,
  assets,
  connectWithWallet,
  migrate,
  progress,
  migrateButton,
  updateMigrateButton,
}) => {
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  const onChangeFromAmount = useCallback(
    (_amount) => {
      setFromAmount(_amount)
      setToAmount(computeMigrationAmount(from, to, _amount, 'to'))
    },
    [from, to]
  )

  const onChangeToAmount = useCallback(
    (_amount) => {
      setToAmount(_amount)
      setFromAmount(computeMigrationAmount(from, to, _amount, 'from'))
    },
    [from, to]
  )

  const onFromMax = useCallback(() => {
    const amount = BigNumber(from.balance).toFixed()
    setFromAmount(amount)
    setToAmount(computeMigrationAmount(from, to, amount, 'to'))
  }, [from, to])

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
    if (wallets[from.blockchain] && wallets[from.blockchain].account && !from.balance) {
      updateMigrateButton('Loading balances ...', true)
      return
    }

    if (wallets[to.blockchain] && wallets[to.blockchain].account && !to.balance) {
      updateMigrateButton('Loading balances ...', true)
      return
    }

    if (!wallets[from.blockchain].account) {
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
    onMigrate,
  }
}

export { useMigration }
