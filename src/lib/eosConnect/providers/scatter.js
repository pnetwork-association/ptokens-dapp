import ScatterWalletProvider from 'eos-transit-scatter-provider'

export default class ScatterProvider {
  constructor({ dappName, settings }) {
    this.dappName = dappName
    this.provider = ScatterWalletProvider()(settings)
  }

  connect = async () => {
    try {
      this.connected = await this.provider.connect(this.dappName)
      return this._login()
    } catch (_err) {
      return {
        success: false,
        message: _err.message ? _err.message : _err
      }
    }
  }

  _login = async () => {
    try {
      if (!this.provider.login) {
        return {
          success: false,
          message: 'Scatter Not Opened'
        }
      }

      await this.provider.logout()
      const account = await this.provider.login()
      if (account) {
        return {
          account: {
            actor: account.accountName,
            permission: account.permission
          },
          success: true,
          provider: this.provider.signatureProvider
        }
      } else {
        return {
          success: false,
          message: 'Error while detecting your Scatter account'
        }
      }
    } catch (_err) {
      return {
        success: false,
        message: _err.message ? _err.message : _err
      }
    }
  }
}
