import { useContext, useEffect, useState } from "react"
import { RiSettings4Line, RiArrowUpDownLine, RiInformationLine } from "react-icons/ri"
import cn from "classnames"
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa"
import { Web3SettingsContext } from "@p.network/react-web3-settings"
import scrollIntoView from 'smooth-scroll-into-view-if-needed'
import "driver.js/dist/driver.css"

import Box from "../atoms/Box"
import Container from "../atoms/Container"
import SwapLine from "../organisms/SwapLine"
import { Asset } from "../../constants/swap-assets"
import { BlockChain } from "../../constants/swap-chains"
import AssetsInfo from "../organisms/AssetsInfo"
import SwapButtonControl from "../molecules/SwapButtonControl"
import { defaults } from "../../constants/defaults"
import ProgressModal from "../organisms/Progress"
import { PTokenAssetsContext, ProgressContext, SwapContext } from "../../app/ContextProvider"
import { useDestPtokenAsset, useOrigPtokenAsset } from "../../hooks/use-assets"
import Disclaimer from "../organisms/Disclaimer"
import { tour } from "../../app/features/tour/driver"

const Swap = (): JSX.Element => {
  const { openSettings, open: isSettingsOpen } = useContext(Web3SettingsContext)
  const assetContext = useContext(PTokenAssetsContext)
  const swapContext = useContext(SwapContext)
  const progressContext = useContext(ProgressContext)
  const [originAsset, setOriginAsset] = useState<Asset>(defaults.originAsset)
  const [destAsset, setDestAsset] = useState(defaults.destinationAsset)
  const origPtokenAsset = useOrigPtokenAsset(originAsset)
  const destPtokenAsset = useDestPtokenAsset(destAsset)
  const [originChain, setOriginChain] = useState<BlockChain>(defaults.originChain)
  const [destChain, setDestChain] = useState<BlockChain>(defaults.destinationChain)
  const [showInfo, setShowInfo] = useState(false)
  const [closeWarn, setCloseWarn] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [open, setOpen] = useState(localStorage.getItem('termsAccepted') === 'true' ? false : true)
  const [openTour] = useState(localStorage.getItem('tourDone') === 'true' ? false : true)
  const updateDimensions = () => {
      setWidth(window.innerWidth)
  }
  const [swapSize, setSwapSize] = useState(25)

  useEffect(() => {
    if (width >= 1024)
      setSwapSize(20)
    else
      setSwapSize(20)
  }, [width])

  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, [])

  useEffect(() => {
    assetContext?.setOrig(origPtokenAsset)
  }, [origPtokenAsset])

  useEffect(() => {
    assetContext?.setDest(destPtokenAsset)
  }, [destPtokenAsset])

  useEffect(() => {
    if (showInfo) {
      const infoNode = (document.getElementById("info") as HTMLAnchorElement)
      scrollIntoView(infoNode, { behavior: 'smooth', scrollMode: 'if-needed', block: 'end', inline: 'start' })
    }
  }, [showInfo])

  useEffect(() => {
    if (!open && openTour) {
      tour.drive()
      localStorage.setItem('tourDone', 'true')
    }
  }, [open])

  const setDestinationAddress = (event: any) => {
    if (swapContext && event.target.value) {
      swapContext.setDestinationAddress(event.target.value) 
    }
  }

  const switchAssets = () => {
    const originAssetT = originAsset
    const originChainT = originChain
    setOriginAsset(destAsset)
    setOriginChain(destChain)
    setDestAsset(originAssetT)
    setDestChain(originChainT) 
  }

  const pageClassName = cn ({
    "max-lg:h-[600px] max-lg:overflow-hidden": !progressContext?.show && !showInfo && closeWarn,
    "max-lg:h-[770px] max-lg:overflow-hidden": !progressContext?.show && !showInfo && !closeWarn,
    "max-lg:h-[1040px] max-lg:overflow-hidden": progressContext?.show && !showInfo && closeWarn,
    "max-lg:h-[1180px] max-lg:overflow-hidden": progressContext?.show && !showInfo && !closeWarn
  })

  const mainClassName = cn({
    "flex max-lg:flex-col justify-center max-lg:items-center duration-700 max-sm:p-2 sm:p-5 scroll-smooth": true,
    "lg:-translate-x-[278px] 2xl:scale-100 transition origin-top": showInfo,
  })

  const InfoButtonClassName = cn({
    "btn btn-ghost btn-sm flex flex-nowrap justify-start mr-3 px-1 mb-2": true,
    "max-w-[32px] overflow-hidden transition-[max-width] duration-300": true,
    "hover:max-w-sm hover:duration-300": true,
    "max-w-sm btn-active": showInfo
  })

  const SettingsButtonClassName = cn({
    "btn btn-ghost btn-sm mr-1 px-1": true,
    "max-w-sm btn-active": isSettingsOpen
  })

  const SettingsButtonAnimation = cn({
    "hover:rotate-90 hover:duration-300 duration-500 text-slate-100": true,
    "rotate-90": isSettingsOpen
  })

  const WarnClassName = cn({
    "alert alert-warning font-semibold mt-3 w-auto rounded-lg max-sm:mx-2 sm:mx-5 p-1": true,
    "flex": closeWarn
  })

  return (
    <div className={pageClassName}>
      <div className="flex items-center justify-center">
        <div className={WarnClassName}>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          {closeWarn ? (
            <span>pNetwork v3 beta</span>
          ) : (
            <span>Beta Alert: pNetwork v3 dApp is in beta and not yet audited. Only swap amounts you can afford to loose.</span>
          )}
          <button className="btn btn-xs btn-secondary top-1 right-1" onClick={() => setCloseWarn(!closeWarn)}>
            {closeWarn ? (
              <FaChevronDown size={11}/>
            ) : (
              <FaChevronUp size={11} />
            )}
          </button>
        </div>
      </div>
      <div className={mainClassName}>
        <Container className="sm:w-[444px]">
          <Box>
            <div className="flex justify-between items-center w-full rounded-md mt-3 mb-1 h-5">
              <div className="ml-3 lg:ml-5 mb-1 font-semibold text-slate-100">pNetwork v3</div>
              <div className="flex">
                <button className={SettingsButtonClassName}
                  onClick={openSettings}
                >
                  <div className={SettingsButtonAnimation}><RiSettings4Line size={25}/></div>
                </button>
                <button className={InfoButtonClassName}
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <div className="text-slate-100">
                    <RiInformationLine size={25} />
                  </div>
                  <FaChevronRight size={11} color="white" />
                </button>
              </div>
            </div>
            <SwapLine title='Origin' selectedAsset={originAsset} setAsset={setOriginAsset} selectedChain={originChain} setChain={setOriginChain} originPTokenAsset={origPtokenAsset} originChain={originChain} filteredChain={destChain} />
            <div className="h-1 overflow-visible">
              <div className="btn max-sm:btn-sm sm:btn-xs relative z-10 max-sm:-translate-y-3.5 sm:-translate-y-2.5 border border-base-300" onClick={() => switchAssets()}>
              <div className="transition-transform duration-200 text-slate-100"><RiArrowUpDownLine size={swapSize}/></div>
              </div>
            </div>
            <SwapLine title='Destination' selectedAsset={destAsset} setAsset={setDestAsset} selectedChain={destChain} setChain={setDestChain} destination={true} originPTokenAsset={origPtokenAsset} originChain={originChain} filteredChain={originChain}/>
            <input id="destinationAddress" type="text" placeholder="Destination Address" className="input w-[95%] mt-1 text-right focus:outline-none grow text-slate-200" onChange={setDestinationAddress}/>
            <SwapButtonControl />
            <ProgressModal />
          </Box>
          {/* <div className="flex flex-col justify-start items-center bg-gray-800 rounded-md mt-4">
            <div>Fees</div>
            <div>Estimated processing time</div>
          </div> */}
        </Container>
        <AssetsInfo originAsset={originAsset} destAsset={destAsset} show={showInfo}/>
        <Disclaimer open={open} setOpen={setOpen}/>
      </div>
    </div>
  )
}

export default Swap