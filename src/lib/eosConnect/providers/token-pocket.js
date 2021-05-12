import TokenPocketWalletProvider from 'eos-transit-tokenpocket-provider'

export default class TokenPocketProvider {
  constructor({ dappName, settings }) {
    this.dappName = dappName
    this.provider = TokenPocketWalletProvider()(settings)
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
          message: 'Tocken Pocket Not Opened'
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
          message: 'Error while detecting your Token Pocket account'
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
