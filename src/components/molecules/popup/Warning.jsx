import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Alert } from 'react-bootstrap'
import Icon from '../../atoms/icon/Icon'

const StyledAlert = styled(Alert)`
  // background: ${({ theme }) => theme.bg1};
  font-size: 16px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0.5rem;
`

const WarningIcon = styled(Icon)`
  padding-left: 0px;
  padding-bottom: 2px;
  padding-right: 5px;
  vertical-align: top;
  color: #475965;
`

const Paragraph = styled.div`
  margin: 0rem;
  margin-left: 2px;
`

const WarningPopup = ({ show, onClose }) => {
  return (
    <StyledAlert show={show} onClose={onClose} variant="warning" dismissible>
      <Paragraph>
        <WarningIcon icon="warning" />
        pNetwork is a new technology, and security audits don't eliminate risks completely. Please don't provide assets
        you can't afford to lose.
      </Paragraph>
    </StyledAlert>
  )
}

WarningPopup.propTypes = {
  content: PropTypes.node
}

export default WarningPopup
