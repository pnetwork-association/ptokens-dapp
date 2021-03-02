import React, { useState, useCallback } from 'react'
import { Col, Modal, Row, Container } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useGroupedAssets } from '../../../hooks/use-grouped-assets'
import { blockchainSymbolToName } from '../../../utils/maps'

const Image = styled.img`
  position: relative;
  width: 50px;
  background: white;
  border-radius: 50%;
  border: 1px solid rgba(71, 89, 101, 0.3);
  cursor: pointer;
`

const TokenImage = styled.img`
  position: relative;
  width: 40px;
  background: white;
  border-radius: 50%;
  border: 1px solid rgba(71, 89, 101, 0.3);
  cursor: pointer;
`

const MiniImage = styled.img`
  position: absolute;
  width: 16px;
  background: white;
  border-radius: 50%;
  margin-top: 27px;
  margin-left: -13px;
  border: 1px solid rgba(71, 89, 101, 0.3);
`

const StyledBody = styled(Modal.Body)`
  height: 600px;
  max-height: 600px;
  overflow: auto;
  background: rgba(71, 89, 101, 0.05);
  color: #475965;
  font-size: 18px;
`

const StyledRow = styled(Row)`
  margin-top: 20px !important;
  cursor: pointer;
`

const StyledHeader = styled(Modal.Header)`
  background: rgba(71, 89, 101, 0.05);
`

const StyledModalTitle = styled(Modal.Title)`
  color: #475965;
`

const ArrowImage = styled.img`
  position: relative;
  width: 24px;
  cursor: pointer;
`

const AssetListModal = _props => {
  const { show: showModal, onClose, onSelect } = _props

  const [assets] = useGroupedAssets(_props.assets)
  const [show, setShow] = useState([])

  const onShow = useCallback(
    _index => {
      const currentShow = show
      currentShow[_index] = currentShow[_index] ? !currentShow[_index] : true
      setShow(currentShow.slice())
    },
    [show]
  )

  return (
    <Modal show={showModal} aria-labelledby="contained-modal-title-vcenter" centered onHide={onClose}>
      <StyledHeader>
        <StyledModalTitle>Assets</StyledModalTitle>
      </StyledHeader>
      <StyledBody>
        {Object.keys(assets).map((_nativeSymbol, _index) => {
          return (
            <React.Fragment key={_index}>
              <StyledRow onClick={() => onShow(_index)}>
                <Col xs={3}>
                  <Image src={`../assets/tokens/${_nativeSymbol}-mainnet.png`} />
                </Col>
                <Col xs={6} className="text-center my-auto">
                  {_nativeSymbol}
                </Col>
                <Col xs={3} className="my-auto text-right">
                  <ArrowImage src={`../assets/arrow-${show[_index] ? 'up' : 'down'}.png`} />
                </Col>
              </StyledRow>

              {show[_index] ? (
                <Container>
                  {assets[_nativeSymbol]
                    .sort((_a, _b) => (_a.formattedName > _b.formattedName ? 1 : -1))
                    .map(_asset => {
                      const {
                        name,
                        blockchain,
                        network,
                        formattedBalance,
                        formattedName,
                        withMiniImage,
                        image,
                        miniImage
                      } = _asset
                      return (
                        <StyledRow key={`${name}-on-${blockchain}-${network}`} onClick={() => onSelect(_asset)}>
                          <Col xs={3}>
                            <TokenImage src={image} />
                            {withMiniImage ? <MiniImage src={miniImage} /> : null}
                          </Col>
                          <Col xs={6} className="text-center my-auto">
                            {formattedName}
                          </Col>
                          <Col xs={3} className="my-auto text-right">
                            {formattedBalance}
                          </Col>
                        </StyledRow>
                      )
                    })}{' '}
                </Container>
              ) : null}
            </React.Fragment>
          )
        })}
      </StyledBody>
    </Modal>
  )
}

AssetListModal.propTypes = {
  show: PropTypes.bool,
  assets: PropTypes.array,
  onClose: PropTypes.func,
  onSelect: PropTypes.func
}

export default AssetListModal
