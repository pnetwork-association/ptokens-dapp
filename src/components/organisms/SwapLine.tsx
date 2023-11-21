import { RiArrowDownSLine } from "react-icons/ri"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useBalance, useAccount } from 'wagmi'
import { pTokensAsset } from "ptokens-entities"
import cn from "classnames"
import { createPortal } from 'react-dom'

import AssetsModal from "./AssetsModal"
import swapAssets, { Asset, NativeAsset, isNative } from "../../constants/swap-assets"
import ChainsDropdown from "./ChainsDropdown"
import swapChains, { Chain, getChainByBlockchain } from "../../constants/swap-chains"

import { NO_ADDRESS } from "../../constants"

type SwapLineProps = {
  title: string
  setAsset: (arg0: Asset) => void
  selectedAsset: Asset
  setChain: (arg0: Chain) => void
  selectedChain: Chain
  amount: string
  setAmount: Dispatch<SetStateAction<string>>
  pTokenAsset?: pTokensAsset
}

type TrangeSlider = {
  value: string
  disabled: boolean
}

const SwapLine = ({title, selectedAsset, setAsset, selectedChain, setChain, amount, setAmount, pTokenAsset}: SwapLineProps): JSX.Element => {
  const [assetModalOpen, setAssetModalOpen] = useState(false)
  const [rangeStatus, setRangeStatus] = useState<TrangeSlider>({value: '0', disabled: true})
  const { address, isDisconnected } = useAccount()
  const assetAddress = pTokenAsset ? pTokenAsset.assetTokenAddress :
    isNative(selectedAsset) ? (selectedAsset as NativeAsset).address :
    NO_ADDRESS
  const { data, isError, isLoading } = useBalance({
    address: address,
    token: (assetAddress && assetAddress !== NO_ADDRESS) ? assetAddress as `0x${string}` : undefined,
    chainId: getChainByBlockchain(selectedAsset.blockchain)?.chainId
  })

  const rangeSliderStyle = cn({
    "btn btn-secondary btn-xs mr-5 hover:text-blue-600 hover:bg-transparent" : true,
    "text-blue-600": amount == data?.formatted,
  })

  const handleChange = (event: any) => {
    if (data) {
      // if (BigInt(event.target.value * (10 ** data.decimals)) > BigInt(Number.MAX_SAFE_INTEGER))
        // console.warn('Number is too big, expect errors')
      if (event.target.value && data && BigInt(Math.round(event.target.value * (10 ** data.decimals))) > data.value) { // FIXME this rounding is necessary because of precision but it will cause problems in the future.
        setAmount(data.formatted)
      }
      else setAmount(event.target.value ? event.target.value.toString() : 0n) // FIXME this rounding is necessary because of precision but it will cause problems in the future.
    } else setAmount(event.target.value)
  }

  useEffect(() => {
    if (isDisconnected) setAmount('0')
  }, [isDisconnected])

  useEffect(() => {
    if (data) {
      if (Number(amount) >  Number(data.formatted)) setRangeStatus({value: data.formatted, disabled: false})
      else setRangeStatus({value: amount, disabled: false})
    } else setRangeStatus({value: '0', disabled: true})
  }, [data, amount])

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
          <ChainsDropdown selectedAsset={selectedAsset} selectedChain={selectedChain} setSelectedChain={setChain} />
        </div>
      </div>
      <div className="border border-base-300 mb-4 mt-1 px-0 pt-2 pb-1 rounded-md w-[95%] lg:w-[97%]">
        <div className="flex justify-between items-center w-full mb-1">
          {createPortal(<AssetsModal setAsset={setAsset} open={assetModalOpen} isOpen={setAssetModalOpen} />, document.body)}
          <button 
            className="btn btn-md lg:btn-lg btn-secondary flex-nowrap pl-1 pr-0 lg:pl-3 lg:pr-4 lg:mr-2 ml-2 hover:scale-[102%]"
            onClick={() => setAssetModalOpen(true)}
          >
            <img src={`/svg/${selectedAsset.image}`} className="w-7 lg:w-11" />
            {selectedAsset.symbol}
            <RiArrowDownSLine size={20} color="gray"/>
          </button>
          <input type="number" placeholder="0" className="input text-right text-4xl w-full focus:outline-none mb-1 grow mr-0" value={amount} onChange={handleChange}/>
        </div>
        <div className="flex justify-between items-center w-full ml-3">
          {isLoading ? (
            <div className="flex justify-start items-center">
              {/* <div className="ml-0 mt-2 mb-0 text-xs lg:text-base">Balance:</div> */}
              <span className="loading loading-ring loading-md ml-2"></span> 
            </div>
          ) : isError ? (
            <div>
                Error in loading Balance.
              </div>
          ) : data ? (
            <div className="text-slate-200">
              <div className="ml-0 mt-0 lg:mt-2 mb-0 text-sm lg:text-base">
                Balance: {data.formatted }
              </div>
            </div>
          ) : null}
          {data ? (
            <button className={rangeSliderStyle} onClick={() => setAmount(data.formatted)} >Max</button>
          ) : null}
        </div>
        {data ? (
          <div className="w-full px-2">
            <input type="range" min={0} max={data?.formatted.toString()} className="range-custom range-info" value={rangeStatus.value} step={(Number(data?.formatted) / 100).toString()} disabled={rangeStatus.disabled} onChange={handleChange} /> 
          </div> 
        ) : null 
        }
      </div>
      {/* <AssetsModal setAsset={setAsset} open={assetModalOpen} isOpen={setAssetModalOpen} /> */}
    </div>
  )
}

export default SwapLine