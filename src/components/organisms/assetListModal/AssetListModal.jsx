import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useGroupedAssetsByNativeSymbol } from '../../../hooks/use-grouped-assets'
import { getAssetFromNativeSymbol } from '../../../utils/maps'
import { useSearchAssets } from '../../../hooks/use-search-assets'
import { useAssetsWithouDefault } from '../../../hooks/use-assets'
import Icon from '../../atoms/icon/Icon'
import Modal from '../../molecules/modal/Modal'

const OuterTokenIcon = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.secondary2};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.secondary1} 1px 1px 9px -3px;
`

const InnerTokenIcon = styled.img`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.secondary2};
  box-shadow: ${({ theme }) => theme.secondary1} 1px 1px 9px -3px;
  cursor: pointer;
`

const Minicon = styled.img`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-top: 21px;
  margin-left: -12px;
  border: 1px solid ${({ theme }) => theme.secondary2};
  box-shadow: ${({ theme }) => theme.secondary1} 1px 1px 9px -3px;
  background: white;
`

const ContainerRow = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.bg2};
  }
`

const ContainerInnerRow = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 45px;
  padding-right: 45px;
  &:hover {
    background: ${({ theme }) => theme.bg2};
  }
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

const Arrow = styled(Icon)`
  position: relative;
  width: 12px;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.secondary1};
  }
`

const AssetSymbol = styled.div`
  font-size: 16px;
`

const AssetName = styled.div`
  color: ${({ theme }) => theme.text3};
  font-size: 12px;
`

const FormattedName = styled.span`
  font-size: 13px;
`

const Search = styled.input`
  background: ${({ theme }) => theme.bg1};
  width: 100%;
  padding: 15px;
  border-radius: 20px;
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
  border: 1px solid ${({ theme }) => theme.lightGray};
  color: ${({ theme }) => theme.secondary1};
  font-size: 18px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.blue};
  }
`

const ContainerSearch = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
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
  color: ${({ theme }) => theme.blue};
  display: inline-block;
  vertical-align: text-bottom;
  border: 0.15em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;
`

const AssetListModal = ({ show: showModal, title, onClose, onSelect, assets: _assets, defaultAssets }) => {
  const [assetsWithoutDefault] = useAssetsWithouDefault(_assets)
  const [filteredAssets, setSearchWord] = useSearchAssets(assetsWithoutDefault)
  const [assets] = useGroupedAssetsByNativeSymbol(filteredAssets)
  const [show, setShow] = useState([])

  console.log(assets)

  const [stillLoading] = useMemo(() => {
    const nativeSymbols = Object.keys(assets)
    const loadedAssets = nativeSymbols.filter(_nativeSymbol =>
      assets[_nativeSymbol].find(({ miniImage, image }) => miniImage && image)
    )
    return [loadedAssets.length === nativeSymbols.length ? false : true]
  }, [assets])

  useEffect(() => {
    setShow(Object.keys(assets).length === 1 && !stillLoading ? [true] : [false])
  }, [assets, stillLoading])

  const onShow = useCallback(
    _index => {
      const currentShow = show
      currentShow[_index] = currentShow[_index] ? !currentShow[_index] : true
      setShow(currentShow.slice())
    },
    [show]
  )

  const onCloseModal = useCallback(() => {
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

  const onShowLine = useCallback(
    (_nativeSymbol, _index) => {
      if (assets[_nativeSymbol].find(({ miniImage, image }) => !miniImage || !image)) {
        return
      }
      onShow(_index)
    },
    [assets, onShow]
  )

  return (
    <Modal
      show={showModal}
      onClose={onCloseModal}
      title={title}
      body={
        <React.Fragment>
          <ContainerSearch>
            <Search placeholder="Search or paste an address ..." onChange={_e => setSearchWord(_e.target.value)} />
          </ContainerSearch>
          <ContainerAssets>
            {Object.keys(assets).map((_nativeSymbol, _index) => {
              return (
                <React.Fragment key={_index}>
                  <ContainerRow>
                    <StyledRow onClick={() => onShowLine(_nativeSymbol, _index)}>
                      <ContainerTokenInfo xs={8}>
                        <OuterTokenIcon src={`../assets/svg/${_nativeSymbol}.svg`} />
                        <ContainerTokenNameAndSymbol>
                          <AssetSymbol>{_nativeSymbol}</AssetSymbol>
                          <AssetName>
                            {_assets.length > 0
                              ? getAssetFromNativeSymbol(
                                  defaultAssets.filter(({ isPtoken }) => !isPtoken),
                                  _nativeSymbol
                                ).name
                              : ''}
                          </AssetName>
                        </ContainerTokenNameAndSymbol>
                      </ContainerTokenInfo>
                      <Col xs={4} className="my-auto text-right">
                        {assets[_nativeSymbol].find(({ miniImage, image }) => !miniImage || !image) ? (
                          <StyledSpinner animation="border" />
                        ) : (
                          <Arrow icon={`arrow-${show[_index] ? 'up' : 'down'}`} />
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
                          console.log(formattedName)
                          return (
                            <ContainerInnerRow key={`${name}-on-${blockchain}-${network}`}>
                              <StyledInnerRow onClick={() => onSelectAsset(_asset)}>
                                <Col xs={2} className="my-auto">
                                  <InnerTokenIcon src={image} />
                                  {withMiniImage ? <Minicon src={miniImage} /> : null}
                                </Col>
                                <Col xs={8} className="text-center my-auto">
                                  <FormattedName>{formattedName}</FormattedName>
                                </Col>
                                <Col xs={2} className="my-auto text-right pl-0">
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
        </React.Fragment>
      }
    />
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
