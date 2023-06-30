import PropTypes from 'prop-types'
import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import styled from 'styled-components'

import { getMigrationFees } from '../../../utils/fee'

const ContainerInfo = styled(Container)`
  background: ${({ theme }) => theme.secondary3Transparentized};
  padding-top: 35px;
  padding-bottom: 15px;
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

const MigrationInfo = ({ from, to }) => {
  const fees = getMigrationFees(from, to)
  return (
    <ContainerInfo show="true">
      <MarginedRow>
        <LabelCol xs={8}>Fee</LabelCol>
        <ValueCol xs={4}>{`${fees}%`}</ValueCol>
      </MarginedRow>
    </ContainerInfo>
  )
}

MigrationInfo.propTypes = {
  from: PropTypes.object,
  to: PropTypes.object,
}

export default MigrationInfo
