import { Wombat } from 'wombat-ual'

export default class WombatProvider {
  constructor({ dappName, settings }, tt) {
    const exampleNet = {
      chainId: settings.chainId,
      rpcEndpoints: [
        {
          protocol: settings.protocol,
          host: settings.host,
          port: settings.port,
        },
      ],
    }
    this.dappName = dappName
    const wombat = new Wombat([exampleNet], { appName: 'Example App' })
    this.provider = wombat
  }

  connect = async () => {
    try {
      this.connected = await this.provider.connect(this.dappName)
      return this._login()
    } catch (_err) {
      return {
        success: false,
        message: _err.message ? _err.message : _err,
      }
    }
  }

  _login = async () => {
    try {
      if (!this.provider.login) {
        return {
          success: false,
          message: 'Scatter Not Opened',
        }
      }

      await this.provider.logout()
      const account = await this.provider.login()
      if (account) {
        return {
          account: {
            actor: account.accountName,
            permission: account.permission,
          },
          success: true,
          provider: this.provider.signatureProvider,
        }
      } else {
        return {
          success: false,
          message: 'Error while detecting your Scatter account',
        }
      }
    } catch (_err) {
      return {
        success: false,
        message: _err.message ? _err.message : _err,
      }
    }
  }
}
