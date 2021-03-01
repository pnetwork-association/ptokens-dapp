import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { toastr } from 'react-redux-toastr'
import { WALLET_BSC_CONNECTED, WALLET_BSC_NETWORK_CHANGED, WALLET_BSC_ACCOUNT_CHANGED } from '../../../constants'

const connectWithBscWallet = async _dispatch => {
  try {
    if (document.getElementById('WEB3_CONNECT_MODAL_ID')) {
      document.getElementById('WEB3_CONNECT_MODAL_ID').remove()
    }

    const web3Modal = new Web3Modal({})

    const provider = await web3Modal.connect()
    _connectionSuccesfull(provider, _dispatch, {
      type: 'multiWallet'
    })

    provider.on('chainChanged', _chainId => {
      if (Number(_chainId) !== 56) {
        toastr.error('Invalid Binance Smart Chain Network. Please switch use chainId = 56')
      }

      _dispatch({
        type: WALLET_BSC_NETWORK_CHANGED,
        payload: {
          network: Number(_chainId) === 56 ? 'mainnet' : 'testnet',
          chainId: _chainId
        }
      })
    })

    provider.on('accountsChanged', _accounts => {
      _dispatch({
        type: WALLET_BSC_ACCOUNT_CHANGED,
        payload: {
          account: _accounts[0]
        }
      })
    })
  } catch (_err) {
    console.error(_err)
  }
}

const disconnectFromBscWallet = () => {
  //TODO: disconnect from BSC wallet
}

const _connectionSuccesfull = async (_provider, _dispatch) => {
  try {
    const { accounts, chainId } = _provider
    if (Number(chainId) !== 56) {
      toastr.error('Invalid Binance Smart Chain Network. Please switch use chainId = 56')
    }

    const account = accounts ? accounts[0] : await _getAccount(_provider)
    _dispatch({
      type: WALLET_BSC_CONNECTED,
      payload: {
        provider: _provider,
        account,
        network: Number(chainId) === 56 ? 'mainnet' : 'testnet',
        chainId
      }
    })
  } catch (_err) {
    toastr.error('Error during connection with Binance Smart Chain wallet')
  }
}

const _getAccount = async _provider => {
  try {
    const web3 = new Web3(_provider)
    const accounts = await web3.eth.getAccounts()
    return accounts[0]
  } catch (_err) {
    console.error(`Error during getting Binance Smart Chain account ${_err.message}`)
  }
}

export { connectWithBscWallet, disconnectFromBscWallet }
