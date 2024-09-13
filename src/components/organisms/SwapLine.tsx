import { RiArrowDownSLine } from "react-icons/ri"
import { useContext, useEffect, useState } from "react"
import { useBalance, useAccount } from 'wagmi'
import { pTokensAsset } from "@p.network/ptokens-entities"
import cn from "classnames"
import { createPortal } from 'react-dom'

import AssetsModal from "./AssetsModal"
import swapAssets, { Asset, HostAsset, getNativeAsset, isNative } from "../../constants/swap-assets"
import ChainsDropdown from "./ChainsDropdown"
import swapChains, { BlockChain } from "../../constants/swap-chains"
import { SwapContext } from "../../app/ContextProvider"
import { nativeToWei, weiToNative } from "../../utils/amount-utils"
import _ from "lodash"

type SwapLineProps = {
  title: string
  setAsset: (arg0: Asset) => void
  selectedAsset: Asset
  setChain: (arg0: BlockChain) => void
  selectedChain: BlockChain
  filteredChain: BlockChain
  originPTokenAsset: pTokensAsset | undefined
  originChain?: BlockChain
  destination?: boolean
}

type TrangeSlider = {
  value: string
  disabled: boolean
}

const feeThousands = 2n

const forwardNetworkFee = 100n

const networkFee = 100n

