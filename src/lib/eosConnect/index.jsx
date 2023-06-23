import EventEmitter from 'eventemitter3'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Modal from './components/Modal'
import AnchorProvider from './providers/anchor'
import LibreProvider from './providers/libre'
import TokenPocketProvider from './providers/token-pocket'

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
class EosConnect extends EventEmitter {
  show = false
  lightboxOpacity = 0.4
  themeColors = THEME_COLORS

  constructor(_configs) {
    super()
    this.themeColors = _configs.theme && _configs.theme !== 'light' ? _configs.theme : THEME_COLORS
    this.setConfigs(_configs)
    this.renderModal()
  }

  setConfigs = ({ dappName, providerOptions: { tokenPocket, anchor, libre } }) => {
    this.userOptions = []
    if (anchor) {
      this.anchorProvider = new AnchorProvider({
        settings: anchor.settings,
        dappName,
      })

      this.userOptions.push({
        name: 'Anchor',
        logo: './assets/svg/anchor.svg',
        description: 'Anchor Wallet',
        themeColors: this.themeColors,
        onClick: () => this.handleClick(this.anchorProvider),
      })
    }
    if (libre) {
      this.libreProvider = new LibreProvider({
        settings: libre.settings,
        dappName,
      })

      this.userOptions.push({
        name: 'Libre',
        logo: '../assets/svg/libre_wallet.svg',
        description: 'Libre Wallet',
        themeColors: this.themeColors,
        onClick: () => this.handleClick(this.libreProvider),
      })
    }
    if (tokenPocket) {
      this.tokenPocketProvider = new TokenPocketProvider({
        settings: {
          ...tokenPocket.settings,
        },
        dappName,
      })

      this.userOptions.push({
        name: 'Token Pocket',
        logo: './assets/png/token-pocket.png',
        description: 'Token Pocket Wallet',
        themeColors: this.themeColors,
        onClick: () => this.handleClick(this.tokenPocketProvider),
      })
    }
    this.renderModal()
  }

  renderModal = async () => {
    let el = document.getElementById('EOS_CONNECT')
    if (!el) {
      el = document.createElement('div')
      el.id = 'EOS_CONNECT'
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
      document.getElementById('EOS_CONNECT')
    )
  }

  toggleModal = async () => {
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
      await this.toggleModal()
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
    const { success, provider, account, message } = await _provider.connect()
    await this.onClose()

    if (success) {
      this.emit('connect', { provider, account })
    } else {
      this.emit('error', message)
    }
  }
}

export default EosConnect
