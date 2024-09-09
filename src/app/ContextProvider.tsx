import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'
import { pTokensAsset } from '@p.network/ptokens-entities'
import { Chain } from '../constants/swap-chains'
import { defaults } from '../constants/defaults'

type TPtokenAssets = {
  origAsset: pTokensAsset | undefined
  destAsset: pTokensAsset | undefined
}

type TpTokenAssetsContext = {
  asset: TPtokenAssets | undefined
  setOrig: Dispatch<SetStateAction<pTokensAsset | undefined>>
  setDest: Dispatch<SetStateAction<pTokensAsset | undefined>>
} | undefined

type TWalletDrawerContext = {
  isDrawerExtended: boolean
  isWalletLoading: boolean
  isWalletConnected: boolean
  walletSelChain: Chain | undefined
  toggleWalletDrawer: Function
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setWalletSelChain: Dispatch<SetStateAction<Chain | undefined>>
  setIsWalletConnected: Dispatch<SetStateAction<boolean>>
} | undefined

type TAmount = {
  bigIntAmount: bigint
  amount: string
}

export type TSwapContext = {
  swapButtonText: string
  swapButtonDisabled: boolean
  swapAmount: TAmount
  receiveAmount: string
  destinationAddress: string
  setSwapButtonText: Dispatch<SetStateAction<string>>
  setSwapButtonDisabled: Dispatch<SetStateAction<boolean>>
  setSwapAmount: Dispatch<SetStateAction<TAmount>>
  setReceiveAmount: Dispatch<SetStateAction<string>>
  setDestinationAddress: Dispatch<SetStateAction<string>>
} | undefined

export type TProgressContext = {
  show: boolean
  step: number
  message: string
  isComplete: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  setStep: Dispatch<SetStateAction<number>>
  setMessage: Dispatch<SetStateAction<string>>
  setIsComplete: Dispatch<SetStateAction<boolean>>
} | undefined

type ContextProviderProps = {
  children: ReactNode
}

export const PTokenAssetsContext = createContext<TpTokenAssetsContext>(undefined)
export const WalletContext = createContext<TWalletDrawerContext>(undefined)
export const SwapContext = createContext<TSwapContext>(undefined)
export const ProgressContext = createContext<TProgressContext>(undefined)

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [originPTokensAsset, setOriginPTokensAsset] = useState<pTokensAsset | undefined>(undefined)
  const [destPTokensAsset, setDestPTokensAsset] = useState<pTokensAsset | undefined>(undefined)
  const [isWalletDrawerExtended, setIsWalletDrawerExtended] = useState<boolean>(false)
  const [isWalletLoading, setIsWalletLoading] = useState<boolean>(false)
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)
  const [walletSelectedChain, setWalletSelectedChain] = useState<Chain | undefined>(defaults.originChain)
  const [swapButtonText, setSwapButtonText] = useState<string>('Swap')
  const [swapButtonDisabled, setSwapButtonDisabled] = useState<boolean>(false)
  const [swapAmount, setSwapAmount] = useState<TAmount>({amount: '0', bigIntAmount: 0n})
  const [receiveAmount, setReceiveAmount] = useState<string>('0')
  const [destinationAddress, setDestinationAddress] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const [step, setStep] = useState<number>(0)
  const [message, setMessage] = useState<string>('')
  const [isComplete, setIsComplete] = useState<boolean>(false)

  const setWalletDrawerStatus = () => setIsWalletDrawerExtended(!isWalletDrawerExtended)

  return (
    <PTokenAssetsContext.Provider 
      value={{
        asset: {origAsset: originPTokensAsset, destAsset: destPTokensAsset},
        setOrig: setOriginPTokensAsset,
        setDest: setDestPTokensAsset,
      }}
    >
      <WalletContext.Provider
        value={{
          isDrawerExtended: isWalletDrawerExtended,
          isWalletLoading: isWalletLoading,
          walletSelChain: walletSelectedChain,
          isWalletConnected: isWalletConnected,
          toggleWalletDrawer: setWalletDrawerStatus,
          setIsLoading: setIsWalletLoading,
          setWalletSelChain: setWalletSelectedChain,
          setIsWalletConnected: setIsWalletConnected,
        }}
      >
        <SwapContext.Provider
          value={{
            swapButtonText: swapButtonText,
            swapButtonDisabled: swapButtonDisabled,
            swapAmount: swapAmount,
            receiveAmount: receiveAmount,
            destinationAddress: destinationAddress,
            setSwapButtonText: setSwapButtonText,
            setSwapButtonDisabled: setSwapButtonDisabled,
            setSwapAmount: setSwapAmount,
            setReceiveAmount: setReceiveAmount,
            setDestinationAddress: setDestinationAddress,
          }}
        >
          <ProgressContext.Provider
            value={{
              show: show,
              step: step,
              message: message,
              isComplete: isComplete,
              setShow: setShow,
              setStep: setStep,
              setMessage: setMessage,
              setIsComplete: setIsComplete,
            }}
          >
            {children}
          </ProgressContext.Provider>
        </SwapContext.Provider>
      </WalletContext.Provider>
    </PTokenAssetsContext.Provider>
  )
}

export default ContextProvider