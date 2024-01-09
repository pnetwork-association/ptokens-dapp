import cn from "classnames"

type TDisclaimer = {
  open: boolean
  setOpen: (arg0: boolean) => void
}

const Disclaimer = ({open, setOpen}: TDisclaimer): JSX.Element => {
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
        <p className="font-semibold py-4">The current version of this dApp for pNetwork v3 is in beta and has not undergone a code audit yet. As a result, there may be potential bugs and additional risks associated with its usage. We strongly advise against swapping large amounts of funds that you cannot afford to lose. Although we have implemented security measures and safeguards, there is still a level of risk involved in using the dApp. We recommend proceeding only if you are comfortable with the potential occurrence of bugs, glitches, and potential loss of funds.</p>
        <button className="btn btn-sm btn-primary font-bold" onClick={openModal}>Proceed</button>
      </form>
    </dialog>
  )
}

export default Disclaimer