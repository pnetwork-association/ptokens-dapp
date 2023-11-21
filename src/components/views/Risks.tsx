

const Risks = (): JSX.Element => {
  return (
    <div className="my-6 mx-5 lg:mx-44">
      <h2 className="text-4xl font-extrabold mb-4">Risks of using pNetwork</h2>

      <p className="text-base font-semibold mb-2">
        It's important to understand the risk involved in using the pNetwork bridge, in order to let users act safely and accordingly with their risk tolerance.
      </p>

      <h3 className="text-2xl font-bold mt-8 mb-3">pTokens</h3>

      <p className="text-base font-semibold mb-2">
        pTokens are wrapped tokens that aim to maintain a 1-to-1 peg in-between the native blockchain and the host blockchain (e.g. Bitcoins wrapped to operate on the Ethereum blockchain).
      </p>

      <p className="text-base font-semibold mb-2">
        Wrapped tokens are cryptocurrencies pegged to the value of another original asset - the original asset is “wrapped” into a digital vault and a newly minted token is created to operate on a host blockchain. Because of their nature, wrapped tokens have a different trust model compared to their original underlying asset. While under normal circumstances there is a 1:1 peg between the wrapped asset and the native one, the peg may not always hold (for example in the case of a hack).
      </p>

      <p className="text-base font-semibold mb-2">
        Therefore, every pTokens presents a different trust model and risk level compared to their native underlying assets. This is due to the fact that whenever leveraging an asset within an innovative protocol which is still in its infancy (as all DeFi protocols can be considered Today, given DeFi itself started to flourish just in the last 2/3 years), additional risks are inherently added.
      </p>

      <p className="text-base font-semibold mb-2">
        While pNetwork powers cross-chain interoperability of mainstream assets and project-tokens alike, once the wrapped version is in circulation it is available to anyone and everyone. Blockchain composability makes it possible for the token to be integrated with third-party protocols (for example, centralized and decentralized exchanges, lending platforms and DeFi protocols) without pNetwork's permission or even without it being aware. pNetwork is not responsible for any third-party risk associated with the use of pTokens. Be particularly careful when interacting with any pTokens outside of the pNetwork bridge, i.e. CEXs, DEXs, and lending protocols that might accept pTokens.
      </p>

      <h3 className="text-2xl font-bold mt-8 mb-3">Admin key</h3>

      <p className="text-base font-semibold mb-2">
        The pNetwork protocol implements a progressive decentralization path. While providing a variety of other benefits, decentralisation positively impacts key management as the control over the protocol itself is distributed across a number of parties. The fact that pNetwork is reaching decentralisation in a progressive manner implies that key management is being gradually improved as well. Specifically, the already ongoing upgrade from v1 to pNetwork v2 introduces a more secure, multisig key management operated via GnosisSafe.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-3">Audits and other security measures</h3>

      <p className="text-base font-semibold mb-2">
        The pNetwork codebase is periodically audited; starting with the latest available:
      </p>

      <ul className="list-disc ml-2 pl-4 mb-2">
        <li>
          <a
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://skynet.certik.com/projects/pnt"
          >
            Certik
          </a>
        </li>
        <li>
          <a
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/cryptonicsconsulting/audits/tree/master/pToken"
          >
            Cryptonics consulting
          </a>
        </li>
      </ul>

      <p className="text-base font-semibold mb-2">
        It's important to know that security audits don't eliminate risks completely. Please don't bridge large amounts or assets you can't afford to lose.
      </p>

      <p className="text-base font-semibold mb-2">
        pNetwork has insurance coverage available on Tidal Finance for anyone interested in protecting their funds in case of issues.
      </p>

      <p className="text-base font-semibold mb-2">
        A bug bounty programme is available on the leading platform Immunefi for responsibly disclosing any potential vulnerabilities affecting the pNetwork protocol.
      </p>

      <p className="text-base font-semibold mb-2">
        Custom alerts on unusual cross-chain activity have been put in place and they automatically detect and enable prompt intervention in case of unusual activity on the cross-chain bridges.
      </p>

      <p className="text-base font-semibold mb-2">
        Regardless of all these measures and the security by-default approach put in place, there is still risk involved in using pNetwork. Please act accordingly.
      </p>
    </div>
  )
}

export default Risks