import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import { useSwapInfo } from '../../../hooks/use-swap-info'
import { getFormattedNetworkFee, getFormattedProtocolFee } from '../../../utils/fee'
import Icon from '../../atoms/icon/Icon'

import 'react-loading-skeleton/dist/skeleton.css'

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

const SwapInfo = ({ from, to, amount, fees, bpm }) => {
  const [showInfo, setShowInfo] = useState(false)
  const { show, formattedFee, estimatedSwapTime } = useSwapInfo({
    from,
    to,
    amount,
    fees,
    bpm,
  })

  useEffect(() => {
    ReactTooltip.rebuild()
  })

  return (
    <ContainerInfo show={Boolean(show).toString()}>
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
            value={getFormattedProtocolFee(fees, amount, to.symbol)}
            datatip='"Protocol Fee" is designed to reward the pNetwork nodes for operating and securing the pNetwork bridges.<br/>These fees are fully distributed to the pNetwork node operators.'
          />
          {fees && fees.networkFee > 0 ? (
            <FeeRow
              label="Network Fee"
              value={getFormattedNetworkFee(fees, to.symbol)}
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
    </ContainerInfo>
  )
}

SwapInfo.propTypes = {
  from: PropTypes.object,
  to: PropTypes.object,
  amount: PropTypes.string,
  fees: PropTypes.object,
  bpm: PropTypes.object,
}

export default SwapInfo
