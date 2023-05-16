import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col, Container } from 'react-bootstrap'
import Switch from '../../atoms/switch/Switch'
import ReactTooltip from 'react-tooltip'
import { getFee, getFormattedFee } from '../../../utils/fee'

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
  return (
    <ContainerInfo show={true}>
      <MarginedRow>
        <LabelCol xs={10}>Gasless</LabelCol>
        <ValueCol
          data-tip={
            'Transaction fees on the destination blockchain<br/> to deliver the asset are covered by the pNetwork protocol'
          }
          xs={2}
        >
          <Switch height={20} width={40} checked={true} disabled="true" />
        </ValueCol>
        <ReactTooltip multiline={true} place="left" />
      </MarginedRow>
      <MarginedRow>
        <LabelCol xs={8}>Fee</LabelCol>
        <ValueCol xs={4}>{getFormattedFee(getFee(from, to))}</ValueCol>
      </MarginedRow>
    </ContainerInfo>
  )
}

MigrationInfo.propTypes = {
  from: PropTypes.object,
  to: PropTypes.object,
}

export default MigrationInfo
