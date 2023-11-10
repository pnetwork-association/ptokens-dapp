import { useContext } from 'react'
import { PiWalletLight } from 'react-icons/pi'

import { WalletContext } from '../../app/ContextProvider'

// import { useAppDispatch, useAppSelector } from "../../app/hook"
// import { setWalletIsDrawerOpened } from '../../app/features/globals/globalSlice'

const WalletDrawerButton = (): JSX.Element => {
  const walletContext = useContext(WalletContext)
  return(
    <div className="drawer-content ml-1">
      <button className="btn btn-ghost normal-case text-lg mr-1 align-middle" onClick={() => walletContext?.toggleWalletDrawer()}>
        {walletContext?.isWalletLoading ? (
          <>
            <div className="pb-[3px]">Connecting</div>
            <span className="loading loading-ring loading-md"></span>
          </>
        ) : (
          <>
            <PiWalletLight />
            <div className="pb-[3px]">Connect</div>
          </>
        )}
      </button>
    </div>  
  )
}

export default WalletDrawerButton