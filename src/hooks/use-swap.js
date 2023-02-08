import { useState, useEffect, useCallback, useMemo } from 'react'
import { isValidAccountByBlockchain } from '../utils/account-validator'
import { getReadOnlyProviderByBlockchain } from '../utils/read-only-providers'
import { getPeginOrPegoutMinutesEstimationByBlockchainAndEta } from '../utils/estimations'
import { getFee, getFeeFactor, computeAmount, getFormattedFee } from '../utils/fee'
import BigNumber from 'bignumber.js'
import { getLegacyUrl, updateUrlForSwap } from '../utils/url'
import { useWalletByBlockchain } from './use-wallets'
import getMinimumPeggable from '../utils/minimum-peggables'
import { numberWithCommas } from '../utils/amount-utils'
import { TLOS_ON_BSC_MAINNET, TLOS_ON_ETH_MAINNET } from '../constants'
import { PBTC_ON_ETH_POOL, CURVE_MIN_AMOUNT, CURVE_MAX_AMOUNT } from '../constants'
import { getAssetById } from '../store/swap/swap.selectors'
import { maybeOptInAlgoApp, maybeOptInAlgoAsset } from '../store/swap/utils/opt-in-algo'
import ReactGA from 'react-ga4'
import { useRef } from 'react'
import { chainIdToTypeMap, BlockchainType } from 'ptokens-constants'
import curve from '@curvefi/api'

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
  setAddressWarningShow
}) => {
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [address, setAddress] = useState('')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [swapType, setSwapType] = useState(null)
  const [showModalFrom, setShowModalFrom] = useState(false)
  const [showModalTo, setShowModalTo] = useState(false)
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const [selectionChanged, setSelectionChanged] = useState(false)
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
    async function curveInit() {
      const provider = getReadOnlyProviderByBlockchain(from.blockchain.toUpperCase())
      await curve.init('Web3', { externalProvider: provider }, { chainId: from.curveChainId })
      await curve.fetchFactoryPools()
      curveRef.current = [curve, from.address, from.swapToAddress]
      setCurvePoolName(curveRef.current[0].getPool(PBTC_ON_ETH_POOL).fullName)
      setDisableFromInput(false)
      setCurveState(true)
    }
  }, [fromAmount, to, from, curveRef])

  const { fee, isPegin, isPegout, eta, poolAmount, minimumPeggable, onPnetworkV2 } = useSwapInfo({
    from,
    to,
    bpm,
    swappersBalances,
    fromAmount
  })

  const onChangeFromAmount = useCallback(
    _amount => {
      setFromAmount(_amount)
      let curveExpected = 0
      let curveImpact = 0

      async function calcWithNewAmount() {
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
            console.log(_err)
            curveExpected = 0
          }
        } else {
          curveExpected = 0
          setCurveImpact(0)
        }
        setToAmount(computeAmount(from, to, curveExpected, 'to'))
      }

      if (curveRef.current) {
        calcWithNewAmount()
      } else {
        setToAmount(computeAmount(from, to, _amount, 'to'))
      }
    },
    [curveRef, from, to]
  )

  const onChangeToAmount = useCallback(
    _amount => {
      setToAmount(_amount)
      setFromAmount(computeAmount(from, to, _amount, 'from'))
    },
    [from, to]
  )

  const onChangeOrder = useCallback(() => {
    const currentFrom = from
    setFrom(to)
    setTo(currentFrom)
    setSelectionChanged(true)
    setPegoutToTelosEvmAddress(false)
  }, [from, to])

  const onFromMax = useCallback(() => {
    const amount = from.balance
    setFromAmount(BigNumber(amount).toFixed())
    setToAmount(
      amount !== ''
        ? BigNumber(amount)
            .multipliedBy(fee)
            .toFixed()
        : amount.toString()
    )
  }, [fee, from])

  const onToMax = useCallback(() => {
    const amount = to.balance
    setFromAmount(BigNumber(amount).toFixed())
    setToAmount(
      amount !== ''
        ? BigNumber(amount)
            .dividedBy(fee)
            .toFixed()
        : amount.toString()
    )
  }, [fee, to])

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
      ReactGA.event('swap_click', { asset_from: from.id, asset_to: to.id, from_amount: fromAmount })
      swap(from, to, fromAmount, address, {
        pegoutToTelosEvmAddress
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
    setAddressWarningShow
  ])

  const onSelectFrom = useCallback(_asset => {
    setShowModalFrom(false)
    setFrom(_asset)
    if (_asset.requiresCurve) setDisableFromInput(true)
    setFromAmount('')
    setToAmount('')
    setPegoutToTelosEvmAddress(false)
  }, [])

  const onSelectTo = useCallback(_asset => {
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

  // NOTE: check combination
  const [isValidSwap] = useMemo(() => {
    if (!from || !to) return [false]

    // NOTE: pegin
    if (from.isNative && !to.isNative) {
      setSwapType('pegin')
      const ptokenId = to.id

      if (to.nativeSymbol !== from.nativeSymbol) {
        return [false]
      }

      if (to.requiresCurve) {
        return [false]
      }

      const ptoken = assets.find(({ id }) => ptokenId === id)
      if (!ptoken) {
        return [false]
      }

      return [true]
    }
    // NOTE: pegout
    else if (!from.isNative) {
      setSwapType('pegout')
      if (to.id === from.id) {
        return [false]
      }

      if (to.nativeSymbol !== from.nativeSymbol) {
        return [false]
      }

      if (!from.onPnetworkV2 && !to.isNative) {
        return [false]
      }

      if (from.isPseudoNative && !to.isNative) {
        return [false]
      }

      if (to.isPseudoNative) {
        return [false]
      }

      if (!to.onPnetworkV2 && !to.isNative) {
        return [false]
      }
      if (to.requiresCurve) {
        return [false]
      }
      if (from.requiresCurve && from.blockchain === to.blockchain) {
        return [false]
      }

      return [true]
    }

    setSwapType(null)
    return [false]
  }, [from, to, assets])

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

      if (!isValidSwap) {
        setAddress('')
        updateSwapButton('Invalid Swap', true)
        return
      }

      if (!onPnetworkV2) {
        updateSwapButton('Go to Legacy dApp', false, getLegacyUrl(from, to))
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

      if (minimumPeggable && BigNumber(fromAmount).isLessThan(minimumPeggable)) {
        updateSwapButton('Amount too low', true)
        return
      }

      // NOTE: pegin with deposit address
      if (!wallets[from.blockchain.toLowerCase()]) {
        if (!address || address === '') {
          updateSwapButton('Enter an address', true)
          return
        }

        if (swapType === 'pegin' && !(await isValidAccountByBlockchain(address, to.blockchain))) {
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

      if (swapType === 'pegout' && from.blockchain === 'ALGORAND' && from.isPseudoNative && poolAmount < fromAmount) {
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

      if (swapType === 'pegin' && !(await isValidAccountByBlockchain(address, to.blockchain))) {
        updateSwapButton('Invalid Address', true)
        return
      }

      // handle enabling pegout to telos evm
      if (
        swapType === 'pegout' &&
        pegoutToTelosEvmAddress &&
        (from.id === TLOS_ON_ETH_MAINNET || from.id === TLOS_ON_BSC_MAINNET) &&
        !isValidAccountByBlockchain(address, 'ETH')
      ) {
        updateSwapButton('Invalid Address', true)
        return
      }

      if (
        swapType === 'pegout' &&
        !pegoutToTelosEvmAddress &&
        !(await isValidAccountByBlockchain(address, to.blockchain))
      ) {
        updateSwapButton('Invalid Address', true)
        return
      }

      if (swapType === 'pegin' && to.blockchain === 'ALGORAND') {
        if (!(await maybeOptInAlgoAsset(address, parseInt(to.address, 10), updateSwapButton))) return
        if (to.ptokenAddress && !(await maybeOptInAlgoAsset(address, parseInt(to.ptokenAddress, 10), updateSwapButton)))
          return
      }

      if (
        swapType === 'pegout' &&
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
    to,
    address,
    isValidSwap,
    minimumPeggable,
    swapType,
    pegoutToTelosEvmAddress,
    updateSwapButton,
    poolAmount,
    onPnetworkV2,
    curveState
  ])

  // NOTE: filters based on from selection
  const [filteredAssets] = useMemo(() => {
    if (from && from.isNative) {
      let filtered = assets.filter(
        ({ isNative, nativeSymbol, isHidden }) =>
          !isNative && !isHidden && nativeSymbol.toLowerCase() === from.nativeSymbol.toLowerCase()
      )
      filtered = filtered.filter(({ requiresCurve }) => !requiresCurve)
      if (!isValidSwap) {
        setTo(filtered[0])
      }

      return [filtered]
    }

    if (from && !from.isNative) {
      let filtered = assets.filter(
        ({ nativeSymbol, id, isHidden }) =>
          from.id !== id && !isHidden && from.nativeSymbol.toLowerCase() === nativeSymbol.toLowerCase()
      )
      filtered = filtered.filter(({ onPnetworkV2, isNative, isPseudoNative }) =>
        from.onPnetworkV2 ? (onPnetworkV2 && !isPseudoNative) || isNative : isNative
      )
      filtered = filtered.filter(({ isNative }) => (from.isPseudoNative ? isNative : true))
      filtered = filtered.filter(({ requiresCurve }) => !requiresCurve)
      filtered = filtered.filter(({ blockchain }) => from.blockchain !== blockchain)
      if (!isValidSwap) {
        setTo(filtered.filter(({ isNative }) => isNative)[0])
      }
      return [filtered]
    }

    return [assets]
  }, [assets, isValidSwap, from])

  // NOTE: update amounts when the selection changes
  useEffect(() => {
    if (selectionChanged) {
      if (isPegin) {
        setFromAmount(
          toAmount !== ''
            ? BigNumber(toAmount)
                .multipliedBy(fee)
                .toFixed()
            : toAmount.toString()
        )
      }

      if (isPegout) {
        setToAmount(
          fromAmount !== ''
            ? BigNumber(fromAmount)
                .multipliedBy(fee)
                .toFixed()
            : fromAmount.toString()
        )
      }
      setSelectionChanged(false)
    }
  }, [selectionChanged, fee, isPegin, isPegout, fromAmount, toAmount])

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
    isValidSwap,
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
    AddressWarningRef
  }
}

const useSwapInfo = ({ from, to, bpm, swappersBalances }) => {
  return useMemo(() => {
    function getEta() {
      let fromAsset = from
      if (from.requiresCurve) {
        fromAsset = getAssetById(from.pTokenId)
      }
      // ATM, the API returns untrustworthy estimates for EOS-like chains.
      // For those chains, assume the sync ETA is 0 if the BPM is > 0
      // as EOS-like chains are usually very fast.
      const eosLikeChainIds = [...chainIdToTypeMap]
        .filter(([_k, _v]) => _v === BlockchainType.EOSIO)
        .map(([_id]) => _id)
      if (!fromAsset.isNative) {
        const selectedBpm = Object.values(bpm).filter(
          _el =>
            _el.bridgeName.includes(`${fromAsset.symbol.toLowerCase()}-on-`) && _el.hostChainId === fromAsset.chainId
        )[0]
        return selectedBpm
          ? eosLikeChainIds.includes(fromAsset.chainId)
            ? selectedBpm.bpmMedianHost > 0
              ? 0
              : -1
            : selectedBpm.estimatedHostSyncTime
          : -2
      } else {
        const selectedBpm = Object.values(bpm).filter(
          _el =>
            _el.bridgeName.includes(`${fromAsset.symbol.toLowerCase()}-on-`) && _el.nativeChainId === fromAsset.chainId
        )[0]
        return selectedBpm
          ? eosLikeChainIds.includes(fromAsset.chainId)
            ? selectedBpm.bpmMedianNative > 0
              ? 0
              : -1
            : selectedBpm.estimatedNativeSyncTime
          : -2
      }
    }

    if (!from || !to) {
      return {
        fee: 1,
        formattedFee: '-',
        estimatedSwapTime: `-`,
        show: false,
        eta: null
      }
    }

    const onPnetworkV2 = Boolean((from && from.onPnetworkV2) || (to && to.onPnetworkV2))

    const eta = getEta()
    const estimatedSwapTime = getPeginOrPegoutMinutesEstimationByBlockchainAndEta(from.blockchain, eta)

    // NOTE: fee hardcoded at the moment
    if (from.isNative && !to.isNative) {
      const minimumPeggable = getMinimumPeggable(to.id, 'pegin')
      const fee = getFee(from, to)
      const amounts = { ...swappersBalances }
      const poolAmount =
        to.isPseudoNative && amounts[to.swapperAddress]
          ? amounts[to.swapperAddress][to.address] / 10 ** to.decimals
          : undefined
      return {
        minimumPeggable: minimumPeggable ? BigNumber(minimumPeggable).toFixed() : 0,
        formattedMinimumPeggable: minimumPeggable
          ? `${numberWithCommas(minimumPeggable)
              .toString()
              .replace('.', ',')} ${from.symbol}`
          : null,
        fee: getFeeFactor(fee),
        formattedFee: getFormattedFee(fee),
        estimatedSwapTime,
        show: true,
        isPegin: true,
        isPegout: false,
        eta,
        poolAmount,
        onPnetworkV2
      }
    } else if (!from.isNative) {
      const minimumPeggable = getMinimumPeggable(from.id, 'pegout')
      const fee = getFee(from, to)
      const amounts = { ...swappersBalances }
      const requiresCurve = from.requiresCurve
      const poolAmount =
        from.isPseudoNative && amounts[from.swapperAddress]
          ? amounts[from.swapperAddress][from.ptokenAddress] / 10 ** from.decimals
          : undefined
      return {
        minimumPeggable: minimumPeggable ? BigNumber(minimumPeggable).toFixed() : 0,
        formattedMinimumPeggable: minimumPeggable
          ? `${numberWithCommas(minimumPeggable)
              .toString()
              .replace('.', ',')} ${from.symbol}`
          : null,
        fee: 1 - fee / 100,
        formattedFee: `${fee}%`,
        estimatedSwapTime,
        show: true,
        isPegin: false,
        isPegout: true,
        eta,
        poolAmount,
        onPnetworkV2,
        requiresCurve
      }
    }

    // NOTE: it should never happen
    return {
      fee: 1,
      formattedFee: '-',
      estimatedSwapTime: `-`,
      show: false
    }
  }, [from, to, bpm, swappersBalances])
}

export { useSwap, useSwapInfo }
