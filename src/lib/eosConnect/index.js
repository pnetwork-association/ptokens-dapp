import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Modal from './components/Modal'
import EventEmitter from 'eventemitter3'
import ScatterProvider from './providers/scatter'
import AnchorProvider from './providers/anchor'
import TokenPocketProvider from './providers/token-pocket'

const INITIAL_STATE = { show: false }

const THEME_COLORS = {
  background: 'rgb(255, 255, 255)',
  main: 'rgb(12, 12, 13)',
  secondary: 'rgb(169, 169, 188)',
  border: 'rgba(195, 195, 195, 0.14)',
  hover: 'rgba(195, 195, 195, 0.14)'
}

// TODO
// - user options passed in constructor in order to enable user to choose the wallet
class EosConnect extends EventEmitter {
  show = false
  lightboxOpacity = 0.4
  themeColors = THEME_COLORS

  constructor({ dappName, scatter, tokenPocket }) {
    super()

    this.scatterProvider = new ScatterProvider({
      dappName,
      settings: scatter.settings
    })
    this.anchorProvider = new AnchorProvider({
      dappName
    })
    this.tokenPocketProvider = new TokenPocketProvider({
      settings: {
        ...tokenPocket.settings
      },
      dappName
    })

    this.userOptions = [
      {
        name: 'Scatter',
        logo: '../assets/scatter.svg',
        description: 'Scatter Wallet',
        themeColors: THEME_COLORS,
        onClick: () => this.handleClick(this.scatterProvider)
      },
      {
        name: 'Anchor',
        logo: '../assets/anchor.svg',
        description: 'Anchor Wallet',
        themeColors: THEME_COLORS,
        onClick: () => this.handleClick(this.anchorProvider)
      },
      {
        name: 'Token Pocket',
        logo: '../assets/token-pocket.png',
        description: 'Token Pocket Wallet',
        themeColors: THEME_COLORS,
        onClick: () => this.handleClick(this.tokenPocketProvider)
      }
    ]

    this.renderModal()
  }

  renderModal = async () => {
    const el = document.createElement('div')
    el.id = 'eos-connect'
    document.body.appendChild(el)

    ReactDOM.render(
      <Modal
        themeColors={this.themeColors}
        userOptions={this.userOptions}
        onClose={this.onClose}
        resetState={this.resetState}
        lightboxOpacity={this.lightboxOpacity}
      />,
      document.getElementById('eos-connect')
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

  updateState = async _state => {
    Object.keys(_state).forEach(key => {
      this[key] = _state[key]
    })
    await window.updateEosConnect(_state)
  }

  resetState = () => this.updateState({ ...INITIAL_STATE })

  handleClick = async _provider => {
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
