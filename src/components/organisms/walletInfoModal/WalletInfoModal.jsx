import React from 'react'
import { Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from '../../molecules/modal/Modal'
import ReactTooltip from 'react-tooltip'

const ContainerAccountInfo = styled.div`
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.lightGray};
  margin: 20px 15px 20px 15px;
  padding: 25px 20px 25px 20px;
  @media (max-width: 767.98px) {
    margin: 15px 10px 15px 10px;
    padding: 15px 10px 15px 10px;
  }
`

const BlockchainImage = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.lightGray};
  box-shadow: ${({ theme }) => theme.text1} 1px 1px 9px -3px;
  @media (max-width: 767.98px) {
    width: 32px;
    height: 32px;
  }
`

const Account = styled.span`
  margin-left: 15px;
  @media (max-width: 767.98px) {
    font-size: 13px;
  }
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
  @media (max-width: 767.98px) {
    font-size: 10px;
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
          {wallets.map(({ formattedAccount, blockchain, formattedBlockchain, isConnected }) => (
            <ContainerAccountInfo key={`${blockchain}-wallet`}>
              <Row>
                <Col xs={8} className="my-auto">
                  <BlockchainImage src={`../assets/svg/${blockchain}.svg`} data-tip={formattedBlockchain} />
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
              <ReactTooltip />
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
