import { useContext, useEffect, useState } from "react"
import { RiSettings4Line, RiArrowUpDownLine, RiInformationLine } from "react-icons/ri"
import cn from "classnames"
import { FaChevronRight } from "react-icons/fa"
import { Web3SettingsContext } from "react-web3-settings"

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
  const { openSettings, open: isSettingsOpen } = useContext(Web3SettingsContext)
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
    "flex max-2xl:flex-col justify-center 2xl:items-start max-2xl:items-center mt-5 duration-700": true,
    "2xl:-translate-x-[328px] 2xl:scale-100 transition": showInfo,
    "lg:-translate-x-[246px] lg:scale-75 origin-top transition": showInfo
  })

  const InfoButtonClassName = cn({
    "btn btn-ghost btn-sm flex flex-nowrap justify-start mr-7 px-1 max-md max-md:hidden": true,
    "max-w-[32px] overflow-hidden transition-[max-width] duration-300": true,
    "hover:max-w-sm hover:duration-300": true,
    "max-w-sm btn-active": showInfo
  })

  const SettingsButtonClassName = cn({
    "btn btn-ghost btn-sm md:mr-1 px-1 max-md:mr-7": true,
    "max-w-sm btn-active": isSettingsOpen
  })

  const SettingsButtonAnimation = cn({
    "hover:rotate-90 hover:duration-300 duration-500": true,
    "rotate-90": isSettingsOpen
  })

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="alert alert-warning mt-3 w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Warning: This dApp is experimental and bugs are expected. Funds could be lost. Use it only if you know what you are doing.</span>
        </div>
      </div>
      <div className={mainClassName}>
        <div className="flex flex-col lg:w-[656px]">
          <div className="flex flex-col justify-between items-center bg-gray-800 rounded-md">
            <div className="flex justify-between items-center w-full rounded-md mt-3 mb-1">
              <div className="ml-7 mt-2 mb-1">pNetwork v3</div>
              <div className="flex">
                <button className={SettingsButtonClassName}
                  onClick={openSettings}
                >
                  <div className={SettingsButtonAnimation}><RiSettings4Line size={25}/></div>
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
              <div className="btn btn-sm btn-ghost p-0" onClick={() => switchAssets()}>
              <div className="hover:rotate-180 transition-transform duration-200"><RiArrowUpDownLine size={25}/></div>
              </div>
            </div>
            <SwapLine title='Destination' selectedAsset={destAsset} setAsset={setDestAsset} selectedChain={destChain} setChain={setDestChain} amount={receivedAmount} setAmount={setReceivedAmount} />
            <input type="text" placeholder="Destination Address" className="input w-11/12 mt-3 text-right focus:outline-none mb-1 grow" onChange={setDestinationAddress}/>
            <SwapButtonControl />
            <ProgressModal />
          </div>
          {/* <div className="flex flex-col justify-start items-center bg-gray-800 rounded-md mt-4">
            <div>Fees</div>
            <div>Estimated processing time</div>
          </div> */}
        </div>
        <AssetsInfo originAsset={originAsset} destAsset={destAsset} show={showInfo}/>
      </div>
    </div>
  )
}

export default Swap