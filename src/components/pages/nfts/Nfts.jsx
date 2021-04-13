import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Container, Col } from 'react-bootstrap'
import NftCard from '../../organisms/nftCard/NftCard'
import { useWallets } from '../../../hooks/use-wallets'

const OuterContainerTitle = styled(Row)`
  margin-top: 20px;
  margin-bottom: 40px;
`
const ContainerTitle = styled(Col)`
  text-align: center;
  color: #475965;
  font-size: 32px;
`

const ContainerConnectButton = styled.div`
  width: 750px;
  height: 70px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
`

const ContainerConnectText = styled.div`
  font-size: 34px;
  color: ${({ theme }) => theme.text2};
`

const Nfts = ({ nfts, wallets, move }) => {
  const { isConnected } = useWallets(wallets)

  return isConnected ? (
    <React.Fragment>
      <Container>
        {nfts.length > 0 ? (
          <React.Fragment>
            <OuterContainerTitle>
              <ContainerTitle>Your supported NFTs ...</ContainerTitle>
            </OuterContainerTitle>
            <Row>
              {nfts.map(_nft => (
                <Col key={_nft.id} xs={12} md={6} lg={4} xl={3}>
                  <NftCard nft={_nft} move={move} />
                </Col>
              ))}
            </Row>
          </React.Fragment>
        ) : null}
      </Container>
    </React.Fragment>
  ) : (
    <ContainerConnectButton>
      <ContainerConnectText>Connect your wallet to see your NFTs ...</ContainerConnectText>{' '}
    </ContainerConnectButton>
  )
}

Nfts.propTypes = {
  nfts: PropTypes.array.isRequired,
  wallets: PropTypes.object.isRequired,
  move: PropTypes.func.isRequired
}

export default Nfts
