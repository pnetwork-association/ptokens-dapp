import React from 'react'
import { Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from '../../molecules/modal/Modal'

const ContainerAccountInfo = styled.div`
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.lightGray};
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
  border: 1px solid ${({ theme }) => theme.lightGray};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.text1} 1px 1px 9px -3px;
`

const Account = styled.span`
  margin-left: 15px;
`

const ChangeOrConnectButton = styled.button`
  width: auto;
  color: ${({ theme }) => theme.blue};
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

const WalletInfoModal = ({ show, wallets, onClose, onChange, onConnect }) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title={'Accounts'}
      body={
        <React.Fragment>
          {wallets.map(({ formattedAccount, blockchain, isConnected }) => (
            <ContainerAccountInfo key={`${blockchain}-wallet`}>
              <Row>
                <Col xs={8} className="my-auto">
                  <ImageBordered src={`../assets/svg/${blockchain}.svg`} />
                  <Account>{formattedAccount}</Account>
                </Col>
                <Col xs={4} className="my-auto text-right">
                  {isConnected ? (
                    <ChangeOrConnectButton onClick={() => onChange(blockchain)}>CHANGE</ChangeOrConnectButton>
                  ) : (
                    <ChangeOrConnectButton onClick={() => onConnect(blockchain)}>CONNECT</ChangeOrConnectButton>
                  )}
                </Col>
              </Row>
            </ContainerAccountInfo>
          ))}
        </React.Fragment>
      }
    />
  )
}

WalletInfoModal.propTypes = {
  show: PropTypes.bool,
  wallets: PropTypes.array,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onDisconnect: PropTypes.func,
  onConnect: PropTypes.func
}

export default WalletInfoModal
