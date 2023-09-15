import { Blockchain } from 'ptokens-constants'
import swapAssets, { getAllNativeAssets, isHost, isNative } from '../../constants/swap-assets'
import { Asset, HostAsset } from '../../constants/swap-assets'

type AssetBoxProps = {
  setAsset: (arg0: Asset) => void
  isOpen: (arg0: boolean) => void
}

const AssetBlock = ({ setAsset, isOpen }: AssetBoxProps): JSX.Element => {
  return(
    <div className='mt-6'>
    {Object.values(getAllNativeAssets())
      .map((nativeAsset: Asset) => (
      <div key={nativeAsset.id} className="collapse collapse-arrow bg-base-200 mt-2">
        <input type="checkbox" name="my-accordion-1" /> 
        <div className="collapse-title text-xl font-medium flex items-center">
          <img src={`/svg/${nativeAsset.image}`} className='w-10 mr-3' />
          {nativeAsset.symbol}
        </div>
        <div className="collapse-content">
          {Object.values(swapAssets)
            .filter((singleAsset: Asset) =>
              (isNative(singleAsset) &&
                singleAsset.symbol === nativeAsset.symbol) ||
              (isHost(singleAsset) &&
                (singleAsset as HostAsset).nativeSymbol === nativeAsset.symbol))
            .map((asset: Asset) => (
              <button 
                key={asset.id}
                className='btn flex flex-row justify-start items-center w-full mb-2' 
                onClick={() => {
                  setAsset(asset)
                  isOpen(false)
                }}
              >
                <img src={`/svg/${asset.image}`} className='w-10 mr-3' />
                {asset.symbol}
                <p className='ml-auto'>on {Blockchain[asset.blockchain]}</p>
              </button>
            ))}
        </div>
      </div>
    ))}
    </div>
  )
}

export default AssetBlock