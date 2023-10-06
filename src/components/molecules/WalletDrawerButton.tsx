import { useContext } from 'react'
import { PiWalletLight } from 'react-icons/pi'

import { WalletContext } from '../../app/ContextProvider'

// import { useAppDispatch, useAppSelector } from "../../app/hook"
// import { setWalletIsDrawerOpened } from '../../app/features/globals/globalSlice'

const WalletDrawerButton = (): JSX.Element => {
  const walletContext = useContext(WalletContext)
  return(
    <div className="drawer-content">
      <button className="btn btn-sm text-md mr-2 ml-1" onClick={() => walletContext?.toggleWalletDrawer()}>
        {walletContext?.isWalletLoading ? (
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