import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col, Container } from 'react-bootstrap'
import { useSwapInfo } from '../../../hooks/use-swap-info'
import Switch from '../../atoms/switch/Switch'
import Icon from '../../atoms/icon/Icon'
import ReactTooltip from 'react-tooltip'
import { MAX_IMPACT } from '../../../constants'
import BigNumber from 'bignumber.js'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getNetworkFeeDescription, getProtocolFeeDescription } from '../../../utils/fee'

const ContainerInfo = styled(Container)`
  background: ${({ theme }) => theme.secondary3Transparentized};
  padding-top: 35px;
  padding-bottom: 15px;
  position: relative;
  top: -20px;
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
    top: -25px;
    margin-bottom: 100px !important;
  }
  z-index: 0;
`
const MarginedRow = styled(Row)`
  margin-top: 5px;
  flex-wrap: nowrap;
`

const ValueCol = styled(Col)`
  text-align: right;
  font-weight: 500;
  color: ${({ theme }) => theme.text1};
  @media (max-width: 767.98px) {
    font-size: 12px;
  }
`

const FeeValueCol = styled(ValueCol)`
  @media (max-width: 767.98px) {
    font-size: 11px;
  }
`

const FeesDescriptionCol = styled(Col)`
  text-align: right;
  padding-right: 0px;
  padding-left: 0px;
  font-weight: 500;
  color: ${({ theme }) => theme.text1};
  @media (max-width: 767.98px) {
    font-size: 12px;
  }
`

const ArrowCol = styled(Col)`
  padding-right: 0px;
  padding-left: 0px;
  max-width: 30px;
  color: ${({ theme }) => theme.text2};
  font-size: 12px;
  cursor: pointer;
  text-align: right;
`

const LabelCol = styled(Col)`
  text-align: left;
  font-weight: 300;
  color: ${({ theme }) => theme.text1};
  @media (max-width: 767.98px) {
    font-size: 11px;
  }
`

const FeeDescLabelCol = styled(Col)`
  padding-left: 30px;
  text-align: left;
  font-weight: 300;
  color: ${({ theme }) => theme.text1};
  @media (max-width: 767.98px) {
    padding-left: 20px;
    font-size: 11px;
  }
`

const Arrow = styled(Icon)`
  position: relative;
  width: 30%;
  margin-right: 15px;
  cursor: pointer;
  svg {
    fill: ${({ theme }) => theme.text3};
  }
`

const Info = styled(Icon)`
  vertical-align: low;
  position: relative;
  width: 22px;
  svg {
    fill: ${({ theme }) => theme.text1};
  }

  @media (max-width: 767.98px) {
    width: 15px;
  }
`

const FeeRow = ({ label, value, datatip }) => (
  <MarginedRow>
    <React.Fragment>
      <FeeDescLabelCol data-tip={datatip} data-for="tooltip-fees" xs={5}>
        <span>{label}</span>&nbsp;
        <Info icon="info" />
      </FeeDescLabelCol>
      <FeeValueCol xs={7}>{value ? value : <Skeleton />}</FeeValueCol>
    </React.Fragment>
  </MarginedRow>
)

const SwapInfo = ({ from, to, amount, bpm, swappersBalances, curveImpact, fees, onPnetworkV2 }) => {
  const [showInfo, setShowInfo] = useState(false)
  const { show, formattedFee, estimatedSwapTime, requiresCurve } = useSwapInfo({
    from,
    to,
    amount,
    bpm,
    swappersBalances,
    fees,
    onPnetworkV2,
  })

  useEffect(() => {
    ReactTooltip.rebuild()
  })

  return show ? (
    <ContainerInfo show={Boolean(show).toString()}>
      {fees && BigNumber(fees.networkFee).isEqualTo(0) ? (
        <MarginedRow>
          <LabelCol xs={10}>Gasless</LabelCol>
          <ValueCol
            data-tip={
              'Transaction fees on the destination blockchain<br/> to deliver the asset are covered by the pNetwork protocol'
            }
            data-for="tooltip-gasless"
            xs={2}
          >
            <Switch height={20} width={40} checked={true} disabled={true} />
          </ValueCol>
          <ReactTooltip multiline={true} place="left" />
        </MarginedRow>
      ) : null}
      <MarginedRow style={{ alignItems: 'center' }}>
        <LabelCol style={{ maxWidth: '15%' }}>Fees</LabelCol>
        <FeesDescriptionCol>{formattedFee ? formattedFee : <Skeleton />}</FeesDescriptionCol>
        <ArrowCol onClick={() => setShowInfo(!showInfo)}>
          <Arrow icon={showInfo ? 'arrow-up' : 'arrow-down'} />
        </ArrowCol>
      </MarginedRow>
      {showInfo ? (
        <React.Fragment>
          <FeeRow
            label="Protocol Fee"
            value={getProtocolFeeDescription(fees, amount, to.symbol)}
            datatip='"Protocol Fee" is designed to reward the pNetwork nodes for operating and securing the pNetwork bridges.<br/>These fees are fully distributed to the pNetwork node operators.'
          />
          {fees && fees.networkFee > 0 ? (
            <FeeRow
              label="Network Fee"
              value={getNetworkFeeDescription(fees, to.symbol)}
              datatip='"Network Fee" covers the computing resources required to execute transactions on the chain (also known as Gas Fee).
'
            />
          ) : null}
        </React.Fragment>
      ) : null}
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
  ) : null
}

SwapInfo.propTypes = {
  bpm: PropTypes.object,
  swappersBalances: PropTypes.object,
  from: PropTypes.object,
  to: PropTypes.object,
  amount: PropTypes.string,
  fees: PropTypes.object,
  onPnetworkV2: PropTypes.bool,
}

export default SwapInfo
