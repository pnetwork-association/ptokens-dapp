import { useContext, useEffect } from "react"
import cn from "classnames"

import { ProgressContext, SwapContext } from "../../app/ContextProvider"

const ProgressModal = (): JSX.Element => {
  const progressContext = useContext(ProgressContext)
  const swapContext = useContext(SwapContext)

  const step_0 = cn({
    "step px-8": true,
    "step-primary": progressContext?.step >= 0,
  })
  const step_1 = cn({
    "step": true,
    "step-primary": progressContext?.step >= 1,
  })
  const step_2 = cn({
    "step": true,
    "step-primary": progressContext?.step >= 2,
  })
  const step_3 = cn({
    "step": true,
    "step-primary": progressContext?.step >= 3,
  })
  const step_4 = cn({
    "step": true,
    "step-primary": progressContext?.step >= 4,
  })
  const step_5 = cn({
    "step": true,
    "step-primary": progressContext?.step >= 5,
  })

  useEffect(() => {
    if (progressContext?.show === true)
      swapContext?.setSwapButtonDisabled(true)
    else swapContext?.setSwapButtonDisabled(false)
  }, [progressContext])

  return(
    <>
      {progressContext?.show ? (
        <div className="flex flex-col justify-between items-center w-11/12 bg-base-100 rounded-md py-3">
          {/* <div className="border border-gray-600 m-4 mt-1 px-0 pt-2 pb-1 rounded-md"> */}
            <ul className="steps ">
              <li className={step_0}>Approve</li>
              <li className={step_1}>Sign</li>
              <li className={step_2}>Broadcast</li>
              <li className={step_3}>Confirmed</li>
              <li className={step_4}>Queued</li>
              <li className={step_5}>Executed</li>
              {/* <li className="step">Operation queued</li>
              <li className="step">Operation executed</li> */}
            </ul>
          {/* </div> */}
          <div className="mt-5">
            {progressContext.message}
          </div>
        </div>
      ) : null }
    </>
  )
}

export default ProgressModal