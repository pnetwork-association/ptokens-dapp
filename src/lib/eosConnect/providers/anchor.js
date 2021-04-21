import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'

export default class AnchorProvider {
  constructor({ dappName, settings }) {
    this.transport = new AnchorLinkBrowserTransport()
    this.link = new AnchorLink({
      transport: this.transport,
      chainId: settings.chainId,
      rpc: settings.endpoint
    })
    this.dappName = dappName
  }

  connect = async () => {
    try {
      const res = await this.link.login(this.dappName)
      if (res) {
        const { signerKey, signer } = res
        return {
          account: {
            actor: signer.actor,
            permission: signer.permission
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
