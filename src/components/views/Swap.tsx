import { useEffect, useState } from "react"
import { RiSettings4Line, RiArrowUpDownLine, RiInformationLine } from "react-icons/ri"
import { useAccount } from "wagmi"
import cn from "classnames"
import { FaChevronRight } from "react-icons/fa"

import SwapLine from "../organisms/SwapLine"
import { Asset } from "../../constants/swap-assets"
import swapChains, { Chain } from "../../constants/swap-chains"
import AssetChart from "../organisms/AssetsInfo"
import { setGlobalOriginAsset, setGlobalDestAsset, createPTokenAssets } from "../../app/features/swap/swapSlice"
import { useAppDispatch } from "../../app/hook"
import SwapButtonControl from "../../app/features/swap/SwapButtonControl"
import { defaultAssets } from "../../constants/defaults"
import ProgressModal from "../organisms/Progress"

const Swap = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [originAsset, setOriginAsset] = useState<Asset>(defaultAssets.origin)
  const [destAsset, setDestAsset] = useState(defaultAssets.destination)
  const [originChain, setOriginChain] = useState<Chain>(swapChains.find((chain: Chain) => chain.blockchain == defaultAssets.origin.blockchain) as Chain)
  const [destChain, setDestChain] = useState<Chain>(swapChains.find((chain: Chain) => chain.blockchain == defaultAssets.destination.blockchain) as Chain)
  const [showInfo, setShowInfo] = useState(false)
  const { isConnected } = useAccount()

  useEffect(() => {
    if (isConnected)
      dispatch(createPTokenAssets({ origin: originAsset, destination: destAsset }))
    else 
      dispatch(createPTokenAssets(null))
  }, [isConnected, originAsset, destAsset])

  useEffect(() => {
    dispatch(setGlobalOriginAsset(originAsset))
  }, [originAsset])

  useEffect(() => {
    dispatch(setGlobalDestAsset(destAsset))
  }, [destAsset])

  const switchAssets = () => {
    const originAssetT = originAsset
    const originChainT = originChain
    setOriginAsset(destAsset)
    setOriginChain(destChain)
    setDestAsset(originAssetT)
    setDestChain(originChainT) 
  }

  const mainClassName = cn({
    "flex justify-center items-start mt-5 duration-700": true,
    "-translate-x-[15%] transition": showInfo
  })

  const InfoButtonClassName = cn({
    "btn btn-ghost btn-sm flex flex-nowrap justify-start mr-7 px-1": true,
    "max-w-[32px] overflow-hidden transition-[max-width] duration-300": true,
    "hover:max-w-sm hover:duration-300": true,
    "max-w-sm btn-active": showInfo
  })

  return (
    <div className={mainClassName}>
      <div className="flex flex-col">
        <div className="flex flex-col justify-between items-center bg-gray-800 rounded-md">
          <div className="flex justify-between items-center w-full rounded-md mt-3 mb-1">
            <div className="ml-7 mt-2 mb-1">pNetwork v3</div>
            <div className="flex">
              <button className="mr-1">
                <RiSettings4Line size={25}/>
              </button>
              <button className={InfoButtonClassName}
                onClick={() => setShowInfo(!showInfo)}
              >
                <div>
                  <RiInformationLine size={25} />
                </div>
                <FaChevronRight size={11} color="gray" />
              </button>
            </div>
          </div>
          <SwapLine title='Origin' selectedAsset={originAsset} setAsset={setOriginAsset} selectedChain={originChain} setChain={setOriginChain} />
          <div className="divider px-7">
            <div className="btn btn-sm btn-ghost p-0 hover:rotate-180 transition-transform duration-200" onClick={() => switchAssets()}>
              <RiArrowUpDownLine size={25}/>
            </div>
          </div>
          <SwapLine title='Destination' selectedAsset={destAsset} setAsset={setDestAsset} selectedChain={destChain} setChain={setDestChain}/>
          <SwapButtonControl />
        </div>
        <div className="flex flex-col justify-start items-center bg-gray-800 rounded-md mt-4">
          <div>Fees</div>
          <div>Estimated processing time</div>
        </div>
      </div>
      <AssetChart originAsset={originAsset} destAsset={destAsset} show={showInfo}/>
      <ProgressModal />
    </div>
  )
}

export default Swap