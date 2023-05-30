import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col, Container } from 'react-bootstrap'
import { useSwapInfo } from '../../../hooks/use-swap-info'
import Switch from '../../atoms/switch/Switch'
import ReactTooltip from 'react-tooltip'
import { MAX_IMPACT } from '../../../constants'
import BigNumber from 'bignumber.js'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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

const SwapInfo = ({ from, to, bpm, swappersBalances, curveImpact, fees }) => {
  const { show, formattedFee, feeDescription, estimatedSwapTime, requiresCurve } = useSwapInfo({
    from,
    to,
    bpm,
    swappersBalances,
    fees,
  })
  return (
    <ContainerInfo show={Boolean(show).toString()}>
      {fees && BigNumber(fees.networkFee).isEqualTo(0) ? (
        <MarginedRow>
          <LabelCol xs={10}>Gasless</LabelCol>
          <ValueCol
            data-tip={
              'Transaction fees on the destination blockchain<br/> to deliver the asset are covered by the pNetwork protocol'
            }
            xs={2}
          >
            <Switch height={20} width={40} checked={true} disabled={true} />
          </ValueCol>
          <ReactTooltip multiline={true} place="left" />
        </MarginedRow>
      ) : null}
      <MarginedRow>
        <LabelCol xs={6}>Fee</LabelCol>
        <ValueCol data-tip={feeDescription} xs={6}>
          {' '}
          {formattedFee ? formattedFee : <Skeleton />}{' '}
        </ValueCol>
        {feeDescription ? <ReactTooltip multiline={true} place="left" /> : null}
      </MarginedRow>
      <MarginedRow>
        <LabelCol xs={7}>Estimated processing time</LabelCol>
        <ValueCol xs={5}>{estimatedSwapTime}</ValueCol>
      </MarginedRow>
      {requiresCurve && +curveImpact > MAX_IMPACT ? (
        <MarginedRow>
          <LabelCol xs={6}>High price impact</LabelCol>
          <ValueCol xs={6}>{curveImpact}%</ValueCol>
        </MarginedRow>
      ) : null}
      {requiresCurve && +curveImpact <= MAX_IMPACT ? (
        <MarginedRow>
          <LabelCol xs={6}>Price impact</LabelCol>
          <ValueCol xs={6}>{curveImpact}%</ValueCol>
        </MarginedRow>
      ) : null}
    </ContainerInfo>
  )
}

SwapInfo.propTypes = {
  bpm: PropTypes.object,
  swappersBalances: PropTypes.object,
  from: PropTypes.object,
  to: PropTypes.object,
  fees: PropTypes.object,
}

export default SwapInfo
