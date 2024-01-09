import { useContext, useEffect, useState } from 'react'
import { RiArrowDownLine, RiArrowRightLine } from 'react-icons/ri'
import cn from 'classnames'

import { Asset } from '../../constants/swap-assets'
import AssetChart from '../molecules/AssetChart'
import InfoCard from '../molecules/InfoCard'
import { PTokenAssetsContext } from '../../app/ContextProvider'

interface AssetsInfoProps  {
  originAsset: Asset
  destAsset: Asset
  show: boolean
}

const AssetsInfo = ({originAsset, destAsset, show}: AssetsInfoProps): JSX.Element => {
  const assetContext = useContext(PTokenAssetsContext)
  const [chartWidth, setChartWith] = useState(509)
  const [chartHeight, setChartHeight] = useState(240)
  const [width, setWidth] = useState(window.innerWidth)
  const updateDimensions = () => {
      setWidth(window.innerWidth)
  }
  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, [])

  useEffect(() => {
    if (width < 509) {
      setChartWith(width - 74)
      setChartHeight(240)
    }
    else {
      setChartWith(509)
      setChartHeight(240)
    }
  }, [width])

  const className = cn({
    "lg:fixed max-lg:mt-3 flex flex-col item-center justify-center border border-base-300 bg-base-200 rounded-lg transition duration-700 lg:-z-10": true,
    "lg:translate-x-[508px] transition": show,
    "scale-75 opacity-0 transition": !show
  })

  return (
    <div id='info' className={className}>
      <AssetChart asset={destAsset} width={chartWidth} height={chartHeight} />
      <div className='flex max-sm:flex-col pb-3 items-center mt'>
        <InfoCard asset={originAsset} pTokenAsset={assetContext?.asset?.origAsset} className='max-lg:!mx-2 text-slate-200' />
        <RiArrowRightLine size={25} className="text-slate-200 max-sm:hidden" />
        <div className='h-1 overflow-visible -translate-y-2'>
          <div className='btn btn-xs btn-neutral sm:hidden bg-base-200 border border-base-300'>
            <RiArrowDownLine size={25} className="text-slate-200 pb-1" />
          </div>
        </div>
        <InfoCard asset={destAsset} pTokenAsset={assetContext?.asset?.destAsset} destination={true} className='max-lg:!mx-2 text-slate-200' />        
      </div>
    </div>
  )
}

export default AssetsInfo