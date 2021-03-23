export const setupNetwork = ({
  provider,
  chainId,
  chainName,
  nativeCurrency: { name, symbol, decimals },
  nodes,
  blockExplorerUrls
}) =>
  provider.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: `0x${chainId.toString(16)}`,
        chainName,
        nativeCurrency: {
          name,
          symbol,
          decimals
        },
        rpcUrls: nodes,
        blockExplorerUrls
      }
    ]
  })

export const registerToken = ({ provider, tokenAddress, tokenSymbol, tokenDecimals, tokenImage }) =>
  provider.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage
      }
    }
  })
