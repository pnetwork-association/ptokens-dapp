import { RiArrowDownSLine } from "react-icons/ri"
import { useEffect, useState } from "react"
import { useBalance, useAccount } from 'wagmi'

import AssetsModal from "./AssetsModal"
import swapAssets, { Asset } from "../../constants/swap-assets"
import ChainsDropdown from "./ChainsDropdown"
import swapChains, { Chain } from "../../constants/swap-chains"

type SwapLineProps = {
  title: string
  setAsset: (arg0: Asset) => void
  selectedAsset: Asset
  setChain: (arg0: Chain) => void
  selectedChain: Chain
}

const SwapLine = ({title, selectedAsset, setAsset, selectedChain, setChain}: SwapLineProps): JSX.Element => {
  const [assetModalOpen, setAssetModalOpen] = useState(false)
  const { address, isConnecting, isDisconnected } = useAccount()
  const { data, isError, isLoading } = useBalance({
    address: address,
  })
  const [amount, setAmount] = useState(0)

  const handleChange = (event: any) => {
    setAmount(event.target.value)
  };

  useEffect(() => {
    setChain(swapChains.find((chain: Chain) => chain.blockchain === selectedAsset.blockchain) as Chain)
  }, [selectedAsset])

  useEffect(() => {
    setAsset(swapAssets.find((asset: Asset) => asset.symbol === selectedAsset.symbol && asset.blockchain === selectedChain.blockchain) as Asset)
  }, [selectedChain])

  return(
    <div className="flex flex-col justify-between items-center w-11/12 bg-base-100 rounded-md">
      <div className="flex justify-between items-center w-full rounded-md!">
        <div className="ml-4 mt-2 mb-">{title}</div>
        <div className="mr-4 mt-2 mb-1">
          <ChainsDropdown selectedAsset={selectedAsset} selectedChain={selectedChain} setSelectedChain={setChain} />
        </div>
      </div>
      <div className="border border-gray-600 m-4 mt-1 px-0 pt-2 pb-1 rounded-md">
        <div className="flex justify-between items-center w-full mb-1">
          <button 
            className="btn btn-lg flex-nowrap pl-3 pr-4 mr-2 ml-2 hover:scale-105"
            onClick={() => setAssetModalOpen(true)}
          >
            <img src={`/svg/${selectedAsset.image}`} className="w-11" />
            {selectedAsset.symbol}
            <RiArrowDownSLine size={20} color="gray"/>
          </button>
          <input type="number" placeholder="0" className="input text-right text-4xl w-full focus:outline-none mb-1 grow mr-0" value={amount} onChange={handleChange}/>
        </div>
        <div className="flex justify-between items-center w-full ml-3">
          {isLoading || isError ? (
            <>
              <div>
                Balance: 
              </div>
              <span className="loading loading-ring loading-md"></span>
            </>
          ) : (
            <div>
             Balance: {data ? data.formatted : 0}
            </div>
          )}
        </div>
        <div className="w-full px-2">
          <input type="range" min={0} max="100" className="range range-xs" defaultValue="0" value={data?.formatted} />
        </div>
      </div>
      <AssetsModal setAsset={setAsset} open={assetModalOpen} isOpen={setAssetModalOpen} />
    </div>
  )
}

export default SwapLine