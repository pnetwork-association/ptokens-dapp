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
  vertical-align: top;
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
        <StyledAlert show={show} onClose={onClose} variant="warning" dismissible>
          <Paragraph>
            <WarningIcon icon="warning" />
            <br />
            pNetwork is a new technology, and security audits don't
            <br />
            eliminate risks completely. Please don't provide assets you
            <br />
            can't afford to lose.
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
