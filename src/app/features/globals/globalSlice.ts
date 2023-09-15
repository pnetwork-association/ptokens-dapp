import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import swapChains, { Chain } from "../../../constants/swap-chains"
import { AssetId } from "../../../constants"
import swapAssets, { AssetWithAddress, isNative } from "../../../constants/swap-assets"
import { computePTokenAddress } from "./globals"

type IwalletGlobalStatus = {
  isConnected: boolean
  isDrawerOpened: boolean
  address: string | null
  chain: Chain | undefined | null
  balance: Number | null
}

type Istate = {
  assets: Partial<Record<AssetId, AssetWithAddress>>
  walletStatus: IwalletGlobalStatus
  address: string
}

const initialState: Istate = {
  assets: {},
  address: '',
  walletStatus: {
    isConnected: false,
    isDrawerOpened: false,
    address: null,
    chain: swapChains.find((chain: Chain) => chain.chainId === 42161),
    balance: null,
  },
}

export const loadAssetsData = createAsyncThunk('assets/loadAssetsData', async () => {
  try {
    const assetsWithAddress = Object.fromEntries(
      await Promise.all(
        Object.values(swapAssets).map(async (_asset) => {
          const pTokenAddress: string = await computePTokenAddress(_asset, swapAssets)
          return [
            _asset.id,
            {
              ..._asset,
              address: 'address' in _asset ? _asset.address : pTokenAddress,
              pTokenAddress: isNative(_asset) ? pTokenAddress : null,
            },
          ] as [AssetId, AssetWithAddress]
        })
      )
    ) as Record<AssetId, AssetWithAddress>
    return assetsWithAddress
  } catch (error) {
    throw error;
  }
})

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
  extraReducers: (builder) => {
  builder
    .addCase(loadAssetsData.fulfilled, (state, action) => {
      state.assets = action.payload
    })
  }
})

export const { 
  setWalletIsConnected,
  setWalletIsDrawerOpened,
  setWalletConnectedAddress,
  setWalletConnectedChain,
  setWalletBalance,
} = globalSlice.actions

export default globalSlice.reducer