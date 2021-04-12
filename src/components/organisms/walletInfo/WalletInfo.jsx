import React from 'react'
import { Modal, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
//import { copyToClipboard } from '../../../utils/utils'

const StyledBody = styled(Modal.Body)`
  color: ${({ theme }) => theme.text1};
  font-size: 18px;
  padding-left: 0;
  padding-right: 0;
`

const StyledHeader = styled(Modal.Header)``

const StyledModalTitle = styled(Modal.Title)`
  color: ${({ theme }) => theme.text1};
`

const ContainerAccountInfo = styled.div`
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.secondary3};
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 25px;
  padding-bottom: 25px;
`

const ImageBordered = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.secondary3};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.text1} 1px 1px 9px -3px;
`

const Account = styled.span`
  margin-left: 15px;
`

const ChangeOrConnectButton = styled.button`
  width: auto;
  color: #66b8ff;
  background: #66b8ff40;
  border-radius: 3px;
  font-family: Helvetica;
  height: 25px;
  font-size: 13px;
  border: 0;
  border-radius: 5px;
  outline: none !important;
  line-height: 25px;
  font-size: 12px;
  &:hover {
    background: #66b8ff61;
  }
`

const DisconnectButton = styled(ChangeOrConnectButton)`
  margin-left: 10px;
`

const WalletInfo = ({ show, wallets, onClose, onChange, onConnect /*onDisconnect*/ }) => {
  return (
    <Modal show={show} aria-labelledby="contained-modal-wallet-info" centered onHide={onClose}>
      <StyledHeader closeButton>
        <StyledModalTitle>Accounts</StyledModalTitle>
      </StyledHeader>
      <StyledBody>
        {wallets.map(({ formattedAccount, blockchain, isConnected }) => (
          <ContainerAccountInfo key={`${blockchain}-wallet`}>
            <Row>
              <Col xs={8} className="my-auto">
                <ImageBordered src={`../assets/svg/${blockchain}.svg`} />
                <Account>{formattedAccount}</Account>
              </Col>
              <Col xs={4} className="my-auto text-right">
                {isConnected ? (
                  <React.Fragment>
                    <ChangeOrConnectButton onClick={() => onChange(blockchain)}>CHANGE</ChangeOrConnectButton>
                    {/*<DisconnectButton onClick={() => onDisconnect(blockchain)}>DISCONNECT</DisconnectButton>*/}
                  </React.Fragment>
                ) : (
                  <ChangeOrConnectButton onClick={() => onConnect(blockchain)}>CONNECT</ChangeOrConnectButton>
                )}
              </Col>
            </Row>
          </ContainerAccountInfo>
        ))}
      </StyledBody>
      <ReactTooltip />
    </Modal>
  )
}

WalletInfo.propTypes = {
  show: PropTypes.bool,
  wallets: PropTypes.array,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onDisconnect: PropTypes.func,
  onConnect: PropTypes.func
}

export default WalletInfo
