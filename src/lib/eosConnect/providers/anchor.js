import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'

export default class AnchorProvider {
  constructor({ dappName }) {
    this.transport = new AnchorLinkBrowserTransport()
    this.link = new AnchorLink({ transport: this.transport })
    this.dappName = dappName
  }

  connect = async () => {
    try {
      const provider = await this.link.login(this.dappName)
      if (provider) {
        return {
          account: {
            name: provider.account.account_name
          },
          success: true,
          provider
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
