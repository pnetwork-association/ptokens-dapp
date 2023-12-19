import { FaChevronDown } from "react-icons/fa"
import swapChains, { Chain, getChainByBlockchain } from "../../constants/swap-chains"
import { Blockchain } from "ptokens-constants"
import cn from 'classnames'
import { Asset, assetsHaveMatches } from "../../constants/swap-assets"

type ChainsDropdownProps = {
  setSelectedChain: (arg0: Chain) => void
  selectedChain: Chain
  filteredChain: Chain
  selectedAsset: Asset
  nativeAsset: Asset | undefined
  destination?: boolean
  id: string
}

const ChainsDropdown = ({selectedAsset, selectedChain, setSelectedChain, id, filteredChain, nativeAsset, destination}: ChainsDropdownProps): JSX.Element => {
  const handleClick = () => {
    const elem = document.activeElement
    if(elem && elem instanceof HTMLElement){
      elem?.blur()
    }
  }

  const animationClassName = cn({
    "btn btn-sm btn-ghost hover:max-w-sm overflow-hidden px-1": true,
    "transition-[max-width] duration-[600ms] hover:duration-300 delay-500": true,
    "hover:delay-0 flex-nowrap justify-start border-0 focus:!max-w-sm": true,
    "max-w-[24px]": selectedChain.chainId === 1,
    "max-w-[32px]": selectedChain.chainId !== 1
  })

  return(
    <div id={id}className="dropdown dropdown-end z-20">
      {/* label instead of button because of a safari bug */}
      <label tabIndex={0} className={animationClassName}>
          <img src={`/svg/${selectedChain.image}`} className="w-6 h-8 lg:w-6 lg:h-6 z-10" />
          <span>{Blockchain[selectedChain.blockchain]}</span>
          <FaChevronDown size={7} color="gray"/>
      </label>
      <ul  tabIndex={0} className="dropdown-content menu shadow bg-gray-800 rounded-md w-36 p-2 pb-0">
        <li>
          {Object.values(swapChains)
            .filter((chain: Chain) => nativeAsset ? chain !== getChainByBlockchain(nativeAsset.blockchain) : chain)
            .filter((chain: Chain) => chain !== selectedChain)
            .filter((chain: Chain) => destination ? chain !== filteredChain : chain)
            .map((chain: Chain) => (
            <button 
              key={chain.id}
              className={cn({
                'btn btn-sm btn-outline flex flex-row flex-nowrap justify-start items-center w-full mb-2': true,
                'btn-primary': chain === selectedChain,
                'btn-disabled': chain === selectedChain || assetsHaveMatches(chain.blockchain, selectedAsset.symbol)
              })}
              onClick={() => {
                setSelectedChain(chain)
                handleClick()
              }}
          > 
            {assetsHaveMatches(chain.blockchain, selectedAsset.symbol) ? (
              <img src={`/svg/${chain.disabledImage}`} className='h-5 mr-1' />
            ) : (
              <img src={`/svg/${chain.image}`} className='h-5 mr-1' />
            )}
            {Blockchain[chain.blockchain]}
          </button>
          ))}
        </li>
      </ul>
    </div>
  )
}

export default ChainsDropdown