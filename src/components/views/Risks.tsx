const Risks = (): JSX.Element => {
  return (
    <div className="my-6 mx-5 lg:mx-44 pb-24">
      <h2 className="text-4xl font-extrabold mb-4">Risks of using pNetwork v3 BETA</h2>

      <p className="text-base font-semibold mb-2">
        pNetwork v3 is now available in its BETA version, designed primarily for testing by experienced users. We advise against transferring large sums of money or valuable assets as the code base has not yet been audited. Users should be fully aware of the risks associated with using this BETA version and manage their actions according to their risk tolerance.
      </p>

      <p className="text-base font-semibold mb-2">
        Please note: This dApp only works with the BETA version of pNetwork v3.
      </p>

      <p className="text-base font-semibold mb-2">
        Visit the official 
        <a
          className="text-blue-500 underline mx-1"
          target="_blank"
          rel="noopener noreferrer"
          href="https://dapp.ptokens.io"
        >
          pNetwork v2 dApp
        </a>
        for bridging tokens with the already audited pNetwork bridge.
      </p>

      <h3 className="text-2xl font-bold mt-8 mb-3">pTokens</h3>

      <p className="text-base font-semibold mb-2">
        pTokens are wrapped tokens that aim to maintain a 1-to-1 peg in-between the native blockchain and the host blockchain (e.g. Bitcoins wrapped to operate on the Ethereum blockchain).  
      </p>

      <p className="text-base font-semibold mb-2">
        Wrapped tokens are cryptocurrencies pegged to the value of another original asset - the original asset is “wrapped” into a digital vault and a newly minted token is created to operate on a host blockchain. Because of their nature, wrapped tokens have a different trust model compared to their original underlying asset. While under normal circumstances there is a 1:1 peg between the wrapped asset and the native one, the peg may not always hold (for example in the case of a hack).  
      </p>

      <p className="text-base font-semibold mb-2">
        Therefore, every pTokens presents a different trust model and risk level compared to their native underlying assets. This is due to the fact that whenever leveraging an asset within an innovative protocol which is still in its infancy (as all DeFi protocols can be considered Today, given DeFi itself started to flourish just in the last 3/4 years), additional risks are inherently added.
      </p>

      <p className="text-base font-semibold mb-2">
        While pNetwork powers cross-chain interoperability of mainstream assets and project-tokens alike, once the wrapped version is in circulation it is available to anyone and everyone. Blockchain composability makes it possible for the token to be integrated with third-party protocols (for example, centralized and decentralized exchanges, lending platforms and DeFi protocols) without pNetwork's permission or even without it being aware. pNetwork is not responsible for any third-party risk associated with the use of pTokens. Be particularly careful when interacting with any pTokens outside of the pNetwork bridge, i.e. CEXs, DEXs, and lending protocols that might accept pTokens.
      </p>

      <h3 className="text-2xl font-bold mt-8 mb-3">Admin key & centralization points</h3>

      <p className="text-base font-semibold mb-2">
        The pNetwork v3 protocol aims to be completely decentralized at its core and in all its branches. pNetwork v3 will remove all aspects of centralisation, while retaining all the principles that characterise pNetwork. Its architecture is completely decentralised from its new design, and new actors (Relayers, Sentinels, Guardians, and the DAO) have been introduced to avoid any centralized entity requirement.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-3">Audits and other security measures</h3>

      <p className="text-base font-semibold mb-2">
        The pNetwork v3 codebase has NOT been audited yet. This release is in BETA and therefore we advise against bridging large amounts or assets you can't afford to lose.
      </p>

      <p className="text-base font-semibold mb-2">
        Currently, the pNetwork v3 BETA isn’t supported by any insurance coverage and no bug bounty programmes are available.
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