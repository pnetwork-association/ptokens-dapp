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

  const className = cn({
    "absolute flex flex-col item-center justify-center bg-gray-800 rounded-md transition duration-700 -z-10": true,
    "translate-x-[98%] transition": show,
    "scale-75 opacity-0 transition": !show
  })

  return (
    <div className={className}>
      <AssetChart asset={destAsset} />
      <div className='flex pb-2 items-center'>
        <InfoCard asset={originAsset} pTokenAsset={assetContext?.asset?.origAsset} title="Locking" className='!mr-2' />
        <RiArrowRightLine size={35} className="text-gray-500" />
        <InfoCard asset={destAsset} pTokenAsset={assetContext?.asset?.destAsset} title="Getting" className='!ml-2' />        
      </div>
    </div>
  )
}

export default AssetsInfo