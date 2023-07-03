import BigNumber from 'bignumber.js'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

import { sendEvent } from '../ga4'
import { isValidAccountByBlockchain } from '../utils/account-validator'
import { computeSwapAmount } from '../utils/fee'
import { isValidSwap } from '../utils/swap-valildator'
import { updateUrlForSwap } from '../utils/url'

import { useSwapInfo } from './use-swap-info'
import { useWalletByBlockchain } from './use-wallets'
import { Asset } from '../settings/swap-assets'

const useSwap = ({
  wallets,
  assets,
  connectWithWallet,
  swap,
  progress,
  swapButton,
  updateSwapButton,
  setTosShow,
  setAddressWarningShow,
}) => {
  const [from, setFrom] = useState<Asset>(null)
  const [to, setTo] = useState<Asset>(null)
  const [address, setAddress] = useState<string>('')
  const [fees, setFees] = useState(null)
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState(null)
  const [showModalFrom, setShowModalFrom] = useState(false)
  const [showModalTo, setShowModalTo] = useState(false)
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const ToSRef = useRef({ isAccepted: false, isRefused: false })
  const [disableToInput] = useState(false)
  const [disableFromInput] = useState(false)
  const [toAmountNeedsUpdate, setToAmountNeedsUpdate] = useState(true)
  const AddressWarningRef = useRef({ proceed: false, doNotProceed: false })

  useEffect(() => {
    function _getFees() {
      const fees = { basisPoints: 0, networkFee: 0, minProtocolFee: 0 }
      setFees(fees)
    }
    if (from && to) {
      setFees(null)
      _getFees()
    }
  }, [from, to])

  useEffect(() => {
    if (toAmountNeedsUpdate) {
      setToAmount(computeSwapAmount(fees, fromAmount, 'to'))
    }
  }, [fees, fromAmount, toAmountNeedsUpdate])

  const { eta } = useSwapInfo({
    from,
    to,
    fees,
    fromAmount,
  })

  const onChangeFromAmount = (_amount) => {
    setFromAmount(_amount)
    setToAmountNeedsUpdate(true)
  }

  const onChangeToAmount = useCallback(
    (_amount) => {
      setToAmount(_amount)
      setToAmountNeedsUpdate(false)
      setFromAmount(computeSwapAmount(fees, _amount, 'from'))
    },
    [fees]
  )

  const onChangeOrder = useCallback(() => {
    const currentFrom = from
    setFrom(to)
    setTo(currentFrom)
  }, [from, to])

  const onFromMax = useCallback(() => {
    const amount = from.balance
    setFromAmount(BigNumber(amount).toFixed())
    setToAmountNeedsUpdate(true)
  }, [from])

  const onToMax = useCallback(() => {
    const amount = to.balance
    setToAmount(BigNumber(amount).toFixed())
    setToAmountNeedsUpdate(false)
    setFromAmount(computeSwapAmount(fees, amount, 'from'))
  }, [to, fees])

  const onSwap = useCallback(() => {
    function waitForToS() {
      setTosShow(!ToSRef.current.isAccepted)
      function _waitForToS(resolve, reject) {
        if (ToSRef.current.isAccepted) resolve('Terms have beed accepted')
        if (ToSRef.current.isRefused) reject('Terms have been refused')
        else {
          setTimeout(_waitForToS.bind(this, resolve, reject), 30)
        }
      }
      return new Promise(_waitForToS)
    }

    function waitForAddressWarning() {
      setAddressWarningShow(true)
      function _waitForAddressWarning(resolve, reject) {
        if (AddressWarningRef.current.proceed) resolve('Proceeding to selected address')
        if (AddressWarningRef.current.doNotProceed) reject('Insert new address')
        else {
          setTimeout(_waitForAddressWarning.bind(this, resolve, reject), 30)
        }
      }
      return new Promise(_waitForAddressWarning)
    }

    function isReasonableAddress() {
      if (
        (from.address && address.toLowerCase() === from.address.toLowerCase()) ||
        (to.address && address.toLowerCase() === to.address.toLowerCase())
      ) {
        return false
      }
      return true
    }

    function doSwap() {
      updateSwapButton(swapButton.text === 'Swap' ? 'Swapping ...' : 'Generating ...', true)
      sendEvent('swap_click', { asset_from: from.id, asset_to: to.id, from_amount: fromAmount })
      swap(from, to, fromAmount, address)
    }

    if (swapButton.text === 'Connect Wallet') {
      const connectToWallet = async () => {
        try {
          await waitForToS()
          connectWithWallet(from.blockchain)
        } catch (err) {
          ToSRef.current.isRefused = false
        }
      }
      connectToWallet()
    }

    if (swapButton.text === 'Swap') {
      const swapAction = async () => {
        try {
          await waitForToS()
          if (!isReasonableAddress()) await waitForAddressWarning()
          AddressWarningRef.current.proceed = false
          doSwap()
        } catch (err) {
          if (err === 'Terms have been refused') {
            ToSRef.current.isRefused = false
          }
          if (err === 'Insert new address') {
            setAddress('')
            AddressWarningRef.current.doNotProceed = false
          }
        }
      }
      swapAction()
    }
  }, [
    from,
    swapButton.text,
    to,
    address,
    fromAmount,
    swap,
    connectWithWallet,
    setTosShow,
    updateSwapButton,
    setAddressWarningShow,
  ])

  const onSelectFrom = useCallback((_asset) => {
    setShowModalFrom(false)
    setFrom(_asset)
    setFromAmount('')
    setToAmount('')
  }, [])

  const onSelectTo = useCallback((_asset) => {
    setShowModalTo(false)
    setTo(_asset)
    setFromAmount('')
    setToAmount('')
  }, [])

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
    if (to && wallets[to.blockchain] && wallets[to.blockchain].account) setAddress(wallets[to.blockchain].account)
  }, [wallets, to])

  // NOTE: calculates button text
  useEffect(() => {
    const validate = async () => {
      if (!from || !to) {
        updateSwapButton('Loading ...', true)
        return
      }

      if (!isValidSwap(from, to, assets)) {
        setAddress('')
        updateSwapButton('Invalid Swap', true)
        return
      }

      if (toAmount === null) {
        updateSwapButton('Calculating...', true)
        return
      }

      if (BigNumber(toAmount).isLessThan(0)) {
        updateSwapButton('Amount too low', true)
        return
      }
      console.info('wallets', wallets, from)
      // NOTE: if wallet is connected but balance is still null it means that we are loading balances
      if (wallets[from.blockchain] && wallets[from.blockchain].account && !from.balance) {
        updateSwapButton('Loading balances ...', true)
        return
      }

      if (wallets[to.blockchain] && wallets[to.blockchain].account && !to.balance) {
        updateSwapButton('Loading balances ...', true)
        return
      }

      if (fromAmount === '') {
        updateSwapButton('Enter an amount', true)
        return
      }

      // NOTE: missing from account for a non deposit address pegin
      if (!wallets[from.blockchain].account) {
        updateSwapButton('Connect Wallet')
        return
      }

      if (!address || address === '') {
        updateSwapButton('Enter an address', true)
        return
      }

      if (from.isNative && !isValidAccountByBlockchain(address, to.blockchain)) {
        updateSwapButton('Invalid Address', true)
        return
      }

      if (!from.isNative && !isValidAccountByBlockchain(address, to.blockchain)) {
        updateSwapButton('Invalid Address', true)
        return
      }

      updateSwapButton('Swap')
    }
    validate()
  }, [wallets, from, fromAmount, toAmount, to, assets, address, updateSwapButton])

  // NOTE: filters based on from selection
  const filteredAssets = useMemo(() => {
    if (from) {
      const filtered = assets.filter((_asset) => isValidSwap(from, _asset, assets))
      if (!isValidSwap(from, to, assets)) setTo(filtered[0])
      return filtered
    }
    return assets
  }, [assets, from, to])

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

  const canChangeOrder = isValidSwap(to, from, assets)

  // NOTE: wallet selection
  const fromWallet = useWalletByBlockchain(wallets, from ? from.blockchain : null)
  const toWallet = useWalletByBlockchain(wallets, to ? to.blockchain : null)

  return {
    from,
    to,
    fees,
    address,
    setAddress,
    fromAmount,
    toAmount,
    filteredAssets,
    fromWallet,
    toWallet,
    eta,
    onChangeFromAmount,
    onChangeToAmount,
    disableToInput,
    disableFromInput,
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
    ToSRef,
    AddressWarningRef,
    canChangeOrder,
  }
}

export { useSwap }
