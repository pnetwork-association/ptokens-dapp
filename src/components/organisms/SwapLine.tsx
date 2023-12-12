import { RiArrowDownSLine } from "react-icons/ri"
import { useContext, useEffect, useState } from "react"
import { useBalance, useAccount } from 'wagmi'
import { pTokensAsset } from "ptokens-entities"
import cn from "classnames"
import { createPortal } from 'react-dom'

import AssetsModal from "./AssetsModal"
import swapAssets, { Asset } from "../../constants/swap-assets"
import ChainsDropdown from "./ChainsDropdown"
import swapChains, { Chain, getChainByNetworkId } from "../../constants/swap-chains"
import { SwapContext } from "../../app/ContextProvider"
import { nativeToWei, weiToNative } from "../../utils/amount-utils"

type SwapLineProps = {
  title: string
  setAsset: (arg0: Asset) => void
  selectedAsset: Asset
  setChain: (arg0: Chain) => void
  selectedChain: Chain
  originPTokenAsset: pTokensAsset | undefined
  originChain?: Chain
  destination?: boolean
}

type TrangeSlider = {
  value: string
  disabled: boolean
}

const SwapLine = ({title, selectedAsset, setAsset, selectedChain, setChain, destination = false, originPTokenAsset}: SwapLineProps): JSX.Element => {
  const swapContext = useContext(SwapContext)
  const [assetModalOpen, setAssetModalOpen] = useState(false)
  const [rangeStatus, setRangeStatus] = useState<TrangeSlider>({value: '0', disabled: true})
  const { address, isDisconnected } = useAccount()
  const assetAddress = originPTokenAsset?.assetTokenAddress
  const assetChainId = originPTokenAsset && getChainByNetworkId(originPTokenAsset?.networkId)?.chainId
  const { data, isError, isLoading } = useBalance({
    address: address || undefined,
    token: assetAddress as `0x${string}` || undefined,
    chainId: assetChainId || undefined,
  })
  const isPTokenLoading = !originPTokenAsset || originPTokenAsset.networkId !== selectedAsset.networkId

  const tourId1 = destination ? 'destinationBtnId' : 'originBtnId'
  const tourId2 = destination ? 'destinationInputId' : 'originInputId'
  const tourId3 = destination ? 'destinationChainId' : 'originChainId'

  const rangeSliderStyle = cn({
    "btn btn-secondary btn-xs mr-5 hover:text-blue-600 hover:bg-transparent" : true,
    "text-blue-600": swapContext?.swapAmount.amount == data?.formatted,
  })

  const setAmount = (intAmount: bigint, amount: string) => {
    if (!swapContext)
      throw new Error('Error in retreiving swap context')
    swapContext.setSwapAmount({
      bigIntAmount: intAmount ? intAmount : 0n,
      amount: amount
    })
  }

  const setDestAmount = (intAmount: bigint, decimals: number) => {
    if (!swapContext)
      throw new Error('Error in retreiving swap context')
    const expectedAmount = intAmount - 200n /*-  swapContext.interimFee - swapContext.DestinationFee */ // TODO use global fees

    swapContext.setReceiveAmount(weiToNative(expectedAmount.toString(), decimals))
  }

  const handleRangeStep = () => {
    if (data) {
      const step = Number(data?.formatted) / 100
      return Number(rangeStatus.value) > (Number(data?.formatted) - step) ? step : step.toFixed(5)
    }
    return '0'
  }

  const handleOriginChange = (event: any) => {
    if (!swapContext)
      throw new Error('Error in retreiving swap context')
    const amount = event.target.value
    if (data) {
      const intAmount = BigInt(nativeToWei(amount, data.decimals))
      if (intAmount && data && intAmount > data.value) {
        setAmount(data.value, data.formatted)
        setDestAmount(data.value, data.decimals)
      }
      else {
        setAmount(intAmount, amount)
        setDestAmount(intAmount, data.decimals)
      }
    } else {
      swapContext.setSwapAmount(({
        bigIntAmount: 0n,
        amount: amount
      }))
      swapContext.setReceiveAmount('0')
    }
  }

  const handleMax = () => {
    if (data) {
      setAmount(data.value, data.formatted)
      setDestAmount(data.value, data.decimals)
    }
  }

  const handleDestinationChange = (event: any) => {
    if (!swapContext)
      throw new Error('Error in retreiving swap context')
    const amount = event.target.value
    if (data && Number(amount) !== 0) {
      const intAmount = BigInt(nativeToWei(amount, data.decimals))
      if (intAmount && data && intAmount > data.value - 200n) { // TODO use global fees
        setAmount(data.value, weiToNative((data.value).toString(), data.decimals))
        setDestAmount(data.value, data.decimals)
      }
      else {
        setAmount(intAmount + 200n, weiToNative((intAmount + 200n).toString(), data.decimals)) // TODO use global fees
        setDestAmount(intAmount + 200n, data.decimals) // TODO use global fees
      }
    } else {
      swapContext.setSwapAmount({ amount: '0', bigIntAmount: 0n })
      swapContext.setReceiveAmount(amount)
    }
  }

  useEffect(() => {
    if (!swapContext)
      throw new Error('Error in retreiving swap context')
    if (isDisconnected) swapContext.setSwapAmount(({
        bigIntAmount: 0n,
        amount: '0'
      }))
  }, [isDisconnected])

  useEffect(() => {
    if (!swapContext)
      throw new Error('Error in retreiving swap context')
    if (data) {
      if (swapContext.swapAmount.bigIntAmount > data.value) setRangeStatus({value: data.formatted, disabled: false})
      else setRangeStatus({value: swapContext.swapAmount.amount, disabled: false})
    } else setRangeStatus({value: '0', disabled: true})
  }, [data, swapContext?.swapAmount])

  useEffect(() => {
    setChain(Object.values(swapChains).find((chain: Chain) => chain.blockchain === selectedAsset.blockchain) as Chain)
  }, [selectedAsset])

  useEffect(() => {
    setAsset(Object.values(swapAssets).find((asset: Asset) => asset.symbol === selectedAsset.symbol && asset.blockchain === selectedChain.blockchain) as Asset)
  }, [selectedChain])

  return(
    <div className="flex flex-col justify-between items-center lg:w-11/12 max-lg:w-[95%] rounded-md bg-base-100">
      <div className="flex justify-between max-lg:items-end lg:items-center w-full rounded-md! max-lg:h-8">
        <div className="ml-4 lg:mt-2 m-0 mb-0 text-base">{title}</div>
        <div className="mr-2 lg:mr-3 mt-2 max-lg:-mb-2 lg:mb-0">
          <ChainsDropdown id={tourId3} selectedAsset={selectedAsset} selectedChain={selectedChain} setSelectedChain={setChain} />
        </div>
      </div>
      <div className="border border-base-300 mb-4 mt-1 px-0 pt-2 pb-1 rounded-md w-[95%] lg:w-[97%]">
        <div className="flex justify-between items-center w-full mb-1">
          {destination ? (
            createPortal(<AssetsModal setAsset={setAsset} open={assetModalOpen} isOpen={setAssetModalOpen} originPTokenAsset={originPTokenAsset} />, document.body)
          ) : (
            createPortal(<AssetsModal setAsset={setAsset} open={assetModalOpen} isOpen={setAssetModalOpen} />, document.body)
          )}
          <button 
            className="btn btn-md lg:btn-lg btn-secondary flex-nowrap pl-1 pr-0 lg:pl-3 lg:pr-4 lg:mr-2 ml-2 hover:scale-[102%]"
            id={tourId1}
            onClick={() => setAssetModalOpen(true)}
          >
            <img src={`/svg/${selectedAsset.image}`} className="w-7 lg:w-11" />
            {selectedAsset.symbol}
            <RiArrowDownSLine size={20} color="gray"/>
          </button>
          {destination ? (
            <input id={tourId2} type="number" placeholder="0" className="input text-right text-4xl w-full focus:outline-none mb-1 grow mr-0" value={swapContext?.receiveAmount} onChange={handleDestinationChange}/>
          ) : (
            <input id={tourId2} type="number" placeholder="0" className="input text-right text-4xl w-full focus:outline-none mb-1 grow mr-0" value={swapContext?.swapAmount.amount} onChange={handleOriginChange}/>
          )}
        </div>
        {!destination ? (
          <>
            <div className="flex justify-between items-center w-full ml-3">
              {!isDisconnected && (isLoading || isPTokenLoading) ? (
                <div className="flex justify-start items-center">
                  {/* <div className="ml-0 mt-2 mb-0 text-xs lg:text-base">Balance:</div> */}
                  <div className="ml-0 mt-0 lg:mt-2 mb-0 text-sm lg:text-base">
                    Balance: 
                  </div> 
                  <span className="loading loading-ring loading-sm pt-1 ml-2"></span> 
                </div>
              ) : isError ? (
                <div>
                    Error in loading Balance.
                  </div>
              ) : data ? (
                <div className="text-slate-200">
                  <div className="ml-0 mt-0 lg:mt-2 mb-0 text-sm lg:text-base">
                    Balance: {data.formatted}
                  </div>
                </div>
              ) : null}
              {data ? (
                <button className={rangeSliderStyle} onClick={handleMax}>Max</button>
              ) : null}
            </div>
            {data ? (
              <div className="w-full px-2">
                <input type="range" min={0} max={data?.formatted.toString()} className="range-custom range-info" value={rangeStatus.value} step={handleRangeStep()} disabled={rangeStatus.disabled} onChange={handleOriginChange} /> 
              </div> 
            ) : null}
          </>
        ) : null}
      </div>
      {/* <AssetsModal setAsset={setAsset} open={assetModalOpen} isOpen={setAssetModalOpen} /> */}
    </div>
  )
}

export default SwapLine