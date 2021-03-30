import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  border: 1px solid rgba(0, 0, 0, 0.1) solid;
  background: white;
  height: 100%;
`

const StyledCardHeader = styled(Card.Header)`
  background: white;
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const StyledCardBody = styled(Card.Body)`
  padding: 10px;
`

const Image = styled.img`
  width: 100%;
  heigth: 70px;
`

const Name = styled.label`
  color: #475965ab;
  font-size: 13px;
`

const Id = styled.label`
  color: #475965;
`

const Blockchain = styled.img`
  position: relative;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  border: 1px solid rgba(71, 89, 101, 0.3);
  cursor: pointer;
  box-shadow: #475965 1px 1px 9px -3px;
`

const ContainerBlockchain = styled(Col)`
  text-align: right !important;
  margin-bottom: 0 auto !important;
`

const SwapButton = styled.button`
  width: 100%;
  color: #66b8ff;
  background: #66b8ff40;
  border-radius: 3px;
  font-family: Helvetica;
  height: 25px;
  font-size: 13px;
  border: 0;
  border-radius: 5px;
  outline: none !important;
  line-height: 25px;
  font-size: 12px;
  &:hover {
    background: #66b8ff61;
  }
`

const ContainerButtonAndBlockchain = styled(Row)`
  margin-top: 15px;
`

const NftCard = ({}) => {
  return (
    <StyledCard>
      <StyledCardHeader>
        <Image />
      </StyledCardHeader>
      <StyledCardBody>
        <Row>
          <Col xs={12}>
            <Name>BASTARD GAN PUNKS V2</Name>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Id>BASTARD GAN PUNKS V2 #7123</Id>
          </Col>
        </Row>
        <ContainerButtonAndBlockchain>
          <Col xs={4}>
            <SwapButton>MOVE</SwapButton>
          </Col>
          <ContainerBlockchain xs={8}>
            <Blockchain src="../assets/svg/ETH.svg" />
          </ContainerBlockchain>
        </ContainerButtonAndBlockchain>
      </StyledCardBody>
    </StyledCard>
  )
}

export default NftCard
