import EventEmitter from 'eventemitter3'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Modal from '../eosConnect/components/Modal'

import connectToDeflyWallet from './connectors/defly-wallet'
import connectToPeraWallet from './connectors/pera-wallet'

const INITIAL_STATE = { show: false }

const THEME_COLORS = {
  background: 'rgb(255, 255, 255)',
  main: 'rgb(12, 12, 13)',
  secondary: 'rgb(169, 169, 188)',
  border: 'rgba(195, 195, 195, 0.14)',
  hover: 'rgba(195, 195, 195, 0.14)',
}

// TODO
// - user options passed in constructor in order to enable user to choose the wallet
class AlgoWalletModal extends EventEmitter {
  show = false
  lightboxOpacity = 0.4
  themeColors = THEME_COLORS

  constructor(_configs) {
    super()
    this.themeColors = _configs.theme && _configs.theme !== 'light' ? _configs.theme : THEME_COLORS
    this.setConfigs(_configs)

    this._call = null
  }

  async connect() {
    await this.toogleModal()
    return new Promise((resolve, reject) => {
      this._call = {
        resolve,
        reject,
      }
    })
  }

  setConfigs = ({ dappName, providerOptions: { algoSigner, walletConnect, myAlgoWallet } }) => {
    this.userOptions = []

    this.userOptions.push({
      name: 'Pera Wallet',
      logo: './assets/png/pera-wallet-logo.png',
      description: 'Connect to Pera Wallet',
      themeColors: this.themeColors,
      onClick: async () => {
        this._call.resolve(await connectToPeraWallet())
        await this.toogleModal()
      },
    })

    this.userOptions.push({
      name: 'Defly Wallet',
      logo: './assets/png/defly-wallet-logo.png',
      description: 'Connect to Defly Wallet',
      themeColors: this.themeColors,
      onClick: async () => {
        this._call.resolve(await connectToDeflyWallet())
        await this.toogleModal()
      },
    })

    this.renderModal()
  }

  renderModal = async () => {
    let el = document.getElementById('ALGO_WALLET_MODAL')
    if (!el) {
      el = document.createElement('div')
      el.id = 'ALGO_WALLET_MODAL'
      document.body.appendChild(el)
    }

    ReactDOM.render(
      <Modal
        themeColors={this.themeColors}
        userOptions={this.userOptions}
        onClose={this.onClose}
        resetState={this.resetState}
        lightboxOpacity={this.lightboxOpacity}
      />,
      document.getElementById('ALGO_WALLET_MODAL')
    )
  }

  toogleModal = async () => {
    const d = typeof window !== 'undefined' ? document : ''
    const body = d ? d.body || d.getElementsByTagName('body')[0] : ''
    if (body) {
      if (this.show) {
        body.style.overflow = ''
      } else {
        body.style.overflow = 'hidden'
      }
    }
    await this.updateState({ show: !this.show })
  }

  onClose = async () => {
    if (this.show) {
      await this.toogleModal()
    }
  }

  updateState = async (_state) => {
    Object.keys(_state).forEach((key) => {
      this[key] = _state[key]
    })
    await window.updateEosConnect(_state)
  }

  resetState = () => this.updateState({ ...INITIAL_STATE })

  handleClick = async (_provider) => {
    this._call.resolve(await this.walletConnectProvider.connect())
  }
}

export default AlgoWalletModal
