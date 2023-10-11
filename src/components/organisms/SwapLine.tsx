import { RiArrowDownSLine } from "react-icons/ri"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useBalance, useAccount } from 'wagmi'
import { pTokensAsset } from "ptokens-entities"
import cn from "classnames"

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
    "btn btn-ghost btn-xs mr-4 hover:text-blue-600 hover:bg-transparent" : true,
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

  // const formatAmount = (value: bigint) => {
  //   if (data) {
  //     // if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
  //     //   console.warn('Number is too big, expect errors')
  //     // }
  //     return Number(value) / (10 ** data?.decimals)
  //   }
  //   else return value.toString()
  // }

  // useEffect (() => {
  //   console.log(pTokenAsset?.assetTokenAddress === pTokenAssetsContext?.asset?.origAsset?.assetTokenAddress)
  //   console.log(pTokenAsset, pTokenAssetsContext?.asset?.origAsset)
  //   if (pTokenAsset?.assetTokenAddress === pTokenAssetsContext?.asset?.origAsset?.assetTokenAddress)
  //     swapContext?.setSwapAmount(amount)
  // }, [amount])

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
    
  }, [amount])

  useEffect(() => {
    setChain(Object.values(swapChains).find((chain: Chain) => chain.blockchain === selectedAsset.blockchain) as Chain)
  }, [selectedAsset])

  useEffect(() => {
    setAsset(Object.values(swapAssets).find((asset: Asset) => asset.symbol === selectedAsset.symbol && asset.blockchain === selectedChain.blockchain) as Asset)
  }, [selectedChain])

  return(
    <div className="flex flex-col justify-between items-center w-11/12 bg-base-100 rounded-md">
      <div className="flex justify-between items-center w-full rounded-md!">
        <div className="ml-4 mt-2 mb-">{title}</div>
        <div className="mr-4 mt-2 mb-1">
          <ChainsDropdown selectedAsset={selectedAsset} selectedChain={selectedChain} setSelectedChain={setChain} />
        </div>
      </div>
      <div className="border border-gray-600 m-4 mt-1 px-0 pt-2 pb-1 rounded-md">
        <div className="flex justify-between items-center w-full mb-1">
          <button 
            className="btn btn-lg flex-nowrap pl-3 pr-4 mr-2 ml-2 hover:scale-105"
            onClick={() => setAssetModalOpen(true)}
          >
            <img src={`/svg/${selectedAsset.image}`} className="w-11" />
            {selectedAsset.symbol}
            <RiArrowDownSLine size={20} color="gray"/>
          </button>
          <input type="number" placeholder="0" className="input text-right text-4xl w-full focus:outline-none mb-1 grow mr-0" value={amount} onChange={handleChange}/>
        </div>
        <div className="flex justify-between items-center w-full ml-3">
          {isLoading ? (
            <div className="flex justify-start items-center">
              Balance:
              <span className="loading loading-ring loading-md ml-2"></span> 
            </div>
          ) : isError ? (
            <div>
                Error in loading Balance.
              </div>
          ) : (
            <div>
              Balance: {data ? data.formatted : 0}
            </div>
          )}
          {data ? (
            <button className={rangeSliderStyle} onClick={() => setAmount(data.formatted)} >Max</button>
          ) : null}
        </div>
        <div className="w-full px-2">
          { data ? (
            <input type="range" min={0} max={data?.formatted.toString()} className="range-custom range-info" value={rangeStatus.value} step={(Number(data?.formatted) / 100).toString()} disabled={rangeStatus.disabled} onChange={handleChange} /> 
          ) : (
            <input type="range" min={0} max={0} className="range-custom range-info" disabled={true} />
          )}
        </div>
      </div>
      <AssetsModal setAsset={setAsset} open={assetModalOpen} isOpen={setAssetModalOpen} />
    </div>
  )
}

export default SwapLine