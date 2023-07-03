import PropTypes from 'prop-types'
import React from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'

const StyledModalTitle = styled(Modal.Title)`
  color: ${({ theme }: { theme: ITheme }) => theme.text1};
  @media (max-width: 767.98px) {
    font-size: 20px;
  }
`
const StyledBody = styled(Modal.Body)`
  color: ${({ theme }: { theme: ITheme }) => theme.text1};
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: ${({ theme }: { theme: ITheme }) => theme.bg1};
`

const StyledHeader = styled(Modal.Header)`
  background: ${({ theme }: { theme: ITheme }) => theme.bg1};
  border-bottom: 1px solid ${({ theme }: { theme: ITheme }) => theme.lightGray};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  span {
    color: ${({ theme }: { theme: ITheme }) => theme.text1};
  }
`

const StyledFooter = styled(Modal.Footer)`
  background: ${({ theme }: { theme: ITheme }) => theme.bg1};
  border-top: 1px solid ${({ theme }: { theme: ITheme }) => theme.lightGray};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  span {
    color: ${({ theme }: { theme: ITheme }) => theme.text1};
  }
`

const Button = styled.button`
  color: white;
  background: ${({ theme }: { theme: ITheme }) => theme.primary1};
  border: 0;
  border-radius: 20px;
  height: 40px;
  font-size: 20px;
  padding-left: 20px;
  padding-right: 20px;
  outline: none !important;
  box-shadow: none;
  &:disabled {
    background: ${({ theme }: { theme: ITheme }) => theme.primary1Transparentized};
    &:hover {
      background: ${({ theme }: { theme: ITheme }) => theme.primary1Transparentized};
    }
  }
  &:hover {
    background: ${({ theme }: { theme: ITheme }) => theme.primary1Hovered};
  }
  @media (max-width: 767.98px) {
    height: 60px;
    font-size: 20px;
  }
`

const TermsOfService = ({ show, onClose, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      dialogClassName="modal-tos"
      centered
      keyboard={false}
      backdrop="static"
    >
      <StyledHeader closeButton>
        <StyledModalTitle>{'Security Disclaimer'}</StyledModalTitle>
      </StyledHeader>
      <StyledBody>
        The pNetwork bridge is a new and complex technology. While it has undergone security audits, that does not
        eliminate risks completely. Please don't bridge large amounts or assets you can't afford to lose.
        <br />
        <br />
        By proceeding, you understand the risks and are responsible for any lost funds.
      </StyledBody>
      <StyledFooter>
        <Button variant="primary" onClick={onClose}>
          Accept Terms
        </Button>
      </StyledFooter>
    </Modal>
  )
}

TermsOfService.propTypes = {
  content: PropTypes.node,
}

export default TermsOfService
