import cn from "classnames"
import { Asset } from "../../constants/swap-assets"
import AssetBlock from "../molecules/AssetBlock"

type AssetsModalProps = {
  setAsset: (arg0: Asset) => void
  open: boolean
  isOpen: (arg0: boolean) => void
}

const AssetsModal = ({ setAsset, open, isOpen }: AssetsModalProps): JSX.Element => {
  const modalClass = cn({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": open,
  })
  return(
    <dialog id="my_modal_1" className={modalClass}>
      <form method="dialog" className="modal-box !rounded-md !pt-2">
        <button className="btn btn-sm btn-circle btn-ghost absolute text-lg right-4 top-2" onClick={() => isOpen(false)}>✕</button>
        <h2 className="font-bold text-xl mb-2 first-letter:">Asset search</h2>
        <div className="border border-gray-600 rounded-md">

          <div className="ml-4 mt-2">Chains:</div>
          <div className="flex justify-center align-middle">
            <input type="text" placeholder="Search by name, symbol or asset" className="input text-lg h-8 w-full m-4 mt-2 bg-gray-700" />
          </div>
        </div>
        <AssetBlock setAsset={setAsset} isOpen={isOpen}/>
      </form>
    </dialog>
  )
}

export default AssetsModal