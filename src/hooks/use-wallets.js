import { useMemo } from 'react'
import { blockchainSymbolToName } from '../utils/maps'
import { slicer } from '../utils/account-viewer'

const useWallets = _wallets => {
  return useMemo(() => {
    const wallets = Object.keys(_wallets).map(_blockchain => ({
      blockchain: _blockchain.toUpperCase(),
      formattedAccount: _wallets[_blockchain].account
        ? _blockchain === 'eos'
          ? _wallets[_blockchain].account
          : slicer(_wallets[_blockchain].account)
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

export { useWallets }