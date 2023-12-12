import { useContext, useEffect } from 'react'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi'
import { RiCheckLine, RiArrowDownSLine } from 'react-icons/ri'
import { Blockchain } from 'ptokens-constants'

import swapChains, { Chain } from '../../../constants/swap-chains'
import { getPrettierAddress } from '../../../utils/utils'
import WalletDrawerButton from '../../../components/molecules/WalletDrawerButton'
import { WalletContext } from '../../ContextProvider'

 
export const Profile = (): JSX.Element => {
  const { address, connector, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { status: switchStatus, error: switchError, isLoading: switchLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()
  const walletContext = useContext(WalletContext)

  const handleWalletDrawerInputChange = () => {
    walletContext?.toggleWalletDrawer()
  }
 
  useEffect(() => {
    if (chain?.id != walletContext?.walletSelChain?.chainId)
      switchNetwork?.(walletContext?.walletSelChain?.chainId)
  }, [walletContext?.walletSelChain, isConnected])

  useEffect(() => {
    walletContext?.setIsWalletConnected(isConnected)
  }, [isConnected])

  useEffect(() => {
    if (switchStatus === 'error' && !switchLoading && isConnected && chain)
      walletContext?.setWalletSelChain((Object.values(swapChains).find((_chain: Chain) => _chain.chainId === chain.id)))
  }, [switchLoading])
 
  return (
    <div className='flex items-center'>
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-md btn-ghost flex-nowrap w-12 p-0 ml-2 hover:scale-105 hover:bg-base-100">
        {walletContext?.walletSelChain ? (
            <>
              <img className="w-6 h-6 m-0 max-lg:hidden" src={`/svg/${walletContext.walletSelChain.image}`} />
              <img className="w-4 h-4 m-0 lg:hidden" src={`/svg/${walletContext.walletSelChain.image}`} />
              {switchLoading && pendingChainId === walletContext.walletSelChain.chainId ? (
                <span className="loading loading-ring loading-md"></span>
              ) : (
                <div className='max-lg:w-0'>
                  <div className='max-lg:hidden'><RiArrowDownSLine size={20} color="gray" /></div>
                  <div className='lg:hidden'><RiArrowDownSLine size={10} color="gray" /></div>
                </div>
              )}
            </>
          ) : 'chains'}
        </label>
        <ul tabIndex={0} className="dropdown-content menu m-2 p-2 shadow bg-base-200 border border-base-300 rounded-md w-44 fixed z-[99]">
          {Object.values(swapChains).map((swapChain) => (
            <button className='btn btn-sm text-md btn-outline mb-1 justify-start'
              key={swapChain.id}
              onClick={() => walletContext?.setWalletSelChain(swapChain)}
            >
              <img className="w-6 h-6" src={`/svg/${swapChain.image}`} />
              {Blockchain[swapChain.blockchain]}
              {swapChain === walletContext?.walletSelChain ? (
                <RiCheckLine />
              ) : null}
            </button>
          ))}
        </ul>
      </div>

      {!isConnected ? (
        <>
          <div className="drawer drawer-end">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={walletContext?.isDrawerExtended} onChange={handleWalletDrawerInputChange}/>
            <WalletDrawerButton />
            <div className="drawer-side fixed z-[50] overflow-x-hidden">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {connectors.map((connector) => (
                  <button className='btn btn-sm text-md btn-ghost justify-start'
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                  >
                    <img className="w-6" src={`/svg/${connector.name.toUpperCase()}.svg`} />
                    {connector.name}
                    {/* {!connector.ready && ' (unsupported)'} */}
                    {isLoading &&
                      connector.id === pendingConnector?.id &&
                      (<span className="loading loading-ring loading-md"></span>)}
                  </button>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="dropdown dropdown-bottom dropdown-end mt-1">
            <label tabIndex={0} className="btn btn-sm text-md mx-1 max-lg:hidden">
              {connector? <img className="w-7" src={`/svg/${connector.name.toUpperCase()}.svg`} /> : null}
              {address? getPrettierAddress(address, 5) : 'Connected'}
            </label>
            <label tabIndex={0} className="btn btn-sm text-md mx-1 lg:hidden">
              {connector? <img className="w-4" src={`/svg/${connector.name.toUpperCase()}.svg`} /> : null}
              {address? getPrettierAddress(address, 2) : 'Connected'}
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu m-2 p-2 shadow bg-base-200 border border-base-300 rounded-md w-52">
              <button className='btn btn-sm text-md btn-ghost justify-start' onClick={() => disconnect()}>Disconnect</button>
            </ul>
          </div>
        </>
      )}
      
      {error ? (
        <div className="toast">
          <div className="alert alert-error">
            <span>{error && <div>{error.message}</div>}</span>
          </div>
        </div>
      ) : null}

      {switchError ? (
        <div className="toast">
          <div className="alert alert-error">
            <span>{switchError && <div>{switchError.message}</div>}</span>
          </div>
        </div>
      ) : null}
      
    </div>
  )
}

export default Profile