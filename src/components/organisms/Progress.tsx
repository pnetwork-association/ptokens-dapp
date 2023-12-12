import { useContext, useEffect } from "react"
import cn from "classnames"
import parse from 'html-react-parser'

import { ProgressContext, SwapContext } from "../../app/ContextProvider"

const ProgressModal = (): JSX.Element => {
  const progressContext = useContext(ProgressContext)
  const swapContext = useContext(SwapContext)

  const step_0 = cn({
    "step px-8": true,
    "step-primary": progressContext ? progressContext?.step >= 0 : false,
  })
  const step_1 = cn({
    "step": true,
    "step-primary": progressContext ? progressContext?.step >= 1 : false,
  })
  const step_2 = cn({
    "step": true,
    "step-primary": progressContext ? progressContext?.step >= 2 : false,
  })
  const step_3 = cn({
    "step": true,
    "step-primary": progressContext ? progressContext?.step >= 3 : false,
  })
  // const step_4 = cn({
  //   "step": true,
  //   "step-primary": progressContext ? progressContext?.step >= 4 : false,
  // })
  // const step_5 = cn({
  //   "step": true,
  //   "step-primary": progressContext ? progressContext?.step >= 5 : false,
  // })

  useEffect(() => {
    if (progressContext?.show === true) {
      swapContext?.setSwapButtonDisabled(true)
    }
  }, [progressContext])

  return(
    <>
      {progressContext?.show ? (
        <div className="flex flex-col justify-between items-center w-11/12 bg-base-100 rounded-md py-3 mb-7">
            <ul className="steps">
              <li className={step_0}>Approve</li>
              <li className={step_1}>Sign</li>
              <li className={step_2}>Broadcast</li>
              <li className={step_3}>Confirmed</li>
              {/* <li className={step_4}>Queued</li>
              <li className={step_5}>Executed</li> */}
            </ul>
          <div className="mt-5">
            {parse(progressContext.message)}
          </div>
        </div>
      ) : null }
    </>
  )
}

export default ProgressModal