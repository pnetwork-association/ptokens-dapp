import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import Icon from '../../atoms/icon/Icon'
import { copyToClipboard } from '../../../utils/utils'
import { slicerByBlockchain } from '../../../utils/account-viewer'
import { registerToken } from '../../../utils/wallet'

const ContainerAssetInfo = styled(Col)`
  margin-top: 10px;
  padding-left: -15px !important;
  padding-right: -15px !important;
  border-top: 1px solid ${({ theme }) => theme.lightGray};
  padding-top: 15px;
  @media (max-width: 767.98px) {
    margin-top: 10px;
    padding-top: 10px;
  }
`

const Address = styled(Col)`
  color: ${({ theme }) => theme.blue};
  text-align: left;
  font-size: 14px;
  text-decoration: underline;
  @media (max-width: 767.98px) {
    font-size: 12px;
  }
`

const ContainerOptions = styled(Col)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: auto !important;
`

const CopyIcon = styled(Icon)`
  width: 18px;
  height: 18px;
  cursor: pointer;
  svg {
    fill: ${({ theme }) => (theme.type === 'light' ? theme.text1 : 'white')};
  }
`

const WorldIcon = styled(CopyIcon)`
  margin-right: 5px;
`

const MetamaskIcon = styled(Icon)`
  margin-left: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
`

const AssetInfo = ({ asset, wallet }) => {
  const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(false)
  const { blockchain, address, explorer } = asset

  useEffect(() => {
    ReactTooltip.rebuild()
  })

  const onAddToken = useCallback(() => {
    registerToken({
      provider: wallet.provider,
      tokenAddress: asset.address,
      tokenSymbol: asset.symbol,
      tokenDecimals: asset.decimals,
      tokenImage: null
    })
  }, [asset, wallet])

  return (
    <Row>
      <ContainerAssetInfo>
        <Row>
          <Address xs={6}>
            <a href={explorer} target="blank">
              <WorldIcon icon="world" />
              {slicerByBlockchain(address, blockchain)}
            </a>
          </Address>
          <ContainerOptions>
            <CopyIcon
              icon="copy"
              data-tip={isCopiedToClipboard ? 'Copied!' : 'Copy to clipboard'}
              onClick={() => {
                setIsCopiedToClipboard(true)
                copyToClipboard(address)
                setTimeout(() => {
                  setIsCopiedToClipboard(false)
                }, 1500)
              }}
            />
            {blockchain !== 'EOS' && blockchain !== 'TELOS' && wallet.provider ? (
              <MetamaskIcon icon="metamask" data-tip={'Add to metamask'} onClick={onAddToken} />
            ) : null}
          </ContainerOptions>
        </Row>
        <ReactTooltip
          getContent={_dataTip =>
            _dataTip === 'Add to metamask' ? _dataTip : isCopiedToClipboard ? 'Copied!' : 'Copy to clipboard'
          }
        />
      </ContainerAssetInfo>
    </Row>
  )
}

AssetInfo.propTypes = {
  asset: PropTypes.object,
  wallet: PropTypes.object
}

AssetInfo.defaultProps = {
  asset: {}
}

export default AssetInfo
