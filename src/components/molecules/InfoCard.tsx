import { Blockchain } from "ptokens-constants"
import { pTokensAsset } from "ptokens-entities"

import { Asset, NativeAsset, isNative } from "../../constants/swap-assets"
import { getBlockchain, getPrettierAddress } from "../../utils/utils"
import { NO_ADDRESS } from "../../constants"

type InfoCardProps = {
  asset: Asset
  pTokenAsset?: pTokensAsset
  title: string
  className?: string
}

const InfoCard = ({asset, pTokenAsset, title, className = ''}: InfoCardProps): JSX.Element => {

  const address = pTokenAsset ? pTokenAsset.assetTokenAddress :
    isNative(asset) ? (asset as NativeAsset).address :
    NO_ADDRESS

  return(
    <div className={`flex justify-start items-center bg-base-100 rounded-md ml-5 mr-5 my-2 pb-2 w-1/2 ${className}`}>
      <div className="flex flex-col">
      <h1 className="text-md m-2 text-gray-500">{title}</h1>
        <div className="flex items-center ml-4">
          <img
            className="w-8 mr-2 mb-2"
            src={`/svg/${asset.image}`}
          />
          <div className='mb-2 text-2xl'>{asset.symbol}</div>
        </div>
        <div className="flex items-center ml-4">
          <div className='bold mr-2 w-16 text-gray-500'>CHAIN:</div>
          <img
            className="w-4 mx-2"
            src={`/svg/${getBlockchain(asset).image}`}
          />
          <div>{Blockchain [asset.blockchain].toUpperCase()}</div>
        </div>
        <div className="flex items-center ml-4">
          <div className='bold mr-2 w-16 text-gray-500'>TYPE:</div>
          {isNative(asset) ? 
            (<div className='badge badge-outline badge-primary ml-2 rounded-md'> NATIVE </div>) :
            (<div className='badge badge-outline badge-primary ml-2 rounded-md'> PTOKEN </div>)
          }
        </div>
        <div className="flex items-center ml-4">
          <div className='bold mr-2 w-16 text-gray-500'>ADDRESS:</div>
          <div className='ml-2'>{(address === NO_ADDRESS) ? 'No address found' : getPrettierAddress(address, 4)}</div>
        </div>
      </div>
    </div>
  )
}

export default InfoCard