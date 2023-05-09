import LibreLink from '@libre-chain/libre-link'
import LibreLinkBrowserTransport from '@libre-chain/libre-link-browser-transport'

export default class LibreProvider {
  constructor({ dappName, settings }) {
    this.transport = new LibreLinkBrowserTransport()
    this.link = new LibreLink({
      transport: this.transport,
      chains: [
        {
          chainId: settings.chainId,
          nodeUrl: settings.endpoint,
        },
      ],
      scheme: 'libre',
      rpc: settings.endpoint,
    })
    this.dappName = dappName
  }

  connect = async () => {
    try {
      const identity = await this.link.login(this.dappName)
      if (identity) {
        const provider = this.link.makeSignatureProvider([identity.session.publicKey.toString()])
        provider._sign = provider.sign
        provider.sign = async (args) => {
          const ret = await provider._sign(args)
          return {
            serializedTransaction: ret.serializedTransaction.array,
            signatures: ret.signatures,
            compression: false,
          }
        }
        return {
          account: {
            actor: identity.session.auth.actor.toString(),
            permission: identity.session.auth.permission.toString(),
          },
          success: true,
          provider: provider,
        }
      } else {
        return {
          success: false,
          message: 'Anchor Not Found',
        }
      }
    } catch (_err) {
      return {
        success: false,
        message: 'User Canceled the request',
      }
    }
  }
}
