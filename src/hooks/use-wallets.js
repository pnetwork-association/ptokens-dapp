import { useMemo } from 'react'
import { blockchainSymbolToName } from '../utils/maps'
import { slicerByBlockchain } from '../utils/account-viewer'

const useWallets = _wallets => {
  return useMemo(() => {
    const wallets = Object.keys(_wallets).map(_blockchain => ({
      blockchain: _blockchain.toUpperCase(),
      formattedAccount: _wallets[_blockchain].account
        ? slicerByBlockchain(_wallets[_blockchain].account, _blockchain)
        : '-',
      formattedBlockchain: blockchainSymbolToName[_blockchain.toUpperCase()],
      ..._wallets[_blockchain],
      isConnected: _wallets[_blockchain] && _wallets[_blockchain].account
    }))

    const connectedWallets = wallets.filter(({ account }) => account)

    return {
      isConnected: connectedWallets.length > 0,
      connectedWallets,
      wallets: wallets
    }
  }, [_wallets])
}

const useWalletByBlockchain = (_wallets, _blockchain) => {
  return useMemo(() => {
    if (!_blockchain) {
      return {
        isConnected: false,
        provider: null
      }
    }

    const wallet = _wallets[_blockchain.toLowerCase()]
    return {
      isConnected: wallet && wallet.account,
      provider: wallet && wallet.account ? wallet.provider : null
    }
  }, [_wallets, _blockchain])
}

export { useWallets, useWalletByBlockchain }
