import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Modal from './Modal'

const INITIAL_STATE = { show: false }

const THEME_COLORS = {
  background: 'rgb(255, 255, 255)',
  main: 'rgb(12, 12, 13)',
  secondary: 'rgb(169, 169, 188)',
  border: 'rgba(195, 195, 195, 0.14)',
  hover: 'rgba(195, 195, 195, 0.14)'
}

class EosConnectCore {
  show = false
  lightboxOpacity = 0.4
  userOptions = [
    {
      name: 'Scatter',
      logo: '../assets/scatter.svg',
      description: 'Scatter Wallet',
      themeColors: THEME_COLORS,
      onClick: () => console.log('scatter')
    },
    {
      name: 'Anchor',
      logo: '../assets/anchor.svg',
      description: 'Anchor Wallet',
      themeColors: THEME_COLORS,
      onClick: () => console.log('anchor')
    }
  ]
  themeColors = THEME_COLORS

  constructor() {
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
}

export default EosConnectCore
