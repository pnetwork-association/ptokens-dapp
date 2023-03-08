import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Container, Col } from 'react-bootstrap'
import NftCard from '../../organisms/nftCard/NftCard'
import SupportedNfstCarousel from '../../organisms/supportedNftsCarousel/SupportedNftsCarousel'
import { useWallets } from '../../../hooks/use-wallets'

const ContainerNftCard = styled(Col)`
  margin-top: 100px;
`

const ContainerCenter = styled.div`
  width: 750px;
  height: 0;
  position: absolute;
  top: 300px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
  @media (max-width: 767.98px) {
    width: 100%;
  }
`

const ContainerCenterText = styled.div`
  font-size: 34px;
  color: ${({ theme }) => theme.text2};
`

const ContainerSupportedNftsText = styled.div`
  font-size: 14px;
  margin-top: 15px;
  color: ${({ theme }) => theme.text2};
  text-align: center;
`

const Nfts = ({ nfts, wallets, move, loading: { isLoading } }) => {
  const { isConnected } = useWallets(wallets)

  return (
    <Container>
      <SupportedNfstCarousel />
      <ContainerSupportedNftsText>
        (The cross-chain NFT Portal currently supports the following NFTs)
      </ContainerSupportedNftsText>
      {isConnected ? (
        nfts.length > 0 ? (
          <Row>
            {nfts.map(_nft => (
              <ContainerNftCard key={_nft.id} xs={12} md={6} lg={4} xl={3}>
                <NftCard nft={_nft} move={move} />
              </ContainerNftCard>
            ))}
          </Row>
        ) : !isLoading ? (
          <ContainerCenter>
            <ContainerCenterText>It seems you don't own any NFTs supported by pNetwork ...</ContainerCenterText>{' '}
          </ContainerCenter>
        ) : null
      ) : (
        <ContainerCenter>
          <ContainerCenterText>Connect your wallet to see your NFTs ...</ContainerCenterText>{' '}
        </ContainerCenter>
      )}
    </Container>
  )
}

Nfts.propTypes = {
  nfts: PropTypes.array.isRequired,
  wallets: PropTypes.object.isRequired,
  move: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired
}

export default Nfts
