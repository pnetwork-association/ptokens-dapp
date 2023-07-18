import { Blockchain } from 'ptokens-constants'
import { useMemo } from 'react'

import { IWallet, Wallets } from '../store/wallets/wallets.reducer'
import { slicerByBlockchain } from '../utils/account-viewer'
import { blockchainSymbolToName } from '../utils/maps'

export type IUseWallets = IWallet & {
  blockchain: Blockchain
  formattedAccount: string | null
  formattedBlockchain: string
  isConnected: boolean
}

const useWallets = (_wallets: Wallets) => {
  return useMemo(() => {
    const wallets: IUseWallets[] = Object.values(_wallets).map((_wallet) => ({
      formattedAccount: _wallet.account ? slicerByBlockchain(_wallet.account, _wallet.blockchain) : '-',
      formattedBlockchain: blockchainSymbolToName[_wallet.blockchain],
      ..._wallet,
      isConnected: _wallets[_wallet.blockchain] && _wallets[_wallet.blockchain].account ? true : false,
    }))

    const connectedWallets = wallets.filter(({ account }) => account)

    return {
      isConnected: connectedWallets.length > 0,
      connectedWallets,
      wallets: wallets,
    }
  }, [_wallets])
}

const useWalletByBlockchain = (_wallets: Wallets, _blockchain: Blockchain | null) => {
  return useMemo(() => {
    if (!_blockchain) {
      return {
        isConnected: false,
        provider: null,
      }
    }

    const wallet = _wallets[_blockchain]
    return {
      isConnected: wallet && wallet.account ? true : false,
      provider: wallet && wallet.account && wallet.provider ? wallet.provider : null,
    }
  }, [_wallets, _blockchain])
}

export { useWallets, useWalletByBlockchain }
