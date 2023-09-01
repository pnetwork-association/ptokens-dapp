import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi'
import swapChains, { Chain} from '../../constants/swap-chains'
import { useEffect, useState } from 'react'
import { RiArrowDownSLine, RiCheckLine } from 'react-icons/ri'
import { PiPlugs, PiPlugsConnected, PiWalletLight } from 'react-icons/pi'
import { Blockchain } from 'ptokens-constants'
import { getPrettierAddress } from '../../utils'
 
export function Profile() {
  const { address, connector, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { chains, status: switchStatus, error: switchError, isLoading: switchLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()
  const [selectedChain, setSelectedChain] = useState(swapChains.find((chain: Chain) => chain.chainId === 42161))
 
  useEffect(() => {
    console.log('chainging', selectedChain?.chainId, chain?.id)
    if (chain?.id != selectedChain?.chainId)
      switchNetwork?.(selectedChain?.chainId)
  }, [selectedChain, isConnected])

  useEffect(() => {
    if (switchStatus === 'error' && !switchLoading && isConnected && chain)
      setSelectedChain(swapChains.find((_chain: Chain) => _chain.chainId === chain.id))
  }, [switchLoading])

  // if (isConnected) {
  //   return (
  //     <div className='flex items-center'>
  //     <div className="dropdown dropdown-bottom dropdown-end">
  //       <label tabIndex={0} className="btn btn-md btn-ghost p-0 ml-2 hover:scale-110 hover:bg-base-100">
  //         {selectedChain? (
  //           <>
  //             <img className="w-8 h-8" src={`/svg/${selectedChain.image}`} />
  //             {switchLoading && pendingChainId === selectedChain.chainId ? (
  //               <span className="loading loading-ring loading-md"></span>
  //             ) : (
  //               <RiArrowDownSLine size={20} color="gray" />
  //             )}
              
  //           </>
  //         ) : 'chains'}
  //       </label>
  //       <ul tabIndex={0} className="dropdown-content z-[1] menu m-2 p-2 shadow bg-gray-800 rounded-md w-52">
  //         {swapChains.map((swapChain) => (
  //           <button className='btn btn-ghost justify-start'
  //             key={swapChain.id}
  //             onClick={() => setSelectedChain(swapChain)}
  //           >
  //             <img className="w-6 h-6" src={`/svg/${swapChain.image}`} />
  //             {Blockchain[swapChain.blockchain]}
  //             {swapChain === selectedChain ? (
  //               <RiCheckLine />
  //             ) : null}
  //           </button>
  //         ))}
  //       </ul>
  //     </div>



  //     <div>
  //       {/* <img src={ensAvatar} alt="ENS Avatar" /> */}
  //       <div>{address}</div>
  //       <div>Connected to {connector ? connector.name : null}</div>
  //       {chain && <div>Connected to {chain.name}</div>}
 
  //     {chains.map((x) => (
  //       <button
  //         disabled={!switchNetwork || x.id === chain?.id}
  //         key={x.id}
  //         onClick={() => switchNetwork?.(x.id)}
  //       >
  //         {x.name}
  //         {switchLoading && pendingChainId === x.id && ' (switching)'}
  //       </button>
  //     ))}
 
  //     <div>{switchError && switchError.message}</div>
  //       <button onClick={() => disconnect()}>Disconnect</button>
  //     </div>
  //   </div>
  //   )
  // }
 
  return (
    <div className='flex items-center'>
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-md btn-ghost p-0 ml-2 hover:scale-110 hover:bg-base-100">
        {selectedChain? (
            <>
              <img className="w-6 h-6 m-0" src={`/svg/${selectedChain.image}`} />
              {switchLoading && pendingChainId === selectedChain.chainId ? (
                <span className="loading loading-ring loading-md"></span>
              ) : (
                <RiArrowDownSLine size={20} color="gray" />
              )}
              
            </>
          ) : 'chains'}
        </label>
        <ul tabIndex={0} className="dropdown-content z-[1] menu m-2 p-2 shadow bg-gray-800 rounded-md w-52">
          {swapChains.map((swapChain) => (
            <button className='btn btn-sm text-md btn-outline mb-1 justify-start'
              key={swapChain.id}
              onClick={() => setSelectedChain(swapChain)}
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
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn btn-sm text-md mr-2 ml-1">
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
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu m-2 p-2 shadow bg-gray-800 rounded-md w-52">
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