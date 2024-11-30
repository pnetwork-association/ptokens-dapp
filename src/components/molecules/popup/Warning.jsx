import PropTypes from 'prop-types'
import React from 'react'
import { Alert, Row } from 'react-bootstrap'
import styled from 'styled-components'

import Icon from '../../atoms/icon/Icon'
import { OuterContainerSwap } from '../../pages/swap/Swap'

const StyledAlert = styled(Alert)`
  // background: ${({ theme }) => theme.bg1};
  font-size: 16px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0.5rem;
`

const WarningIcon = styled(Icon)`
  height: 20px;
  width: 20px;
  margin: 5px;
  vertical-align: mid;
  color: #475965;
`

const Paragraph = styled.div`
  text-align: center;
  margin: 0rem;
  margin-left: 25px;
`

const WarningPopup = ({ show, onClose }) => {
  return (
    <Row>
      <OuterContainerSwap className="mx-auto">
        <StyledAlert show={show} onClose={onClose} variant="warning">
          <Paragraph>
            <WarningIcon icon="warning" />
            PNETWORK V2 HAS REACHED END OF LIFE
            <WarningIcon icon="warning" />
            <br />
            If you want to redeem pTokens proceed at your own risk.
            <br />
            Please be aware that the pegout tx burns the amount
            <br />
            of pTokens selected. Please be patient as completion times
            <br />
            for redeems are uncertain and may take several days.
          </Paragraph>
        </StyledAlert>
      </OuterContainerSwap>
    </Row>
  )
}

WarningPopup.propTypes = {
  content: PropTypes.node,
}

export default WarningPopup
