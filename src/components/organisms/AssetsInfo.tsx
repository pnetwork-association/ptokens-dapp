import { useContext } from 'react'
import { RiArrowRightLine } from 'react-icons/ri'
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
  const [chartWidth, setChartWith] = useState(656)
  const [width, setWidth]   = useState(window.innerWidth)
  const updateDimensions = () => {
      setWidth(window.innerWidth)
  }
  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, [])

  useEffect(() => {
    if (width < 656)
      setChartWith(width - 36)
    else
      setChartWith(656)
  }, [width])

  const className = cn({
    "lg:fixed max-lg:mt-5 flex flex-col item-center justify-center border border-base-300 bg-base-200 rounded-lg transition duration-700 lg:-z-10": true,
    "lg:translate-x-[681px] lg:translate-y-[-16px] 2xl:translate-y-[0px] transition": show,
    "scale-75 opacity-0 transition": !show
  })

  return (
    <div className={className}>
      <AssetChart asset={destAsset} width={chartWidth} />
      <div className='flex max-sm:flex-col md:pb-2 items-center'>
        <InfoCard asset={originAsset} pTokenAsset={assetContext?.asset?.origAsset} title="Locking" className='md:!mr-2 text-slate-200' />
        <RiArrowRightLine size={35} className="text-gray-500" />
        <InfoCard asset={destAsset} pTokenAsset={assetContext?.asset?.destAsset} title="Getting" className='!ml-2' />        
      </div>
    </div>
  )
}

export default AssetsInfo