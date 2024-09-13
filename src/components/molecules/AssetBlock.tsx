import { Chain } from '@p.network/ptokens-constants'
import swapAssets, { getAllNativeAssets, isHost, isNative } from '../../constants/swap-assets'
import { Asset, HostAsset } from '../../constants/swap-assets'
// import { getChainByBlockchain } from '../../constants/swap-chains'
import { pTokensAsset } from '@p.network/ptokens-entities'
import swapChains from '../../constants/swap-chains'

type AssetBoxProps = {
  setAsset: (arg0: Asset) => void
  isOpen: (arg0: boolean) => void
  originPTokenAsset?: pTokensAsset | undefined
  searchWord?: string
}

const AssetBlock = ({ setAsset, isOpen, originPTokenAsset, searchWord = '' }: AssetBoxProps): JSX.Element => {
  return(
    <div className='mt-6 rounded-md'>
    {Object.values(getAllNativeAssets(/*originPTokenAsset?.assetInfo.underlyingAssetSymbol*/))
      .map((nativeAsset: Asset) => (
      <div key={nativeAsset.id} className="collapse collapse-arrow bg-base-100 mt-2 rounded-md">
        <input type="checkbox" name="my-accordion-1" /> 
        <div className="collapse-title text-xl font-medium flex items-center text-slate-100">
          <img src={`/svg/${nativeAsset.image}`} className='w-10 mr-3' />
          {nativeAsset.id}
        </div>
        <div className="collapse-content">
          {Object.values(swapAssets)
            .filter((singleAsset: Asset) => {
              return originPTokenAsset?.assetInfo.isNative && isHost(singleAsset) ||
              !(originPTokenAsset?.assetInfo.isNative) && singleAsset.chain !== originPTokenAsset?.assetInfo.chain})
            .filter((singleAsset: Asset) =>
              (isNative(singleAsset) &&
                singleAsset.id === nativeAsset.id) ||
              (isHost(singleAsset) && 
                (singleAsset as HostAsset).nativeAsset === nativeAsset.id))
            .filter((singleAsset: Asset) => 
              isNative(singleAsset) ||
              isHost(singleAsset) && singleAsset.chain !== nativeAsset.chain)
            // .filter(
            //   ({ name, chain, symbol }) =>
            //     name.toLowerCase().includes(searchWord.toLowerCase()) ||
            //     symbol.toLowerCase().includes(searchWord.toLowerCase()) ||
            //     Blockchain[blockchain].toLowerCase().includes(searchWord.toLowerCase()) ||
            //     `${symbol.toLowerCase()} on ${Blockchain[blockchain]}`.toLowerCase().includes(searchWord.toLowerCase()) ||
            //     `${name} on ${Blockchain[blockchain]}`.toLowerCase().includes(searchWord.toLowerCase())
            // )
            .map((asset: Asset) => (
              <div key={asset.id}>
                <button
                  className='lg:hidden btn btn-lg text-sm btn-secondary border border-base-300 flex flex-row justify-start items-center align-top w-full mb-2 rounded-md' 
                  onClick={() => {
                    setAsset(asset)
                    isOpen(false)
                  }}
                > 
                  <img src={`/svg/${asset.image}`} className='w-10 mr-3' />
                  <div className='flex flex-col justify-start items-start'>
                    {asset.id}
                    {isNative(asset) ? 
                        (<div className='badge badge-outline mr-2 text-xs rounded-md !lines-color'> NATIVE </div>) :
                        (<div className='badge badge-outline mr-2 text-xs rounded-md !lines-color'> PTOKEN </div>)
                      }
                  </div>
                  <div className='ml-auto flex flex-row'>
                      <img className='w-8 h-8 ml-2' src={`/svg/${swapChains[asset.chain].image}`}></img>
                  </div>
                </button>
                <button
                  className='max-lg:hidden btn btn-lg text-md btn-secondary border-base-300 flex flex-row justify-start items-center align-top w-full mb-2 rounded-md' 
                  onClick={() => {
                    setAsset(asset)
                    isOpen(false)
                  }}
                >
                  <img src={`/svg/${asset.image}`} className='w-10 mr-3' />
                  {asset.id}
                  <div className='ml-auto flex flex-row'>
                      {isNative(asset) ? 
                        (<div className='badge badge-outline mr-2 rounded-md !lines-color'> NATIVE </div>) :
                        (<div className='badge badge-outline mr-2 rounded-md !lines-color'> PTOKEN </div>)
                      }
                      ON
                      {/* {Blockchain[asset.blockchain]} */}
                      <img className='w-5 h-5 ml-2' src={`/svg/${swapChains[asset.chain].image}`}></img>
                  </div>
                </button>
              </div>
            ))}
        </div>
      </div>
    ))}
    </div>
  )
}

export default AssetBlock