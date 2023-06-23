import React from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const Section = styled.div`
  font-size: 28px;
  margin-top: 40px;
  color: ${({ theme }) => theme.text3};
  @media (max-width: 1049.98px) {
    padding-left: 20px;
  }
  @media (max-width: 919.98px) {
    padding-left: 0px;
  }
`

const Paragraph = styled.div`
  font-size: 18px;
  margin-top: 15px;
  color: ${({ theme }) => theme.text1};
  @media (max-width: 1049.98px) {
    padding-left: 20px;
  }
  @media (max-width: 919.98px) {
    padding-left: 0px;
  }
`

const PaddedParagraph = styled.div`
  font-size: 18px;
  margin-top: 15px;
  padding-bottom: 200px;
  color: ${({ theme }) => theme.text1};
  @media (max-width: 1049.98px) {
    padding-left: 20px;
  }
  @media (max-width: 919.98px) {
    padding-left: 0px;
  }
`

const Title = styled.div`
  font-size: 38px;
  margin-top: 15px;
  color: ${({ theme }) => theme.text2};
  @media (max-width: 1049.98px) {
    padding-left: 20px;
  }
  @media (max-width: 919.98px) {
    padding-left: 0px;
  }
`

const Risks = () => {
  return (
    <Container>
      <Title>Risks of using pNetwork</Title>
      <Paragraph>
        It's important to understand the risk involved in using the pNetwork bridge, in order to let users act safely
        and accordingly with their risk tolerance.
      </Paragraph>
      <Section>pTokens</Section>
      <Paragraph>
        pTokens are wrapped tokens that aim to maintain a 1-to-1 peg in-between the native blockchain and the host
        blockchain (e.g. Bitcoins wrapped to operate on the Ethereum blockchain).
      </Paragraph>
      <Paragraph>
        Wrapped tokens are cryptocurrencies pegged to the value of another original asset - the original asset is
        “wrapped” into a digital vault and a newly minted token is created to operate on a host blockchain. Because of
        their nature, wrapped tokens have a different trust model compared to their original underlying asset. While
        under normal circumstances there is a 1:1 peg between the wrapped asset and the native one, the peg may not
        always hold (for example in the case of a hack).
      </Paragraph>
      <Paragraph>
        Therefore, every pTokens presents a different trust model and risk level compared to their native underlying
        assets. This is due to the fact that whenever leveraging an asset within an innovative protocol which is still
        in its infancy (as all DeFi protocols can be considered Today, given DeFi itself started to flourish just in the
        last 2/3 years), additional risks are inherently added.
      </Paragraph>
      <Paragraph>
        While pNetwork powers cross-chain interoperability of mainstream assets and project-tokens alike, once the
        wrapped version is in circulation it is available to anyone and everyone. Blockchain composability makes it
        possible for the token to be integrated with third-party protocols (for example, centralized and decentralized
        exchanges, lending platforms and DeFi protocols) without pNetwork's permission or even without it being aware.
        pNetwork is not responsible for any third-party risk associated with the use of pTokens. Be particularly careful
        when interacting with any pTokens outside of the pNetwork bridge, i.e. CEXs, DEXs, and lending protocols that
        might accept pTokens.
      </Paragraph>
      <Section>Admin key</Section>
      <Paragraph>
        The pNetwork protocol implements a progressive decentralization path. While providing a variety of other
        benefits, decentralisation positively impacts key management as the control over the protocol itself is
        distributed across a number of parties. The fact that pNetwork is reaching decentralisation in a progressive
        manner implies that key management is being gradually improved as well. Specifically, the already ongoing
        upgrade from v1 to pNetwork v2 introduces a more secure, multisig key management operated via GnosisSafe.
      </Paragraph>
      <Section>Audits and other security measures</Section>
      <Paragraph>
        The pNetwork codebase is periodically audited; starting with the latest available:
        <ul>
          <li>
            {' '}
            <a target="_blank" rel="noopener noreferrer" href="https://skynet.certik.com/projects/pnt">
              Certik
            </a>
          </li>
          <li>
            {' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/cryptonicsconsulting/audits/tree/master/pToken"
            >
              Cryptonics consulting
            </a>
          </li>
        </ul>
      </Paragraph>
      <Paragraph>
        It's important to know that security audits don't eliminate risks completely. Please don't bridge large amounts
        or assets you can't afford to lose.
      </Paragraph>
      <Paragraph>
        pNetwork has insurance coverage available on Tidal Finance for anyone interested in protecting their funds in
        case of issues.
      </Paragraph>
      <Paragraph>
        A bug bounty programme is available on the leading platform Immunefi for responsibly disclosing any potential
        vulnerabilities affecting the pNetwork protocol.
      </Paragraph>
      <Paragraph>
        Custom alerts on unusual cross-chain activity have been put in place and they automatically detect and enable
        prompt intervention in case of unusual activity on the cross-chain bridges.
      </Paragraph>
      <PaddedParagraph>
        Regardless of all these measures and the security by-default approach put in place, there is still risk involved
        in using pNetwork. Please act accordingly.
      </PaddedParagraph>
    </Container>
  )
}

export default Risks
