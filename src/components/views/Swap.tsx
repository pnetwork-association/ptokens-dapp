import { useState } from "react"
import { Blockchain } from "ptokens-constants"
import { RiSettings4Line, RiArrowUpDownLine, RiInformationLine } from "react-icons/ri"
import { useSelector } from "react-redux"

import SwapLine from "../organisms/SwapLine"
import swapAssets, { Asset, NativeAsset, HostAsset, IS_NATIVE, IS_PTOKEN } from "../../constants/swap-assets"
import swapChains, { Chain } from "../../constants/swap-chains"
import { FaChevronRight } from "react-icons/fa"
import AssetChart from "../organisms/AssetsInfo"
import cn from "classnames"

const Swap = (): JSX.Element => {
  const [originAsset, setOriginAsset] = useState<Asset>(swapAssets.find(
    (asset: Asset) => IS_NATIVE in asset ? (asset as NativeAsset).isNative && asset.symbol === 'USDC' : false) as Asset)
  const [destAsset, setDestAsset] = useState(swapAssets.find(
    (asset: Asset) => IS_PTOKEN in asset ? (asset as HostAsset).isPtoken && asset.blockchain === Blockchain.Arbitrum: false) as Asset)
  const [originChain, setOriginChain] = useState<Chain>(swapChains.find((chain: Chain) => chain.blockchain == Blockchain.Gnosis) as Chain)
  const [destChain, setDestChain] = useState<Chain>(swapChains.find((chain: Chain) => chain.blockchain == Blockchain.Arbitrum) as Chain)
  const [showInfo, setShowInfo] = useState(false)

  const switchAssets = () => {
    const originAssetT = originAsset
    const originChainT = originChain
    setOriginAsset(destAsset)
    setOriginChain(destChain)
    setDestAsset(originAssetT)
    setDestChain(originChainT) 
  }

  const swapButtonDisplay = useSelector((state: any) => state.swap.swapButton.text)

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
          <button className="btn btn-lg w-11/12 m-4 bg-sky-900 border-sky-900 hover:bg-sky-800 hover:border-sky-800 hover:scale-[101%]">
            {swapButtonDisplay}
          </button>
        </div>
        <div className="flex flex-col justify-start items-center bg-gray-800 rounded-md mt-4">
          <div>Fees</div>
          <div>Estimated processing time</div>
        </div>
      </div>
      <AssetChart originAsset={originAsset} destAsset={destAsset} show={showInfo}/>
    </div>
  )
}

export default Swap