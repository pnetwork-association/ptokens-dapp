import { useState, useEffect, useCallback, useMemo } from 'react'
import { isValidAccountByBlockchain } from '../utils/account-validator'
import { getReadOnlyProviderByBlockchain } from '../utils/read-only-providers'
import { getSwapFees, computeSwapAmount } from '../utils/fee'
import BigNumber from 'bignumber.js'
import { getLegacyUrl, updateUrlForSwap } from '../utils/url'
import { useWalletByBlockchain } from './use-wallets'
import { TLOS_ON_BSC_MAINNET, TLOS_ON_ETH_MAINNET } from '../constants'
import { PBTC_ON_ETH_POOL, CURVE_MIN_AMOUNT, CURVE_MAX_AMOUNT } from '../constants'
import { maybeOptInAlgoApp, maybeOptInAlgoAsset } from '../store/swap/utils/opt-in-algo'
import { useRef } from 'react'
import curve from '@curvefi/api'
import { sendEvent } from '../ga4'
import { useSwapInfo } from './use-swap-info'
import { isValidSwap } from '../utils/swap-valildator'

const useSwap = ({
  wallets,
  bpm,
  swappersBalances,
  assets,
  connectWithWallet,
  swap,
  progress,
  swapButton,
  updateSwapButton,
  hideDepositAddressModal,
  setTosShow,
  setAddressWarningShow,
}) => {
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [address, setAddress] = useState('')
  const [fees, setFees] = useState(null)
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [showModalFrom, setShowModalFrom] = useState(false)
  const [showModalTo, setShowModalTo] = useState(false)
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const [pegoutToTelosEvmAddress, setPegoutToTelosEvmAddress] = useState(false)
  const ToSRef = useRef({ isAccepted: false, isRefused: false })
  const curveRef = useRef(null)
  const [disableToInput, setDisableToInput] = useState(false)
  const [disableFromInput, setDisableFromInput] = useState(false)
  const [curveState, setCurveState] = useState(false)
  const [curveImpact, setCurveImpact] = useState(0)
  const [curvePoolName, setCurvePoolName] = useState('')
  const AddressWarningRef = useRef({ proceed: false, doNotProceed: false })

  useEffect(() => {
    async function _getFees() {
      const fees = await getSwapFees(from, to)
      setFees(fees)
    }
    if (from && to) {
      setFees(null)
      _getFees()
    }
  }, [from, to])

  useEffect(() => {
    let curveExpected = 0
    let curveImpact = 0

    async function calcWithNewAmount(_amount) {
      if (_amount && _amount > CURVE_MIN_AMOUNT) {
        try {
          if (_amount > CURVE_MAX_AMOUNT) _amount = CURVE_MAX_AMOUNT
          curveExpected = await curveRef.current[0]
            .getPool(PBTC_ON_ETH_POOL)
            .swapExpected(curveRef.current[1], curveRef.current[2], _amount)
          curveImpact = await curveRef.current[0]
            .getPool(PBTC_ON_ETH_POOL)
            .swapPriceImpact(curveRef.current[1], curveRef.current[2], _amount)
          curveImpact = curveImpact.toString().slice(0, 6)
          setCurveImpact(curveImpact)
        } catch (_err) {
          curveExpected = 0
        }
      } else {
        curveExpected = 0
        setCurveImpact(0)
      }
      setToAmount(computeSwapAmount(fees, curveExpected, 'to'))
    }

    if (curveRef.current) {
      calcWithNewAmount(fromAmount)
    }
  }, [fees, fromAmount])

  useEffect(() => {
    async function curveInit() {
      const provider = getReadOnlyProviderByBlockchain(from.blockchain.toUpperCase())
      await curve.init('Web3', { externalProvider: provider }, { chainId: from.curveChainId })
      await curve.fetchFactoryPools()
      curveRef.current = [curve, from.address, from.swapToAddress]
      setCurvePoolName(curveRef.current[0].getPool(PBTC_ON_ETH_POOL).fullName)
      setDisableFromInput(false)
      setCurveState(true)
    }

    if (from && from.requiresCurve) {
      setDisableToInput(true)
      if (!curveRef.current) {
        curveInit()
      }
    } else if (curveRef.current) {
      setDisableToInput(false)
      setDisableFromInput(false)
      curveRef.current = null
      setCurveState(false)
      setCurvePoolName('')
    }
  }, [fromAmount, to, from, curveRef])

  const onPnetworkV2 = Boolean((from && from.onPnetworkV2) || (to && to.onPnetworkV2))

  const { eta, poolAmount } = useSwapInfo({
    from,
    to,
    fees,
    bpm,
    swappersBalances,
    fromAmount,
  })

  const onChangeFromAmount = useCallback(
    (_amount, _source) => {
      setFromAmount(_amount)
      if (_source.source === 'event') setToAmount(computeSwapAmount(fees, _amount, 'to'))
    },
    [fees]
  )

  const onChangeToAmount = useCallback(
    (_amount, _source) => {
      setToAmount(_amount)
      if (_source.source === 'event') setFromAmount(computeSwapAmount(fees, _amount, 'from'))
    },
    [fees]
  )

  const onChangeOrder = useCallback(() => {
    const currentFrom = from
    setFrom(to)
    setTo(currentFrom)
    setPegoutToTelosEvmAddress(false)
  }, [from, to])

  const onFromMax = useCallback(() => {
    const amount = from.balance
    setFromAmount(BigNumber(amount).toFixed())
    setToAmount(computeSwapAmount(fees, amount, 'to'))
  }, [from, fees])

  const onToMax = useCallback(() => {
    const amount = to.balance
    setToAmount(BigNumber(amount).toFixed())
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
      swap(from, to, fromAmount, address, {
        pegoutToTelosEvmAddress,
      })
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

    if (swapButton.text === 'Get Deposit Address' || swapButton.text === 'Swap') {
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
    pegoutToTelosEvmAddress,
    connectWithWallet,
    setTosShow,
    updateSwapButton,
    setAddressWarningShow,
  ])

  const onSelectFrom = useCallback((_asset) => {
    setShowModalFrom(false)
    setFrom(_asset)
    if (_asset.requiresCurve) setDisableFromInput(true)
    setFromAmount('')
    setToAmount('')
    setPegoutToTelosEvmAddress(false)
  }, [])

  const onSelectTo = useCallback((_asset) => {
    setShowModalTo(false)
    setTo(_asset)
    setFromAmount('')
    setToAmount('')
    setPegoutToTelosEvmAddress(false)
  }, [])

  const onCloseDepositAddressModal = useCallback(() => {
    updateSwapButton(!wallets[from.blockchain.toLowerCase()] ? 'Get Deposit Address' : 'Swap')
    hideDepositAddressModal()
  }, [from, wallets, updateSwapButton, hideDepositAddressModal])

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
    if (to && wallets[to.blockchain.toLowerCase()] && wallets[to.blockchain.toLowerCase()].account)
      setAddress(wallets[to.blockchain.toLowerCase()].account)
  }, [wallets, to])

  // NOTE: calculates button text
  useEffect(() => {
    const validate = async () => {
      if (from && from.requiresCurve && !curveState) {
        updateSwapButton('Loading wBTC Curve pool ...', true)
        setDisableFromInput(true)
        return
      }

      if (!from || !to) {
        updateSwapButton('Loading ...', true)
        return
      }

      if (from.id === 'GALA' && to.id === 'GALA_ON_BSC_MAINNET') {
        updateSwapButton('Disabled Swap', true)
        return
      }

      if (!onPnetworkV2) {
        updateSwapButton('Go to Legacy dApp', false, getLegacyUrl(from, to))
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
      if (wallets[from.blockchain.toLowerCase()] && wallets[from.blockchain.toLowerCase()].account && !from.balance) {
        updateSwapButton('Loading balances ...', true)
        return
      }

      if (wallets[to.blockchain.toLowerCase()] && wallets[to.blockchain.toLowerCase()].account && !to.balance) {
        updateSwapButton('Loading balances ...', true)
        return
      }

      // NOTE: pegin with deposit address
      if (!wallets[from.blockchain.toLowerCase()]) {
        if (!address || address === '') {
          updateSwapButton('Enter an address', true)
          return
        }

        if (from.isNative && !(await isValidAccountByBlockchain(address, to.blockchain))) {
          updateSwapButton('Invalid Address', true)
          return
        }

        if (
          to.blockchain === 'ALGORAND' &&
          !(await maybeOptInAlgoAsset(address, parseInt(to.address, 10), updateSwapButton))
        )
          return

        updateSwapButton('Get Deposit Address')
        return
      }

      if (fromAmount === '' && !from.peginWithDepositAddress) {
        updateSwapButton('Enter an amount', true)
        return
      }

      if (!from.isNative && from.blockchain === 'ALGORAND' && from.isPseudoNative && poolAmount < fromAmount) {
        updateSwapButton('Insufficient liquidity', true)
        return
      }

      // NOTE: missing from account for a non deposit address pegin
      if (!wallets[from.blockchain.toLowerCase()].account) {
        updateSwapButton('Connect Wallet')
        return
      }

      if (!address || address === '') {
        updateSwapButton('Enter an address', true)
        return
      }

      if (from.isNative && !(await isValidAccountByBlockchain(address, to.blockchain))) {
        updateSwapButton('Invalid Address', true)
        return
      }

      // handle enabling pegout to telos evm
      if (
        !from.isNative &&
        pegoutToTelosEvmAddress &&
        (from.id === TLOS_ON_ETH_MAINNET || from.id === TLOS_ON_BSC_MAINNET) &&
        !isValidAccountByBlockchain(address, 'ETH')
      ) {
        updateSwapButton('Invalid Address', true)
        return
      }

      if (!from.isNative && !pegoutToTelosEvmAddress && !(await isValidAccountByBlockchain(address, to.blockchain))) {
        updateSwapButton('Invalid Address', true)
        return
      }

      if (from.isNative && to.blockchain === 'ALGORAND') {
        if (!(await maybeOptInAlgoAsset(address, parseInt(to.address, 10), updateSwapButton))) return
        if (to.ptokenAddress && !(await maybeOptInAlgoAsset(address, parseInt(to.ptokenAddress, 10), updateSwapButton)))
          return
      }

      if (
        !from.isNative &&
        from.blockchain === 'ALGORAND' &&
        from.isPseudoNative &&
        !(await maybeOptInAlgoApp(parseInt(from.swapperAddress, 10), updateSwapButton))
      )
        return

      updateSwapButton('Swap')
    }
    validate()
  }, [
    wallets,
    from,
    fromAmount,
    toAmount,
    to,
    assets,
    address,
    pegoutToTelosEvmAddress,
    updateSwapButton,
    poolAmount,
    onPnetworkV2,
    curveState,
  ])

  // NOTE: filters based on from selection
  const filteredAssets = useMemo(() => {
    if (from) {
      const filtered = assets.filter((_asset) => isValidSwap(from, _asset, assets))
      if (!isValidSwap(from, to, assets)) setTo(filtered.find(({ isNative }) => isNative) || filtered[0])
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
    poolAmount,
    onPnetworkV2,
    onChangeFromAmount,
    onChangeToAmount,
    disableToInput,
    disableFromInput,
    curvePoolName,
    curveImpact,
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
    onCloseDepositAddressModal,
    pegoutToTelosEvmAddress,
    setPegoutToTelosEvmAddress,
    ToSRef,
    AddressWarningRef,
    canChangeOrder,
  }
}

export { useSwap }
