import { useEffect } from 'react'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi'
import { RiCheckLine } from 'react-icons/ri'
import { Blockchain } from 'ptokens-constants'

import swapChains, { Chain} from '../../constants/swap-chains'
import { getPrettierAddress } from '../../utils/utils'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { setWalletConnectedAddress, setWalletConnectedChain, setWalletIsConnected, setWalletIsDrawerOpened } from '../../app/features/globals/globalSlice'
import WalletDrawerButton from '../../components/molecules/WalletDrawerButton'

 
export const Profile = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { address, connector, isConnected } = useAccount()
  const { chain } = useNetwork()
  const {  status: switchStatus, error: switchError, isLoading: switchLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()
  const selectedChain = useAppSelector(state => state.global.walletStatus.chain)
  const isWalletDrawerOpened = useAppSelector(state => state.global.walletStatus.isDrawerOpened)

  const handleWalletDrawerInputChange = () => {
    dispatch(setWalletIsDrawerOpened())
  }
 
  useEffect(() => {
    if (chain?.id != selectedChain?.chainId)
      switchNetwork?.(selectedChain?.chainId)
  }, [selectedChain, isConnected])

  useEffect(() => {
    isConnected ? dispatch(setWalletIsConnected(true)) : dispatch(setWalletIsConnected(false))
  }, [isConnected])

  useEffect(() => {
    if (switchStatus === 'error' && !switchLoading && isConnected && chain)
      dispatch(setWalletConnectedChain(swapChains.find((_chain: Chain) => _chain.chainId === chain.id)))
  }, [switchLoading])

  /** Handle wallet redux state */
  useEffect(() => {
    dispatch(setWalletConnectedAddress(address as string))
  }, [address])
 
  return (
    <div className='flex items-center'>
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-md btn-ghost flex-nowrap w-12 p-0 ml-2 hover:scale-110 hover:bg-base-100">
        {/* {selectedChain? (
            <>
              <img className="w-6 h-6 m-0" src={`/svg/${selectedChain.image}`} />
              {switchLoading && pendingChainId === selectedChain.chainId ? (
                <span className="loading loading-ring loading-md"></span>
              ) : (
                <RiArrowDownSLine size={20} color="gray" />
              )}
              
            </>
          ) : 'chains'} */}
        </label>
        <ul tabIndex={0} className="dropdown-content z-[1] menu m-2 p-2 shadow bg-gray-800 rounded-md w-52">
          {swapChains.map((swapChain) => (
            <button className='btn btn-sm text-md btn-outline mb-1 justify-start'
              key={swapChain.id}
              onClick={() => dispatch(setWalletConnectedChain(swapChain))}
            >
              <img className="w-6 h-6" src={`/svg/${swapChain.image}`} />
              {Blockchain[swapChain.blockchain]}
              {swapChain === selectedChain ? (
                <RiCheckLine />
              ) : null}
            </button>
          ))}
        </ul>
      </div>

      {!isConnected ? (
        <>
          <div className="drawer drawer-end">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isWalletDrawerOpened} onChange={handleWalletDrawerInputChange}/>
            <WalletDrawerButton />
            <div className="drawer-side">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content z-[100]">
                {connectors.map((connector) => (
                  <button className='btn btn-sm text-md btn-ghost justify-start'
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                  >
                    <img className="w-6" src={`/svg/${connector.name.toUpperCase()}.svg`} />
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                    {isLoading &&
                      connector.id === pendingConnector?.id &&
                      ' (connecting)'}
                  </button>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="dropdown dropdown-bottom dropdown-end mt-1">
            <label tabIndex={0} className="btn btn-sm text-md mx-1 ">
              {connector? <img className="w-7" src={`/svg/${connector.name.toUpperCase()}.svg`} /> : null}
              {address? getPrettierAddress(address, 5) : 'Connected'}
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu m-2 p-2 shadow bg-gray-800 rounded-md w-52">
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