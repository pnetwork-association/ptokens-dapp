import BigNumber from 'bignumber.js'
import { Blockchain } from 'ptokens-constants'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

import { AssetId } from '../constants'
import { sendEvent } from '../ga4'
import { UpdatedAsset, isNative } from '../settings/swap-assets'
import { IBpm, IProgress, ISwapButton } from '../store/swap/swap.reducer'
import { Wallets } from '../store/wallets/wallets.reducer'
import { isValidAccountByBlockchain } from '../utils/account-validator'
import { Fees, computeSwapAmount } from '../utils/fee'
import { isValidSwap } from '../utils/swap-valildator'
import { updateUrlForSwap } from '../utils/url'

import { useSwapInfo } from './use-swap-info'
import { useWalletByBlockchain } from './use-wallets'

type UseSwapArg = {
  progress: IProgress
  assets: Partial<Record<AssetId, UpdatedAsset>>
  wallets: Wallets
  bpm: IBpm
  swapButton: ISwapButton
  connectWithWallet: (_blockchain: Blockchain) => void
  setAddressWarningShow: React.Dispatch<React.SetStateAction<boolean>>
  swap: (_from: UpdatedAsset, _to: UpdatedAsset, _amount: string, _address: string) => Promise<void>
  updateSwapButton: (_text: string, _disabled?: boolean, _link?: string | null) => void
  setTosShow: React.Dispatch<React.SetStateAction<boolean>>
}

const useSwap = ({
  assets,
  wallets,
  connectWithWallet,
  swap,
  progress,
  swapButton,
  updateSwapButton,
  setTosShow,
  setAddressWarningShow,
  bpm,
}: UseSwapArg) => {
  const [from, setFrom] = useState<UpdatedAsset | null>(null)
  const [to, setTo] = useState<UpdatedAsset | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [fees, setFees] = useState<Fees | null>(null)
  const [fromAmount, setFromAmount] = useState<string>('')
  const [toAmount, setToAmount] = useState<string | null>(null)
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
    if (fees && toAmountNeedsUpdate) {
      setToAmount(computeSwapAmount(fees, fromAmount, 'to'))
    }
  }, [fees, fromAmount, toAmountNeedsUpdate])

  const { eta } = useSwapInfo({
    from,
    to,
    fees,
    amount: fromAmount,
    bpm,
  })

  const onChangeFromAmount = (_amount: string) => {
    setFromAmount(_amount)
    setToAmountNeedsUpdate(true)
  }

  const onChangeToAmount = useCallback(
    (_amount: string) => {
      setToAmount(_amount)
      setToAmountNeedsUpdate(false)
      if (_amount && fees) setFromAmount(computeSwapAmount(fees, _amount, 'from'))
    },
    [fees]
  )

  const onChangeOrder = useCallback(() => {
    const currentFrom = from
    setFrom(to)
    setTo(currentFrom)
  }, [from, to])

  const onFromMax = useCallback(() => {
    if (from) {
      const amount = from.balance
      setFromAmount(BigNumber(amount).toFixed())
      setToAmountNeedsUpdate(true)
    }
  }, [from])

  const onToMax = useCallback(() => {
    if (to && fees) {
      const amount = to.balance
      setToAmount(BigNumber(amount).toFixed())
      setToAmountNeedsUpdate(false)
      setFromAmount(computeSwapAmount(fees, amount, 'from'))
    }
  }, [to, fees])

  const onSwap = useCallback(async () => {
    function waitForToS() {
      setTosShow(!ToSRef.current.isAccepted)
      function _waitForToS(resolve: (value: unknown) => void, reject: (reason?: string) => void) {
        if (ToSRef.current.isAccepted) resolve('Terms have beed accepted')
        if (ToSRef.current.isRefused) reject('Terms have been refused')
        else {
          setTimeout(() => _waitForToS(resolve, reject), 30)
        }
      }
      return new Promise(_waitForToS)
    }

    function waitForAddressWarning() {
      setAddressWarningShow(true)
      function _waitForAddressWarning(resolve: (value: unknown) => void, reject: (reason?: string) => void) {
        if (AddressWarningRef.current.proceed) return resolve('Proceeding to selected address')
        if (AddressWarningRef.current.doNotProceed) return reject('Insert new address')
        else {
          setTimeout(() => _waitForAddressWarning(resolve, reject), 30)
        }
      }
      return new Promise(_waitForAddressWarning)
    }

    function isReasonableAddress() {
      if (
        (address && from && from.address && address.toLowerCase() === from.address.toLowerCase()) ||
        (address && to && to.address && address.toLowerCase() === to.address.toLowerCase())
      ) {
        return false
      }
      return true
    }

    async function doSwap() {
      if (from && to && address) {
        updateSwapButton(swapButton.text === 'Swap' ? 'Swapping ...' : 'Generating ...', true)
        sendEvent('swap_click', { asset_from: from.id, asset_to: to.id, from_amount: fromAmount })
        await swap(from, to, fromAmount, address)
      }
    }

    if (from && swapButton.text === 'Connect Wallet') {
      const connectToWallet = async () => {
        try {
          await waitForToS()
          connectWithWallet(from.blockchain)
        } catch (err) {
          ToSRef.current.isRefused = false
        }
      }
      await connectToWallet()
    }

    if (swapButton.text === 'Swap') {
      const swapAction = async () => {
        try {
          await waitForToS()
          if (!isReasonableAddress()) await waitForAddressWarning()
          AddressWarningRef.current.proceed = false
          await doSwap()
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
      await swapAction()
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

  const onSelectFrom = useCallback((_asset: UpdatedAsset) => {
    setShowModalFrom(false)
    setFrom(_asset)
    setFromAmount('')
    setToAmount('')
  }, [])

  const onSelectTo = useCallback((_asset: UpdatedAsset) => {
    setShowModalTo(false)
    setTo(_asset)
    setFromAmount('')
    setToAmount('')
  }, [])

  // NOTE: default selection
  useMemo(() => {
    if (Object.values(assets).length > 0 && !assetsLoaded) {
      const defaultFromAsset = Object.values(assets).find(({ defaultFrom }) => defaultFrom)
      const defaultToAsset = Object.values(assets).find(({ defaultTo }) => defaultTo)
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
    const validate = () => {
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

      if (isNative(from) && !isValidAccountByBlockchain(address, to.blockchain)) {
        updateSwapButton('Invalid Address', true)
        return
      }

      if (!isNative(from) && !isValidAccountByBlockchain(address, to.blockchain)) {
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
      const filtered = Object.values(assets).filter((_asset) => isValidSwap(from, _asset, assets))
      if (!isValidSwap(from, to, assets)) setTo(filtered[0])
      return Object.fromEntries(filtered.map((_el) => [_el.id, _el])) as Partial<Record<AssetId, UpdatedAsset>>
    }
    return assets
  }, [assets, from, to])

  // NOTE: from balance is null but it has been loaded
  useEffect(() => {
    if (!from) return
    const maybeFromWithBalance = assets[from.id]
    if (!from.balance && maybeFromWithBalance && maybeFromWithBalance.balance) {
      setFrom(maybeFromWithBalance)
    }
  }, [assets, from])

  // NOTE: to balance is null but it has been loaded
  useEffect(() => {
    if (!to) return
    const maybeToWithBalance = assets[to.id]
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
