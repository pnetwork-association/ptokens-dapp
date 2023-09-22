import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import swapChains, { Chain } from "../../../constants/swap-chains"

type IwalletGlobalStatus = {
  isConnected: boolean
  isDrawerOpened: boolean
  address: string | null
  chain: Chain | undefined | null
  balance: Number | null
}

type Istate = {
  walletStatus: IwalletGlobalStatus
  address: string
}

const initialState: Istate = {
  address: '',
  walletStatus: {
    isConnected: false,
    isDrawerOpened: false,
    address: null,
    chain: swapChains.find((chain: Chain) => chain.chainId === 42161),
    balance: null,
  },
}

export const globalSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setWalletIsConnected: (state, action: PayloadAction<boolean>) => {
      state.walletStatus.isConnected = action.payload
    },
    setWalletIsDrawerOpened: (state) => {
      state.walletStatus.isDrawerOpened = !state.walletStatus.isDrawerOpened
    },
    setWalletConnectedAddress: (state, action: PayloadAction<string>) => {
      state.walletStatus.address = action.payload
    },
    setWalletConnectedChain: (state, action: PayloadAction<Chain | undefined>) => {
      state.walletStatus.chain = action.payload
    },
    setWalletBalance: (state, action: PayloadAction<Number>) => {
      state.walletStatus.balance = action.payload
    },
  },
})

export const { 
  setWalletIsConnected,
  setWalletIsDrawerOpened,
  setWalletConnectedAddress,
  setWalletConnectedChain,
  setWalletBalance,
} = globalSlice.actions

export default globalSlice.reducer