import ScatterJS from '@scatterjs/core'
import ScatterEOS from '@scatterjs/eosjs2'

export default class TokenPocketProvider {
  constructor({ dappName, settings }) {
    this.dappName = dappName
    ScatterJS.plugins(new ScatterEOS())
    this.network = ScatterJS.Network.fromJson(settings)
  }

  connect = async () => {
    try {
      this.connected = await ScatterJS.connect(this.dappName, {
        network: this.network
      })
      this.scatter = ScatterJS.scatter
      return this._login()
    } catch (_err) {
      return {
        success: false,
        message: _err.message
      }
    }
  }

  _login = async () => {
    try {
      if (!this.scatter.login) {
        return {
          success: false,
          message: 'TockenPocket Not Opened'
        }
      }

      await ScatterJS.logout()
      const isLogged = await this.scatter.login()
      const account = ScatterJS.account('eos')
      if (!account) {
        return {
          success: false,
          message: 'Error while detecting your account'
        }
      }

      if (isLogged && ScatterJS.identity) {
        return {
          account: ScatterJS.account('eos'),
          success: true,
          provider: ScatterJS.eosHook(this.network)
        }
      } else {
        return {
          success: false,
          message: 'User denied to login'
        }
      }
    } catch (_err) {
      return {
        success: false,
        message: _err.message.replace('Scatter', 'Token Pocket')
      }
    }
  }
}