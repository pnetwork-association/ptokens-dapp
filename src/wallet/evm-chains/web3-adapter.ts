import * as React from 'react'
import { type WalletClient, useWalletClient } from 'wagmi'
import { providers } from 'ethers'
import Web3, { ContractOnceRequiresCallbackError } from 'web3' 
import { sign } from 'viem/accounts'
import { pTokensEvmProvider } from 'ptokens-assets-evm'
 
export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new providers.Web3Provider(transport, network)
  const signer = provider.getSigner(account.address)
  return signer
}
 
/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId })
  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient],
  )
}

export function useWeb3Signer({ chainId } : { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return React.useMemo(
    () =>
      walletClient
        ? new Web3((walletClientToSigner(walletClient) as any)?.provider?.provider)
        : undefined,
    [walletClient]
  )
}