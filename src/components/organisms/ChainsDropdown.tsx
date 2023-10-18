import { FaChevronDown } from "react-icons/fa"
import swapChains, { Chain } from "../../constants/swap-chains"
import { Blockchain } from "ptokens-constants"
import cn from 'classnames'
import { Asset, assetsHaveMatches } from "../../constants/swap-assets"

type ChainsDropdownProps = {
  setSelectedChain: (arg0: Chain) => void
  selectedChain: Chain
  selectedAsset: Asset
}

const ChainsDropdown = ({selectedAsset, selectedChain, setSelectedChain}: ChainsDropdownProps): JSX.Element => {
  const handleClick = () => {
    const elem = document.activeElement
    if(elem && elem instanceof HTMLElement){
      elem?.blur()
    }
  };
  return(
    <div className="dropdown dropdown-end z-10">
      {/* label instead of button because of a safari bug */}
      <label tabIndex={0} className="btn btn-sm btn-ghost max-w-[32px] hover:max-w-sm overflow-hidden px-1
         transition-[max-width] duration-[600ms] hover:duration-300 delay-500 hover:delay-0 flex-nowrap justify-start border-0
         focus:!max-w-sm">
          <img src={`/svg/${selectedChain.image}`} className="w-6 h-6 z-10" />
          <span>{Blockchain[selectedChain.blockchain]}</span>
          <FaChevronDown size={7} color="gray"/>
      </label>
      <ul  tabIndex={0} className="dropdown-content menu shadow bg-gray-800 rounded-md w-36 p-2 pb-0">
        <li>
          {Object.values(swapChains).filter((chain: Chain) => chain != selectedChain).map((chain: Chain) => (
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