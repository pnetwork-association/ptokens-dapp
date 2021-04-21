import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col, Container } from 'react-bootstrap'
import { useSwapInfo } from '../../../hooks/use-swap'

const ContainerInfo = styled(Container)`
  background: ${({ theme }) => theme.secondary3Transparentized};
  padding-top: 50px;
  padding-bottom: 20px;
  margin-top: -20px;
  max-width: 450px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: rgb(86, 90, 105);
  box-shadow: 0 0px 3px 0 rgb(0 0 0 / 20%);
  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
  @media (max-width: 767.98px) {
    width: 93%;
    font-size: 13px;
    margin-top: -30px;
    margin-bottom: 100px !important;
  }
`
const MarginedRow = styled(Row)`
  margin-top: 5px;
`

const ValueCol = styled(Col)`
  text-align: right;
  font-weight: 500;
  color: ${({ theme }) => theme.text1};
  @media (max-width: 767.98px) {
    font-size: 12px;
  }
`

const LabelCol = styled(Col)`
  text-align: left;
  font-weight: 300;
  color: ${({ theme }) => theme.text1};
  @media (max-width: 767.98px) {
    font-size: 12px;
  }
`

const SwapInfo = ({ from, to }) => {
  const { show, formattedFee, estimatedSwapTime } = useSwapInfo(from, to)
  return (
    <ContainerInfo show={Boolean(show).toString()}>
      <Row>
        <LabelCol xs={8}>Fee</LabelCol>
        <ValueCol xs={4}>{formattedFee}</ValueCol>
      </Row>
      <MarginedRow>
        <LabelCol xs={8}>Estimated processing time</LabelCol>
        <ValueCol xs={4}>{estimatedSwapTime}</ValueCol>
      </MarginedRow>
    </ContainerInfo>
  )
}

SwapInfo.propTypes = {
  from: PropTypes.object,
  to: PropTypes.object
}

export default SwapInfo
