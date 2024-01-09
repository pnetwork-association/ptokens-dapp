import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import cn from "classnames"
import parse from 'html-react-parser'

import { ProgressContext, SwapContext, TProgressContext, TSwapContext } from "../../app/ContextProvider"

const resetProgress = (progress: TProgressContext, swap: TSwapContext) => {
  progress?.setStep(0)
  progress?.setMessage('')
  progress?.setIsComplete(false)
  progress?.setShow(false)
  swap?.setSwapAmount({
    bigIntAmount: 0n,
    amount: '0',
  })
  swap?.setReceiveAmount('0')
}

const ProgressModal = (): JSX.Element => {
  const navigate = useNavigate()
  const progressContext = useContext(ProgressContext)
  const swapContext = useContext(SwapContext)

  const step_0 = cn({
    "step lg:px-8": true,
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

  useEffect(() => {
    if (progressContext?.show === true) {
      swapContext?.setSwapButtonDisabled(true)
    }
  }, [progressContext])

  return(
    <>
      {progressContext?.show ? (
        <div className="flex flex-col justify-between items-center w-[95%] bg-base-100 rounded-md py-3 mb-3">
          <ul className="steps max-lg:steps-vertical max-lg:mt-5">
            <li className={step_0}>Approve</li>
            <li className={step_1}>Sign</li>
            <li className={step_2}>Broadcast</li>
            <li className={step_3}>Confirmed</li>
            {/* <li className={step_4}>Queued</li>
            <li className={step_5}>Executed</li> */}
          </ul>
          <div className="mt-5 px-5 text-center max-lg:w-[95%]">
            {parse(progressContext.message)}
          </div>
          {progressContext?.step >= 3 && (
            <div className="mt-2">
              <a onClick={() => {navigate('/activity'); resetProgress(progressContext, swapContext)}} className="btn btn-sm btn-outline btn-info">
                Go to Activity
              </a>
            </div>
          )}
        </div>
      ) : null }
    </>
  )
}

export default ProgressModal