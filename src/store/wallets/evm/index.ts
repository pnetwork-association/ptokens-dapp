import WalletConnectProvider from '@walletconnect/web3-provider'
import { Blockchain, Network } from 'ptokens-constants'
import WalletLink from 'walletlink'
import Web3 from 'web3'
import { provider } from 'web3-core'
import Web3Modal from 'web3modal'

import { AppDispatch, AppThunk } from '../..'
import settings from '../../../settings'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { changeNetwork, setupNetwork } from '../../../utils/wallet'
import { getTheme } from '../../pages/pages.selectors'
import { walletConnected, walletDisconnected, accountChanged } from '../wallets.reducer'
import { getWalletProviderByBlockchain } from '../wallets.selectors'
import { createWalletConnect2 } from '../wallets.utils'

let web3Modal: Web3Modal

const connectWithEvmWallet =
  (_blockchain: Blockchain, _network = Network.Mainnet): AppThunk =>
  async (_dispatch: AppDispatch) => {
    try {
      console.info('connectWithEvmWallet', _blockchain, _network)
      if (document.getElementById('WEB3_CONNECT_MODAL_ID')) {
        document.getElementById('WEB3_CONNECT_MODAL_ID').remove()
      }
      web3Modal = new Web3Modal({
        theme: getWeb3ModalTheme(getTheme()),
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              network: 'xdai',
              rpc: {
                [settings.rpc[_network][_blockchain].chainId]: settings.rpc[_network][_blockchain].endpoint,
              },
            },
          },
          'custom-walletconnectv2': createWalletConnect2(settings.rpc[_network][_blockchain].chainId),
          walletlink: {
            package: WalletLink,
            options: {
              appName: settings.dappName,
              rpc: settings.rpc[Network.Mainnet][Blockchain.Gnosis].endpoint,
              chainId: settings.rpc[Network.Mainnet][Blockchain.Gnosis].chainId,
              darkMode: getTheme() === 'dark',
            },
          },
        },
      })
      console.info('connecting')
      const provider = await web3Modal.connect()
      _dispatch(_connectionSuccesfull(provider, _blockchain))

      provider.on('accountsChanged', (_accounts: string[]) => {
        _dispatch(accountChanged({ blockchain: _blockchain, account: _accounts[0] }))
      })
    } catch (_err) {
      console.error(_err)
    }
  }

const disconnectFromEvmWallet =
  (_blockchain: Blockchain): AppThunk =>
  async (_dispatch: AppDispatch) => {
    const provider = getWalletProviderByBlockchain(_blockchain)
    if (provider.close) {
      await provider.close()
    }
    await web3Modal.clearCachedProvider()
    _dispatch(walletDisconnected({ blockchain: _blockchain }))
  }

const _connectionSuccesfull =
  (
    _provider: { accounts: string[]; chainId: string | number; isMetaMask: boolean },
    _blockchain: Blockchain
  ): AppThunk =>
  async (_dispatch: AppDispatch) => {
    console.info('_connectionSuccesfull', _blockchain, _provider)
    try {
      const { accounts, chainId } = _provider
      const account = accounts ? accounts[0] : await _getAccount(_provider)

      if (Number(chainId) !== settings.rpc[Network.Mainnet][Blockchain.Gnosis].chainId && _provider.isMetaMask) {
        try {
          await changeNetwork({
            provider: _provider,
            chainId: settings.rpc[Network.Mainnet][Blockchain.Gnosis].chainId,
          })
        } catch (err) {
          if (err && err.code === 4902) {
            await setupNetwork({
              provider: _provider,
              chainId: settings.rpc[Network.Mainnet][Blockchain.Gnosis].chainId,
              chainName: 'XDAI',
              nativeCurrency: {
                name: 'XDAI',
                symbol: 'xdai',
                decimals: 18,
              },
              nodes: [settings.rpc[Network.Mainnet][Blockchain.Gnosis].endpoint],
              blockExplorerUrls: [settings.explorers[Network.Mainnet][Blockchain.Gnosis]],
            })
          }
        }

        _dispatch(
          walletConnected({
            provider: _provider,
            account,
            network: 'mainnet',
            chainId: settings.rpc[Network.Mainnet][Blockchain.Gnosis].chainId,
            blockchain: _blockchain,
          })
        )
        return
      } else if (Number(chainId) === settings.rpc[Network.Mainnet][Blockchain.Gnosis].chainId) {
        _dispatch(
          walletConnected({
            provider: _provider,
            account,
            network: 'mainnet',
            chainId: Number(chainId),
            blockchain: _blockchain,
          })
        )
      }
    } catch (_err) {
      console.error(_err)
    }
  }

const _getAccount = async (_provider: provider): Promise<string | null> => {
  try {
    const web3 = new Web3(_provider)
    const accounts = await web3.eth.getAccounts()
    return accounts[0]
  } catch (_err) {
    if (_err instanceof Error) console.error(`Error during getting xDai account ${_err.message}`)
    else console.error(String(_err))
    return null
  }
}

export { connectWithEvmWallet, disconnectFromEvmWallet }
