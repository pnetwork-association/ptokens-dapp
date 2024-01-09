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
            <div className="pb-[3px] max-lg:hidden"><PiWalletLight /></div>
            <div className="pb-[3px] lg:hidden"><PiWalletLight size={25} /></div>
            <div className="pb-[3px] max-lg:hidden">Connect</div>
          </>
        )}
      </button>
    </div>  
  )
}

export default WalletDrawerButton