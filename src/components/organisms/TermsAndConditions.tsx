import { useState } from "react"
import cn from "classnames"

const TermsAndConditions = (): JSX.Element => {
  const [open, setOpen] = useState(localStorage.getItem('termsAccepted') === 'true' ? false : true)
  const modalClass = cn({
    "modal max-lg:modal-top max-lg:mt-16 max-lg:flex": true,
    "modal-open": open,
  })

  const openModal = () => {
    setOpen(false)
    localStorage.setItem('termsAccepted', 'true')
  }

  return(
    <dialog id="my_modal_1" className={modalClass}>
      <form method="dialog" className="modal-box max-lg:mx-3 max-lg:justify-center !rounded-md !pt-2 bg-base-200 border border-base-300">
        <h2 className="font-extrabold text-xl mb-2 text-slate-100">Disclaimer</h2>
        <p className="font-semibold py-4">The pNetwork dApp v3 is released in beta; there could be bugs and additional risks. Please don't stake large amounts or assets you can't afford to lose. Despite all safety measures and the safeguards we have put in place, there is still risk involved in using it, and we advise you to proceed only if you are comfortable with the possibility of encountering bugs, glitches and funds loss.</p>
        <button className="btn btn-sm btn-primary font-bold" onClick={openModal}>Proceed</button>
      </form>
    </dialog>
  )
}

export default TermsAndConditions