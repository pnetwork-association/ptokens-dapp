import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Blockchain } from 'ptokens'
import { provider } from 'web3-core'

export type IWallet = {
  provider?: provider | null
  account: string | null
  chainId: number | null
  network: string | null
  permission?: string
  isConnected?: boolean
}

type WalletConnectedPayload = IWallet & { blockchain: Blockchain }

export type Wallets = Record<string, IWallet>

const initialState: Wallets = {
  [Blockchain.Arbitrum]: {
    provider: null,
    account: null,
    chainId: null,
    network: null,
  },
  [Blockchain.Gnosis]: {
    provider: null,
    account: null,
    chainId: null,
    network: null,
  },
}

const walletsSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    walletConnected: (_state, _action: PayloadAction<WalletConnectedPayload>) => {
      _state[_action.payload.blockchain] = {
        provider: _action.payload.provider,
        account: _action.payload.account,
        chainId: _action.payload.chainId,
        network: _action.payload.network,
      }
    },
    walletDisconnected: (_state, _action: PayloadAction<{ blockchain: Blockchain }>) => {
      _state[_action.payload.blockchain] = {
        provider: null,
        account: null,
        chainId: null,
        network: null,
      }
    },
    accountChanged: (_state, _action: PayloadAction<{ blockchain: Blockchain; account: string }>) => {
      _state[_action.payload.blockchain].account = _action.payload.account
    },
  },
})

export const { walletConnected, walletDisconnected, accountChanged } = walletsSlice.actions
export default walletsSlice.reducer
