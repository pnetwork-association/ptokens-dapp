import { PiWalletLight } from 'react-icons/pi'

import { useAppDispatch, useAppSelector } from "../../app/hook"
import { setWalletIsDrawerOpened } from '../../app/features/globals/globalSlice'

const WalletDrawerButton = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.global.walletStatus.isConnected)
  return(
    <div className="drawer-content">
      <button className="btn btn-sm text-md mr-2 ml-1" onClick={() => dispatch(setWalletIsDrawerOpened())}>
        {isLoading ? (
          <>
            <div>Connecting</div>
            <span className="loading loading-ring loading-md"></span>
          </>
        ) : (
          <>
            <PiWalletLight />
            <div>Connect</div>
          </>
        )}
      </button>
    </div>  
  )
}

export default WalletDrawerButton