import { useContext, useEffect, useState } from "react"
import { RiSettings4Line, RiArrowUpDownLine, RiInformationLine } from "react-icons/ri"
import cn from "classnames"
import { FaChevronRight } from "react-icons/fa"
import { Web3SettingsButton } from "react-web3-settings"

import SwapLine from "../organisms/SwapLine"
import { Asset } from "../../constants/swap-assets"
import { Chain } from "../../constants/swap-chains"
import AssetsInfo from "../organisms/AssetsInfo"
import SwapButtonControl from "../molecules/SwapButtonControl"
import { defaults } from "../../constants/defaults"
import ProgressModal from "../organisms/Progress"
import { PTokenAssetsContext, SwapContext } from "../../app/ContextProvider"
import { useDestPtokenAsset, useOrigPtokenAsset } from "../../hooks/use-assets"

const Swap = (): JSX.Element => {
  const assetContext = useContext(PTokenAssetsContext)
  const swapContext = useContext(SwapContext) 
  const [originAsset, setOriginAsset] = useState<Asset>(defaults.originAsset)
  const [destAsset, setDestAsset] = useState(defaults.destinationAsset)
  const origPtokenAsset = useOrigPtokenAsset(originAsset)
  const destPtokenAsset = useDestPtokenAsset(destAsset)
  const [originChain, setOriginChain] = useState<Chain>(defaults.originChain)
  const [destChain, setDestChain] = useState<Chain>(defaults.destinationChain)
  const [showInfo, setShowInfo] = useState(false)
  const [amount, setAmount] = useState('0')
  const [receivedAmount, setReceivedAmount] = useState(amount)

  const setDestinationAddress = (event: any) => {
    if (swapContext && event.target.value) {
      swapContext.setDestinationAddress(event.target.value) 
    }
  }

  useEffect (() => {
    swapContext?.setSwapAmount(amount)
  }, [amount])

  useEffect(() => {
    assetContext?.setOrig(origPtokenAsset)
  }, [origPtokenAsset])

  useEffect(() => {
    assetContext?.setDest(destPtokenAsset)
  }, [destPtokenAsset])

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
    <div>
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
            <SwapLine title='Origin' selectedAsset={originAsset} setAsset={setOriginAsset} selectedChain={originChain} setChain={setOriginChain} amount={amount} setAmount={setAmount} />
            <div className="divider px-7">
              <div className="btn btn-sm btn-ghost p-0 hover:rotate-180 transition-transform duration-200" onClick={() => switchAssets()}>
                <RiArrowUpDownLine size={25}/>
              </div>
            </div>
            <SwapLine title='Destination' selectedAsset={destAsset} setAsset={setDestAsset} selectedChain={destChain} setChain={setDestChain} amount={receivedAmount} setAmount={setReceivedAmount} />
            <input type="text" placeholder="Destination Address" className="input w-11/12 mt-3 text-right focus:outline-none mb-1 grow" onChange={setDestinationAddress}/>
            <SwapButtonControl />
            <ProgressModal /> 
            <Web3SettingsButton iconClassName={'api-icon'} text='settings' />
          </div>
          <div className="flex flex-col justify-start items-center bg-gray-800 rounded-md mt-4">
            <div>Fees</div>
            <div>Estimated processing time</div>
          </div>
        </div>
        <AssetsInfo originAsset={originAsset} destAsset={destAsset} show={showInfo}/>
      </div>
    </div>
  )
}

export default Swap