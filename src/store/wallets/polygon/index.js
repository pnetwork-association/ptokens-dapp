import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { WALLET_POLYGON_CONNECTED, WALLET_POLYGON_ACCOUNT_CHANGED } from '../../../constants'
import { setupNetwork } from '../../../utils/wallet'
import settings from '../../../settings'
import { getWeb3ModalTheme } from '../../../theme/web3-modal'
import { getTheme } from '../../pages/pages.selectors'

const connectWithPolygonWallet = async _dispatch => {
  try {
    if (document.getElementById('WEB3_CONNECT_MODAL_ID')) {
      document.getElementById('WEB3_CONNECT_MODAL_ID').remove()
    }

    const web3Modal = new Web3Modal({
      theme: getWeb3ModalTheme(getTheme())
    })

    const provider = await web3Modal.connect()
    _connectionSuccesfull(provider, _dispatch, {
      type: 'multiWallet'
    })

    provider.on('accountsChanged', _accounts => {
      _dispatch({
        type: WALLET_POLYGON_ACCOUNT_CHANGED,
        payload: {
          account: _accounts[0]
        }
      })
    })
  } catch (_err) {
    console.error(_err)
  }
}

const disconnectFromPolygonWallet = () => {
  //TODO: disconnect from POLYGON wallet
}

const _connectionSuccesfull = async (_provider, _dispatch) => {
  try {
    const { accounts, chainId } = _provider
    const account = accounts ? accounts[0] : await _getAccount(_provider)

    if (Number(chainId) !== 137 && _provider.isMetaMask) {
      await setupNetwork({
        provider: _provider,
        chainId: 137,
        chainName: 'Polygon',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'matic',
          decimals: 18
        },
        nodes: [settings.rpc.mainnet.polygon.endpoint],
        blockExplorerUrls: [settings.explorers.mainnet.polygon]
      })

      _dispatch({
        type: WALLET_POLYGON_CONNECTED,
        payload: {
          provider: _provider,
          account,
          network: 'mainnet',
          chainId: 137
        }
      })
      return
    } else if (Number(chainId) === 137) {
      _dispatch({
        type: WALLET_POLYGON_CONNECTED,
        payload: {
          provider: _provider,
          account,
          network: 'mainnet',
          chainId
        }
      })
    }
  } catch (_err) {
    console.error(_err)
  }
}

const _getAccount = async _provider => {
  try {
    const web3 = new Web3(_provider)
    const accounts = await web3.eth.getAccounts()
    return accounts[0]
  } catch (_err) {
    console.error(`Error during getting Polygon account ${_err.message}`)
  }
}

export { connectWithPolygonWallet, disconnectFromPolygonWallet }
