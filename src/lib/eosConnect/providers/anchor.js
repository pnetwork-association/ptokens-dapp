import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'

export default class AnchorProvider {
  constructor({ dappName, settings }) {
    this.transport = new AnchorLinkBrowserTransport()
    this.link = new AnchorLink({
      transport: this.transport,
      chainId: settings.chainId
    })
    this.dappName = dappName
  }

  connect = async () => {
    try {
      const res = await this.link.login(this.dappName)
      if (res) {
        const { signerKey, account } = res
        return {
          account: {
            name: account.account_name
          },
          success: true,
          provider: this.link.makeSignatureProvider([signerKey])
        }
      } else {
        return {
          success: false,
          message: 'Anchor Not Found'
        }
      }
    } catch (_err) {
      return {
        success: false,
        message: 'User Canceled the request'
      }
    }
  }
}
