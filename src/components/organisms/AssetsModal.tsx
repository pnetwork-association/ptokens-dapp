import cn from "classnames"
import { Asset } from "../../constants/swap-assets"
import AssetBlock from "../molecules/AssetBlock"
import { useState } from "react"
import { pTokensAsset } from "ptokens-entities"

type AssetsModalProps = {
  setAsset: (arg0: Asset) => void
  open: boolean
  isOpen: (arg0: boolean) => void
  originPTokenAsset?: pTokensAsset | undefined
}

const AssetsModal = ({ setAsset, open, isOpen, originPTokenAsset }: AssetsModalProps): JSX.Element => {
  const [searchWord, setSearchWord] = useState('')
  const modalClass = cn({
    "modal modal-bottom sm:modal-middle !fixed top-0 left-0": true,
    "modal-open": open,
  })

  const changeSearchWord = (event: any) => {
    if (event?.target.value)
      setSearchWord(event.target.value)
  }

  return(
    <dialog id="my_modal_1" className={modalClass}>
      <form method="dialog" className="modal-box !rounded-md !pt-2 bg-base-200 border border-base-300">
        <button className="btn btn-sm btn-circle btn-ghost absolute text-lg right-4 top-2 text-slate-100" onClick={() => isOpen(false)}>✕</button>
        <h2 className="font-bold text-xl mb-2 text-slate-100">Asset search</h2>
        <input type="text" placeholder="Search by name, symbol or asset" className="input text-lg h-8 w-full mt-2 bg-base-100 text-slate-100" onChange={changeSearchWord} />
        <AssetBlock setAsset={setAsset} isOpen={isOpen} originPTokenAsset={originPTokenAsset} searchWord={searchWord} />
      </form>
    </dialog>
  )
}

export default AssetsModal