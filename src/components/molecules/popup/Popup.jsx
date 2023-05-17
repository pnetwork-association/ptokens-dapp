import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { bounceInUp } from 'react-animations'
import { Card } from 'react-bootstrap'
import Icon from '../../atoms/icon/Icon'

const StyledCard = styled(Card)`
  position: fixed;
  right: 30px;
  bottom: 50px;
  border: 0;
  border: 1px solid ${({ theme }) => (theme.type === 'ligth' ? '#f1f2f3' : theme.lightGray)};
  box-shadow: 0 0 15px rgb(0 0 0 / 5%);
  z-index: 1010;
  animation: 1s ${keyframes`${bounceInUp}`};
  background: ${({ theme }) => theme.secondary3};
  display: ${({ display }) => display};
  @media (max-width: 767.98px) {
    width: 50%;
    right: 5px;
    bottom: 10px;
  }
`

const StyledHeader = styled(Card.Header)`
  background: white;
  border: 0;
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  padding-bottom: 0px;
  background: transparent;
`

const StyledBody = styled(Card.Body)`
  color: ${({ theme }) => theme.text1};
  font-weight: 300 !important;
`

const CloseIcon = styled(Icon)`
  width: 10px;
  height: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.text1};
`

const Popup = ({ content }) => {
  const [display, setDisplay] = useState('block')
  return (
    <StyledCard display={display}>
      <StyledHeader>
        <CloseIcon icon="close" onClick={() => setDisplay('none')} />
      </StyledHeader>
      <StyledBody>{content}</StyledBody>
    </StyledCard>
  )
}

Popup.propTypes = {
  content: PropTypes.node,
}

export default Popup
