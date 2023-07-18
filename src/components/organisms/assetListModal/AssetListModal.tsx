import PropTypes from 'prop-types'
import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import styled from 'styled-components'

import { useAssetsWithouDefault, useSearchAssets, useAssetsGroupedByGivenStrategy } from '../../../hooks/use-assets'
import { UpdatedAsset, isNative } from '../../../settings/swap-assets'
import { ITheme } from '../../../theme/ThemeProvider'
import { getAssetFromSymbol } from '../../../utils/maps'
import Icon from '../../atoms/icon/Icon'
import Modal from '../../molecules/modal/Modal'

const OuterTokenIcon = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.secondary2};
  cursor: pointer;
  box-shadow: ${({ theme }: { theme: ITheme }) => theme.secondary1} 1px 1px 9px -3px;
`

const InnerTokenIcon = styled.img`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.secondary2};
  box-shadow: ${({ theme }: { theme: ITheme }) => theme.secondary1} 1px 1px 9px -3px;
  cursor: pointer;
`

const Minicon = styled.img`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-top: 21px;
  margin-left: -12px;
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.secondary2};
  box-shadow: ${({ theme }: { theme: ITheme }) => theme.secondary1} 1px 1px 9px -3px;
  background: white;
  @media (max-width: 767.98px) {
    margin-top: -10px;
    margin-left: 21px;
  }
`

const ContainerRow = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }: { theme: ITheme }) => theme.bg2};
  }
`

const ContainerInnerRow = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 45px;
  padding-right: 45px;
  &:hover {
    background: ${({ theme }: { theme: ITheme }) => theme.bg2};
  }
`

const ContainerAssets = styled.div`
  height: 700px;
  max-height: 700px;
  overflow: auto;
  @media (max-width: 767.98px) {
    max-height: 450px;
  }
`

const StyledRow = styled(Row)`
  cursor: pointer;
`

const StyledInnerRow = styled(Row)`
  cursor: pointer;
  font-size: 16px;
  @media (max-width: 767.98px) {
    font-size: 14px;
  }
`

const Arrow = styled(Icon)`
  position: relative;
  width: 12px;
  cursor: pointer;

  svg {
    fill: ${({ theme }: { theme: ITheme }) => theme.text3};
  }

  @media (max-width: 767.98px) {
    width: 10px;
  }
`

const AssetSymbol = styled.div`
  font-size: 16px;
  @media (max-width: 767.98px) {
    font-size: 14px;
  }
`

const AssetName = styled.div`
  color: ${({ theme }: { theme: ITheme }) => theme.text3};
  font-size: 12px;
`

const FormattedName = styled.span`
  font-size: 13px;
`

const Search = styled.input`
  background: ${({ theme }: { theme: ITheme }) => theme.bg1};
  width: 100%;
  padding: 15px;
  border-radius: 20px;
  outline: 0px !important;
  appearance: auto;
  -webkit-appearance: none;
  box-shadow: none !important;
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.lightGray};
  color: ${({ theme }: { theme: ITheme }) => theme.secondary1};
  font-size: 18px;
  &:focus {
    border: 1px solid ${({ theme }: { theme: ITheme }) => theme.blue};
  }
  @media (max-width: 767.98px) {
    font-size: 14px;
  }
`

const ContainerSearch = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: 1px solid ${({ theme }: { theme: ITheme }) => theme.lightGray};
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
  color: ${({ theme }: { theme: ITheme }) => theme.blue};
  display: inline-block;
  vertical-align: text-bottom;
  border: 0.15em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;
`

interface AssetListModalProps {
  show: boolean
  title: string
  assets: UpdatedAsset[]
  onClose: () => void
  onSelect: (_asset: UpdatedAsset) => void
}

const AssetListModal = ({ show: showModal, title, onClose, onSelect, assets: _assets }: AssetListModalProps) => {
  const assetsWithoutDefault = useAssetsWithouDefault(_assets)
  const [filteredAssets, setSearchWord] = useSearchAssets(assetsWithoutDefault)
  const assets = useAssetsGroupedByGivenStrategy(filteredAssets)
  const [show, setShow] = useState<boolean[]>([])
  const inputSearchRef = useRef<HTMLInputElement>(null)

  const [stillLoading] = useMemo(() => {
    const nativeSymbols = Object.keys(assets)
    const loadedAssets = nativeSymbols.filter((_nativeSymbol) =>
      assets[_nativeSymbol].find(({ miniImage, image }) => miniImage && image)
    )
    return [loadedAssets.length === nativeSymbols.length ? false : true]
  }, [assets])

  useEffect(() => {
    if (inputSearchRef.current) inputSearchRef.current.focus()
  }, [])

  useEffect(() => {
    setShow(Object.keys(assets).length === 1 && !stillLoading ? [true] : [false])
  }, [assets, stillLoading])

  const onShow = useCallback(
    (_index: number) => {
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
    (_asset: UpdatedAsset) => {
      setSearchWord('')
      setShow(show.map(() => false))
      onSelect(_asset)
    },
    [show, onSelect, setSearchWord]
  )

  const onShowLine = useCallback(
    (_nativeSymbol: string, _index: number) => {
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
            <Search
              placeholder="Search or paste an address ..."
              ref={inputSearchRef}
              onChange={(_e: React.ChangeEvent<HTMLInputElement>) => setSearchWord(_e.target.value)}
            />
          </ContainerSearch>
          <ContainerAssets>
            {Object.keys(assets).map((_nativeSymbol, _index) => {
              return (
                <React.Fragment>
                  <ContainerRow>
                    <StyledRow onClick={() => onShowLine(_nativeSymbol, _index)}>
                      <ContainerTokenInfo xs={8}>
                        <OuterTokenIcon src={`./assets/svg/${_nativeSymbol}.svg`} />
                        <ContainerTokenNameAndSymbol>
                          <AssetSymbol>{_nativeSymbol}</AssetSymbol>
                          <AssetName>
                            {_assets.length > 0
                              ? getAssetFromSymbol(_assets.filter(isNative), _nativeSymbol)?.name || ''
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
                        .map((_asset) => {
                          const { name, blockchain, network, formattedBalance, formattedName, image, miniImage } =
                            _asset
                          return (
                            <ContainerInnerRow key={`${name}-on-${blockchain}-${network}`}>
                              <StyledInnerRow onClick={() => onSelectAsset(_asset)}>
                                <Col xs={2} className="my-auto">
                                  <InnerTokenIcon src={image} />
                                  {miniImage ? <Minicon src={miniImage} /> : null}
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
  assets: PropTypes.object,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
}

export default AssetListModal
