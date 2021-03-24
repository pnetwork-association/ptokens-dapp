import React, { useState, useCallback } from 'react'
import { Col, Modal, Row, Spinner } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useGroupedAssets } from '../../../hooks/use-grouped-assets'
import { getAssetFromSymbol } from '../../../utils/maps'
import { useSearchAssets } from '../../../hooks/use-search-assets'

const OuterTokenIcon = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(71, 89, 101, 0.3);
  cursor: pointer;
  box-shadow: #475965 1px 1px 9px -3px;
`

const InnerTokenIcon = styled.img`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(71, 89, 101, 0.3);
  box-shadow: #475965 1px 1px 9px -3px;
  cursor: pointer;
`

const Minicon = styled.img`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-top: 21px;
  margin-left: -12px;
  border: 1px solid rgba(71, 89, 101, 0.3);
  box-shadow: #475965 1px 1px 9px -3px;
  background: white;
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
  color: #475965;
  font-size: 18px;
  padding-left: 0;
  padding-top: 0;
  padding-right: 0;
`

const ContainerAssets = styled.div`
  height: 700px;
  max-height: 700px;
  overflow: auto;
`

const StyledRow = styled(Row)`
  cursor: pointer;
`

const StyledInnerRow = styled(Row)`
  cursor: pointer;
  font-size: 16px;
`

const StyledHeader = styled(Modal.Header)`
  border-bottom: 0;
`

const StyledModalTitle = styled(Modal.Title)`
  color: #475965;
`

const ArrowImage = styled.img`
  position: relative;
  width: 12px;
  cursor: pointer;
`

const AssetSymbol = styled.div`
  font-size: 16px;
`

const AssetName = styled.div`
  color: rgb(136, 141, 155);
  font-size: 12px;
`

const FormattedName = styled.span`
  font-size: 13px;
  text-transform: uppercase;
`

const Search = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 20px;
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
  border: 1px solid rgba(71, 89, 101, 0.3);
  color: #475965;
  font-size: 18px;
  &:focus {
    border: 1px solid #66b8ff;
  }
`

const ContainerSearch = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: 1px solid #dee2e6;
`

const ContainerTokenInfo = styled(Col)`
  display: flex;
  margin-bottom: auto !important;
`

const ContainerTokenNameAndSymbol = styled.div`
  margin-left: 15px;
`

const StyledSpinner = styled(Spinner)`
  width: 18px;
  height: 18px;
  color: #66b8ff;
  display: inline-block;
  vertical-align: text-bottom;
  border: 0.15em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;
`

const AssetListModal = _props => {
  const { show: showModal, title, onClose, onSelect } = _props

  const [filteredAssets, setSearchWord] = useSearchAssets(_props.assets)
  const [assets] = useGroupedAssets(filteredAssets)
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
    setSearchWord('')
    setShow(show.map(() => false))
    onClose()
  }, [show, onClose, setSearchWord])

  const onSelectAsset = useCallback(
    _asset => {
      setSearchWord('')
      setShow(show.map(() => false))
      onSelect(_asset)
    },
    [show, onSelect, setSearchWord]
  )

  const onShowLine = useCallback((_nativeSymbol, _index) => {
    if (assets[_nativeSymbol].find(({ miniImage, image }) => !miniImage || !image)) {
      return
    }
    onShow(_index)
  })

  return (
    <Modal show={showModal} aria-labelledby="contained-modal-title-vcenter" centered onHide={onHide}>
      <StyledHeader closeButton>
        <StyledModalTitle>{title}</StyledModalTitle>
      </StyledHeader>
      <StyledBody>
        <ContainerSearch>
          <Search placeholder="Search or paste an address ..." onChange={_e => setSearchWord(_e.target.value)} />
        </ContainerSearch>
        <ContainerAssets>
          {Object.keys(assets).map((_nativeSymbol, _index) => {
            return (
              <React.Fragment key={_index}>
                <ContainerRow>
                  <StyledRow onClick={() => onShowLine(_nativeSymbol, _index)}>
                    <ContainerTokenInfo xs={6}>
                      <OuterTokenIcon src={`../assets/svg/${_nativeSymbol}.svg`} />
                      <ContainerTokenNameAndSymbol>
                        <AssetSymbol>{_nativeSymbol}</AssetSymbol>
                        <AssetName>
                          {_props.assets.length > 0 ? getAssetFromSymbol(_props.defaultAssets, _nativeSymbol).name : ''}
                        </AssetName>
                      </ContainerTokenNameAndSymbol>
                    </ContainerTokenInfo>
                    <Col xs={6} className="my-auto text-right">
                      {assets[_nativeSymbol].find(({ miniImage, image }) => !miniImage || !image) ? (
                        <StyledSpinner animation="border" />
                      ) : (
                        <ArrowImage src={`../assets/png/arrow-${show[_index] ? 'up' : 'down'}.png`} />
                      )}
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
                              <Col xs={2} className="my-auto">
                                <InnerTokenIcon src={image} />
                                {withMiniImage ? <Minicon src={miniImage} /> : null}
                              </Col>
                              <Col xs={8} className="text-center my-auto">
                                <FormattedName>
                                  {formattedName === _nativeSymbol ? 'NATIVE' : formattedName}
                                </FormattedName>
                              </Col>
                              <Col xs={2} className="my-auto text-right">
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
        </ContainerAssets>
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
