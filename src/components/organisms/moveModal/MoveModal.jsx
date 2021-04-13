import React, { useCallback, useMemo, useState } from 'react'
import { Modal, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import settings from '../../../settings'
import { isValidAccountByBlockchain } from '../../../utils/account-validator'

const StyledBody = styled(Modal.Body)`
  color: ${({ theme }) => theme.text1};
  font-size: 18px;
  padding-left: 0;
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  background: ${({ theme }) => theme.bg1};
`

const ContainerRow = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;
  &:hover {
    background: #ececec;
  }
`

const StyledRow = styled(Row)`
  cursor: pointer;
`

const BlokchainIcon = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.secondary2};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.text1} 1px 1px 9px -3px;
`

const ContainerName = styled(Col)`
  margin-bottom: auto !important;
  margin-top: auto !important;
  text-align: center;
  color: ${({ theme }) => theme.text1};
  font-size: 18px;
`
const ContainerRightArrow = styled(Col)`
  margin-bottom: auto !important;
  margin-top: auto !important;
  text-align: right;
`

const RightArrow = styled.img`
  position: relative;
  width: 16px;
  height: 16px;
  cursor: pointer;
`

const StyledHeader = styled(Modal.Header)`
  color: ${({ theme }) => theme.text1};
  font-size: 1.5rem;
  padding: 25px 15px 25px 15px;
  background: ${({ theme }) => theme.bg1};
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
`

const ContainerAddressInputAndButton = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 30px;
  padding-bottom: 30px;
`

const AddressInput = styled.input`
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.secondary2};
  caret-color: #32b1f5;
  color: ${({ theme }) => theme.text1};
  width: 100%;
  outline: 0px !important;
  -webkit-appearance: none;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 24px;
  padding-top: 5px;
  padding-bottom: 5px;
  height: 70px;
`

const AmountInput = styled(AddressInput)`
  margin-top: 20px;
`

const MoveButton = styled.button`
  margin-top: 30px;
  width: 100%;
  color: white;
  background: #ff6666;
  border: 0;
  border-radius: 20px;
  height: 60px;
  font-size: 24px;
  outline: none !important;
  box-shadow: none;
  &:disabled {
    background: #ff666675;
    &:hover {
      background: #ff666675;
    }
  }
  &:hover {
    background: #d64848;
  }
`

const ModeModal = ({ currentBlockchain, show, onClose, onMove }) => {
  const [step, setStep] = useState(0)
  const [blockchain, setBlockchain] = useState(null)
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')

  const onNext = useCallback(
    _value => {
      setBlockchain(_value)
      setStep(1)
    },
    [setStep, setBlockchain]
  )

  const onClick = useCallback(() => {
    setBlockchain(null)
    setAddress(null)
    setStep(0)
    onClose()
    onMove(blockchain, address, amount)
  }, [address, blockchain, amount, setStep, setBlockchain, setAddress, onMove, onClose])

  const isValidAccount = useMemo(() => isValidAccountByBlockchain(address, blockchain), [address, blockchain])

  const onHide = useCallback(() => {
    setBlockchain(null)
    setAddress(null)
    setStep(0)
    onClose()
  }, [setBlockchain, setAddress, setStep, onClose])

  return (
    <Modal show={show} aria-labelledby="contained-modal-blockchain-selection" centered onHide={onHide}>
      <StyledHeader closeButton>{step === 0 ? 'Select the blockchain' : 'Finalize'}</StyledHeader>
      <StyledBody>
        {step === 0 ? (
          settings.supportedBlockchains
            .filter(({ symbol }) => symbol !== currentBlockchain)
            .map(({ name, symbol }) => (
              <ContainerRow key={name} onClick={() => onNext(symbol)}>
                <StyledRow>
                  <Col xs={2}>
                    <BlokchainIcon src={`../assets/svg/${symbol}.svg`} />
                  </Col>
                  <ContainerName xs={8}>{name}</ContainerName>
                  <ContainerRightArrow xs={2}>
                    <RightArrow src="../assets/png/right-arrow.png" />
                  </ContainerRightArrow>
                </StyledRow>
              </ContainerRow>
            ))
        ) : (
          <ContainerAddressInputAndButton>
            <AddressInput value={address} onChange={e => setAddress(e.target.value)} placeholder="address" />
            <AmountInput value={amount} onChange={e => setAmount(e.target.value)} placeholder="amount" type="number" />
            <MoveButton disabled={!isValidAccount} onClick={onClick}>
              {' '}
              MOVE{' '}
            </MoveButton>
          </ContainerAddressInputAndButton>
        )}
      </StyledBody>
      <ReactTooltip />
    </Modal>
  )
}

ModeModal.propTypes = {
  currentBlockchain: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onMove: PropTypes.func
}

export default ModeModal