const SwapLine = ({title, selectedAsset, setAsset, selectedChain, setChain, destination = false, originPTokenAsset, filteredChain}: SwapLineProps): JSX.Element => {
  const swapContext = useContext(SwapContext)
  const [assetModalOpen, setAssetModalOpen] = useState(false)
  const [rangeStatus, setRangeStatus] = useState<TrangeSlider>({value: '0', disabled: true})
  const { address, isDisconnected } = useAccount()
  const assetAddress = originPTokenAsset && originPTokenAsset?.assetInfo.address
  const assetChainId = originPTokenAsset && originPTokenAsset?.chainId
  const { data, isError, isLoading } = useBalance({ // not working in v2
    address: address || undefined,
    token: assetAddress as `0x${string}` || undefined,
    chainId: assetChainId || undefined,
  })
  const isPTokenLoading = !destination && (!originPTokenAsset || originPTokenAsset.assetInfo.chain !== selectedAsset.chain)
  const nativeAsset = getNativeAsset(selectedAsset)

  // useEffect(() => {
  //   console.log(isPTokenLoading)
  // }, [isPTokenLoading])

  // useEffect(() => {
  //   console.log(originPTokenAsset)
  //   console.log(isError, address, assetAddress, assetChainId)
  // }, [address, assetAddress, assetChainId])

  const tourId1 = destination ? 'destinationBtnId' : 'originBtnId'
  const tourId2 = destination ? 'destinationInputId' : 'originInputId'
  const tourId3 = destination ? 'destinationChainId' : 'originChainId'

  const rangeSliderStyle = cn({
    "btn btn-secondary btn-xs mr-5 hover:text-blue-600 hover:bg-transparent" : true,
    "text-blue-600": swapContext?.swapAmount.amount == data?.formatted,
  })

  const computeAmountwithFee = (amount: bigint) => (1000n * amount - feeThousands * amount - 100n * (networkFee + forwardNetworkFee)) / 1000n

  const computeInverseAmountwithFee = (amount: bigint) => ((amount + (networkFee + forwardNetworkFee)) * 1000n) /  (1000n - feeThousands)

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
    const expectedAmount = intAmount /*-  swapContext.interimFee - swapContext.DestinationFee */ // TODO use global fees
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
        setDestAmount(computeAmountwithFee(data.value), data.decimals)
      }
      else {
        setAmount(intAmount, amount)
        setDestAmount(computeAmountwithFee(intAmount), data.decimals )
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
      setDestAmount(computeAmountwithFee(data.value), data.decimals)
    }
  }

  const handleDestinationChange = (event: any) => {
    if (!swapContext)
      throw new Error('Error in retreiving swap context')
    const amount = event.target.value
    if (data && Number(amount) !== 0) {
      const intAmount = BigInt(nativeToWei(amount, data.decimals))
      if (intAmount && data && intAmount >= computeAmountwithFee(data.value)) { // TODO use global fees
        setAmount(data.value, weiToNative((data.value).toString(), data.decimals))
        setDestAmount(computeAmountwithFee(data.value), data.decimals)
      }
      else {
        setAmount(computeInverseAmountwithFee(intAmount), weiToNative((computeInverseAmountwithFee(intAmount)).toString(), data.decimals)) // TODO use global fees
        setDestAmount(intAmount, data.decimals) // TODO use global fees
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
    if (destination && nativeAsset && filteredChain === selectedChain) {
      if (isNative(selectedAsset)) {
        const compatibleAsset = Object.values(swapAssets).find((asset) => !isNative(asset) && asset.chain !== filteredChain?.chain && asset.chain !== nativeAsset.chain && (asset as HostAsset).nativeAsset === selectedAsset.id)
        const chain = compatibleAsset && compatibleAsset?.chain
        if (compatibleAsset && chain) {
          setAsset(compatibleAsset)
          setChain(swapChains[chain])
        }
      } else {
        const compatibleAsset = Object.values(swapAssets).find((asset) => !isNative(asset) && asset.chain !== filteredChain?.chain && asset.chain !== nativeAsset.chain && (asset as HostAsset).nativeAsset === selectedAsset.id)
        const chain = compatibleAsset && compatibleAsset?.chain
        if (chain) {
          if (destination)
          setChain(swapChains[chain])
        }
      }
    }
  }, [filteredChain, selectedChain])  

  // useEffect(() => {
  //   if (destination && originPTokenAsset && selectedAsset) {
  //     const symbol = isNative(selectedAsset) ? selectedAsset.id : (selectedAsset as HostAsset).nativeAsset
  //     if (originPTokenAsset.assetInfo.underlyingAssetSymbol !== symbol) {
  //       const asset = Object.values(swapAssets).find((asset) => (asset as HostAsset).nativeSymbol === originPTokenAsset.assetInfo.underlyingAssetSymbol)
  //       if (asset && asset.networkId) {
  //         const chain = getChainByNetworkId(asset?.networkId)
  //         setAsset(asset)
  //         setChain(chain)
  //       }
  //     }
  //   }
  // }, [originPTokenAsset])

  useEffect(() => {
    if (!swapContext)
      throw new Error('Error in retreiving swap context')
    if (data) {
      if (swapContext.swapAmount.bigIntAmount > data.value) setRangeStatus({value: data.formatted, disabled: false})
      else setRangeStatus({value: swapContext.swapAmount.amount, disabled: false})
    } else setRangeStatus({value: '0', disabled: true})
  }, [data, swapContext?.swapAmount])

  useEffect(() => {
    const fChain = Object.values(swapChains).find((chain: BlockChain) => chain.chain === selectedAsset.chain) as BlockChain
    if (destination && filteredChain && filteredChain.chain === selectedAsset.chain)
      return
    if (fChain)
      setChain(fChain)
  }, [selectedAsset])

  useEffect(() => {
    const fAsset = Object.values(swapAssets).find((asset: Asset) => asset.id === selectedAsset.id && asset.chain === selectedChain.chain) as Asset
    if (fAsset)
      setAsset(fAsset)
  }, [selectedChain])

  return(
    <div className="flex flex-col justify-between items-center w-[95%] rounded-md bg-base-100">
      <div className="flex justify-between items-end w-full rounded-md! h-8">
        <div className="ml-4 m-0 mb-0 text-base">{title}</div>
        <div className="mr-2 mt-2 -mb-2">
          {destination ? (
            <ChainsDropdown id={tourId3} selectedAsset={selectedAsset} selectedChain={selectedChain} setSelectedChain={setChain} filteredChain={filteredChain} nativeAsset={nativeAsset} destination={true} />
          ) : (
            <ChainsDropdown id={tourId3} selectedAsset={selectedAsset} selectedChain={selectedChain} setSelectedChain={setChain} filteredChain={filteredChain} nativeAsset={nativeAsset} />
          )}
        </div>
      </div>
      <div className="border border-base-300 mb-4 mt-1 px-0 pt-2 pb-1 rounded-md w-[95%]">
        <div className="flex justify-between items-center w-full mb-1">
          {destination ? (
            createPortal(<AssetsModal setAsset={setAsset} open={assetModalOpen} isOpen={setAssetModalOpen} originPTokenAsset={originPTokenAsset} />, document.body)
          ) : (
            createPortal(<AssetsModal setAsset={setAsset} open={assetModalOpen} isOpen={setAssetModalOpen} />, document.body)
          )}
          {/* {isPTokenLoading ? (
            <div className="skeleton rounded-lg h-10 w-28 m-3"></div>
          ) : ( */}
          <button 
            className="btn btn-md btn-secondary flex-nowrap pl-1 pr-0 ml-2 hover:scale-[102%]"
            id={tourId1}
            onClick={() => setAssetModalOpen(true)}
          >
            <img src={`/svg/${selectedAsset.image}`} className="w-7" />
            {selectedAsset.id}
            <RiArrowDownSLine size={20} color="gray"/>
          </button>
          {/* )} */}
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
                  {/* <div className="ml-0 mt-2 mb-0 text-xs ">Balance:</div> */}
                  <div className="ml-0 mt-0 mb-0 text-sm">
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
                  <div className="ml-0 mt-0 mb-0 text-sm">
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