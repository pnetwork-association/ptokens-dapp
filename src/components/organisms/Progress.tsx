const ProgressModal = (): JSX.Element => {
  return(
    <dialog id="my_modal_1" className="modal modal-open">
      <div className="modal-box">
      <ul className="steps steps-vertical lg:steps-horizontal">
        <li className="step step-primary">Register</li>
        <li className="step step-primary">Choose plan</li>
        <li className="step">Purchase</li>
        <li className="step">Receive Product</li>
      </ul>
      </div>
      </dialog>
  )
}

export default ProgressModal