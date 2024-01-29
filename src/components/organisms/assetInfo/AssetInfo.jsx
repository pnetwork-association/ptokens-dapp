import PropTypes from 'prop-types'
import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import { ETHPNT_ON_ETH_MAINNET } from '../../../constants'
import { useProvider } from '../../../hooks/use-provider'
import { capitalizeAllLettersExceptFirst } from '../../../utils/capitalize'
import { getBase64Image } from '../../../utils/image'
import { copyToClipboard } from '../../../utils/utils'
import { registerToken } from '../../../utils/wallet'
import Icon from '../../atoms/icon/Icon'

const InfoEta = styled.div`
  margin-top: 30px;
  padding: 20px;
  margin-bottom: 10px;
  background: #66b8ff40;
  border: 0.5px solid ${({ theme }) => theme.blue};
  border-radius: 10px;
  color: ${({ theme }) => theme.blue};
  text-align: center;
`

const InflationInfo = styled(InfoEta)`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 0px;
  margin-right: 10px;
  margin-left: 10px;
  padding: 5px;
`

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

const Token = styled.a`
  color: ${({ theme }) => theme.blue};
  font-size: 14px;
  text-decoration: underline;
  margin-left: 7px;
  margin-top: 3px;
  @media (max-width: 767.98px) {
    font-size: 12px;
  }
`

const ContainerOptions = styled(Col)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: auto !important;
`

const ContainerName = styled(Col)`
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
  const { symbol, address, explorer, blockchain, decimals, isSpecial, isNative, image } = asset
  const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(false)
  const { isMetaMask } = useProvider(wallet.provider)

  useEffect(() => {
    ReactTooltip.rebuild()
  })

  const onAddToken = useCallback(async () => {
    try {
      if (!wallet.provider || !isMetaMask) return
      registerToken({
        provider: wallet.provider,
        tokenAddress: address,
        tokenSymbol: symbol,
        tokenDecimals: decimals,
        tokenImage: await getBase64Image(image),
      })
    } catch (_err) {
      console.error(_err)
    }
  }, [decimals, address, symbol, wallet, image, isMetaMask])

  return (
    <Row>
      <ContainerAssetInfo>
        <Row>
          <ContainerName xs={6}>
            <Token href={explorer} target="blank">
              {isNative ? symbol : isSpecial ? symbol : capitalizeAllLettersExceptFirst(symbol)}
            </Token>
          </ContainerName>
          <ContainerOptions xs={6}>
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
            {blockchain !== 'EOS' && blockchain !== 'TELOS' && blockchain !== 'LIBRE' && blockchain !== 'ALGORAND' ? (
              <MetamaskIcon
                icon="metamask"
                data-tip={!wallet.provider ? 'Connect MetaMask to add the token' : 'Add to MetaMask'}
                onClick={onAddToken}
              />
            ) : null}
            <Token href={explorer} target="blank">
              <WorldIcon icon="world" />
            </Token>
          </ContainerOptions>
        </Row>
        {asset.id === ETHPNT_ON_ETH_MAINNET ? (
          <Row>
            <InflationInfo>
              ethPNT is an extension of the PNT token with cross-chain functionality, maintaining the same token economy
              and functionalities as PNT-on-Ethereum. ethPNT grants the same DAO governance power of PNT, inheriting its
              full value.
            </InflationInfo>
          </Row>
        ) : null}
        <ReactTooltip
          getContent={(_dataTip) =>
            _dataTip === 'Add to MetaMask' || _dataTip === 'Connect MetaMask to add the token'
              ? _dataTip
              : isCopiedToClipboard
              ? 'Copied!'
              : 'Copy to clipboard'
          }
        />
      </ContainerAssetInfo>
    </Row>
  )
}

AssetInfo.propTypes = {
  asset: PropTypes.object,
  wallet: PropTypes.object,
}

AssetInfo.defaultProps = {
  asset: {},
}

export default AssetInfo
