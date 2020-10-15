import ScatterJS from '@scatterjs/core'
import ScatterEOS from '@scatterjs/eosjs2'

export default class ScatterProvider {
  constructor({ dappName, settings }) {
    this.isInitialized = false
    this.dappName = dappName
    this.settings = settings
  }

  connect = async () => {
    try {
      if (!this.isInitialized) {
        ScatterJS.plugins(new ScatterEOS())
        this.network = ScatterJS.Network.fromJson(this.settings)
        this.connected = await ScatterJS.connect(this.dappName)
        this.isInitialized = true
      }

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
          message: 'Scatter Not Found'
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
        message: _err.message
      }
    }
  }
}
