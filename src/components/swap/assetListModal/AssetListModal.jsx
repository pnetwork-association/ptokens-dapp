import React, { useState, useCallback } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useGroupedAssets } from '../../../hooks/use-grouped-assets'
import { getAssetFromSymbol } from '../../../utils/maps'

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

const ContainerRow = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  &:hover {
    background: #ececec;
  }
`

const ContainerInnerRow = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 45px;
  padding-right: 45px;
  &:hover {
    background: #ececec;
  }
`

const StyledBody = styled(Modal.Body)`
  height: 600px;
  max-height: 600px;
  overflow: auto;
  color: #475965;
  font-size: 18px;
  padding-left: 0;
  padding-top: 0;
  padding-right: 0;
`

const StyledRow = styled(Row)`
  cursor: pointer;
`

const StyledInnerRow = styled(Row)`
  cursor: pointer;
  font-size: 16px;
`

const StyledHeader = styled(Modal.Header)``

const StyledModalTitle = styled(Modal.Title)`
  color: #475965;
`

const ArrowImage = styled.img`
  position: relative;
  width: 16px;
  cursor: pointer;
`

const AssetSymbol = styled(Col)``

const AssetName = styled(Col)`
  color: rgb(136, 141, 155);
`

const AssetListModal = _props => {
  const { show: showModal, title, onClose, onSelect } = _props

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

  const onHide = useCallback(() => {
    setShow(show.map(() => false))
    onClose()
  }, [show, onClose])

  const onSelectAsset = useCallback(
    _asset => {
      setShow(show.map(() => false))
      onSelect(_asset)
    },
    [show, onSelect]
  )

  return (
    <Modal show={showModal} aria-labelledby="contained-modal-title-vcenter" centered onHide={onHide}>
      <StyledHeader closeButton>
        <StyledModalTitle>{title}</StyledModalTitle>
      </StyledHeader>
      <StyledBody>
        {Object.keys(assets).map((_nativeSymbol, _index) => {
          return (
            <React.Fragment key={_index}>
              <ContainerRow>
                <StyledRow onClick={() => onShow(_index)}>
                  <Col xs={2}>
                    <Image src={`../assets/tokens/${_nativeSymbol}-mainnet.png`} />
                  </Col>
                  <Col xs={7} className="pl-0 my-auto">
                    <AssetSymbol>{_nativeSymbol}</AssetSymbol>
                    <AssetName>
                      {_props.assets.length > 0 ? getAssetFromSymbol(_props.assets, _nativeSymbol).name : ''}
                    </AssetName>
                  </Col>
                  <Col xs={3} className="my-auto text-right">
                    <ArrowImage src={`../assets/arrow-${show[_index] ? 'up' : 'down'}.png`} />
                  </Col>
                </StyledRow>
              </ContainerRow>
              {show[_index] ? (
                <React.Fragment>
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
                        <ContainerInnerRow key={`${name}-on-${blockchain}-${network}`}>
                          <StyledInnerRow onClick={() => onSelectAsset(_asset)}>
                            <Col xs={3}>
                              <TokenImage src={image} />
                              {withMiniImage ? <MiniImage src={miniImage} /> : null}
                            </Col>
                            <Col xs={6} className="text-center my-auto">
                              {formattedName === _nativeSymbol ? 'Native' : formattedName}
                            </Col>
                            <Col xs={3} className="my-auto text-right">
                              {formattedBalance}
                            </Col>
                          </StyledInnerRow>
                        </ContainerInnerRow>
                      )
                    })}{' '}
                </React.Fragment>
              ) : null}
            </React.Fragment>
          )
        })}
      </StyledBody>
    </Modal>
  )
}

AssetListModal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  assets: PropTypes.array,
  onClose: PropTypes.func,
  onSelect: PropTypes.func
}

export default AssetListModal
