import React, { useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Container, Table } from 'react-bootstrap'
import Button from '../../atoms/button/Button'
import { ContainerImage, Image, MiniImage } from '../../organisms/swapLine/SwapLine'

export const OuterContainerSwap = styled.div`
  @media (max-width: 767.98px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`

const StyledTable = styled(Table)`
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  border: 0;
  border-radius: 20px;
  background: ${({ theme }) => theme.secondary3};
`

const Thead = styled.thead`
  border-radius: 0;
`

const Tr = styled.tr`
  border: 0;
`

const Th = styled.th`
  padding: 20px !important;
  border: 0 !important;
  color: ${({ theme }) => theme.text1};
  @media (max-width: 767.98px) {
    font-size: 13px;
    padding: 15px !important;
  }
`

const Td = styled.td`
  padding: 20px !important;
  color: ${({ theme }) => theme.text1};
  border-top: 1px solid ${({ theme }) => theme.lightGray} !important;
  font-size: 15px;
  vertical-align: baseline !important;
  @media (max-width: 767.98px) {
    font-size: 13px;
    padding: 15px !important;
  }
`

const Tbody = styled.tbody`
  align-items: center;
  justify-content: center;
  border: 0;
`

const ContinueButton = styled(Button)`
  height: 30px;
  font-size: 15px;
  width: 100px;
  @media (max-width: 767.98px) {
    font-size: 13px;
  }
`

const TdContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledImage = styled(Image)`
  height: 35px;
  width: 35px;
  @media (max-width: 767.98px) {
    height: 30px;
    width: 30px;
  }
`

const StyledMiniImage = styled(MiniImage)`
  height: 17.5px;
  width: 17.5px;
  margin-top: 23px;
  margin-left: -13px;
  @media (max-width: 767.98px) {
    height: 12.5px;
    width: 12.5px;
    margin-top: 20px;
    margin-left: -9px;
  }
`

const Text = styled.span`
  margin-left: 10px;
`

const MigrationHome = ({ selectPage, loadMigrationData }) => {
  const onMigrate = useCallback(
    _strategy => {
      selectPage(`migration/${_strategy}`)
      loadMigrationData({
        strategy: _strategy
      })
    },
    [selectPage, loadMigrationData]
  )

  return (
    <Container>
      <StyledTable size="sm">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th>APY% (old)</Th>
            <Th>APY% (new)</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>A</Td>
            <Td>
              <TdContent>
                <ContainerImage>
                  <StyledImage src={'../assets/svg/PBTC.svg'} />
                  <StyledMiniImage src={'../assets/svg/ETH.svg'} />
                </ContainerImage>
                <Text>pBTC V1</Text>
              </TdContent>
            </Td>
            <Td>
              <TdContent>
                <ContainerImage>
                  <StyledImage src={'../assets/svg/PBTC.svg'} />
                  <StyledMiniImage src={'../assets/svg/ETH.svg'} />
                </ContainerImage>
                <Text>pBTC V2</Text>
              </TdContent>
            </Td>
            <Td>-</Td>
            <Td>-</Td>
            <Td>
              <ContinueButton onClick={() => onMigrate('a')}>Migrate</ContinueButton>
            </Td>
          </Tr>
          <Tr>
            <Td>B</Td>
            <Td>
              <TdContent>
                <ContainerImage>
                  <StyledImage src={'../assets/svg/PBTC.svg'} />
                  <StyledMiniImage src={'../assets/svg/ETH.svg'} />
                </ContainerImage>
                <Text>pBTC V1/sbtcCRV Gauge Deposit</Text>
              </TdContent>
            </Td>
            <Td>
              <TdContent>
                <ContainerImage>
                  <StyledImage src={'../assets/svg/PBTC.svg'} />
                  <StyledMiniImage src={'../assets/svg/ETH.svg'} />
                </ContainerImage>
                <Text>pBTC V2/sbtcCRV Gauge Deposit</Text>
              </TdContent>
            </Td>
            <Td>3%</Td>
            <Td>10%</Td>
            <Td>
              <ContinueButton onClick={() => onMigrate('b')}>Migrate</ContinueButton>
            </Td>
          </Tr>
          <Tr>
            <Td>C</Td>
            <Td>
              {' '}
              <TdContent>
                <ContainerImage>
                  <StyledImage src={'../assets/svg/PBTC.svg'} />
                  <StyledMiniImage src={'../assets/svg/ETH.svg'} />
                </ContainerImage>
                <Text>pBTC V1/sbtcCRV Gauge Deposit</Text>
              </TdContent>
            </Td>
            <Td>
              {' '}
              <TdContent>
                <ContainerImage>
                  <StyledImage src={'../assets/svg/PBTC.svg'} />
                  <StyledMiniImage src={'../assets/svg/ETH.svg'} />
                </ContainerImage>
                <Text>IdleCDO AA Tranche - idleCvxpbtc V2/sbtcCRV-f</Text>
              </TdContent>
            </Td>
            <Td>10%</Td>
            <Td>20%</Td>
            <Td>
              <ContinueButton onClick={() => onMigrate('c')}>Migrate</ContinueButton>
            </Td>
          </Tr>
          <Tr>
            <Td>D</Td>
            <Td>
              {' '}
              <TdContent>
                <ContainerImage>
                  <StyledImage src={'../assets/svg/PBTC.svg'} />
                  <StyledMiniImage src={'../assets/svg/ETH.svg'} />
                </ContainerImage>
                <Text>pBTC V1/sbtcCRV Gauge Deposit</Text>
              </TdContent>
            </Td>
            <Td>
              {' '}
              <TdContent>
                <ContainerImage>
                  <StyledImage src={'../assets/svg/PBTC.svg'} />
                  <StyledMiniImage src={'../assets/svg/ETH.svg'} />
                </ContainerImage>
                <Text>IdleCDO BB Tranche - idleCvxpbtc V2/sbtcCRV-f</Text>
              </TdContent>
            </Td>
            <Td>10%</Td>
            <Td>20%</Td>
            <Td>
              <ContinueButton onClick={() => onMigrate('d')}>Migrate</ContinueButton>
            </Td>
          </Tr>
        </Tbody>
      </StyledTable>
    </Container>
  )
}

MigrationHome.propTypes = {
  selectPage: PropTypes.func.isRequired,
  loadMigrationData: PropTypes.func.isRequired
}

export default MigrationHome
