import React, { useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Container, Table } from 'react-bootstrap'
import Button from '../../atoms/button/Button'
import { ContainerImage, Image } from '../../organisms/swapLine/SwapLine'

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
  padding-left: 5px;
  padding-right: 5px;
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
  font-size: 14px;
  vertical-align: baseline !important;
  @media (max-width: 767.98px) {
    font-size: 12px;
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

const Text = styled.span`
  margin-left: 10px;
`

const MigrationHome = ({ apys, selectPage, loadMigrationData }) => {
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
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>A</Td>
            <Td>
              <TdContent>
                <ContainerImage>
                  <StyledImage src={'./assets/svg/pBTC_gray.svg'} />
                </ContainerImage>
                <Text>pBTC v1</Text>
              </TdContent>
            </Td>
            <Td>
              <TdContent>
                <ContainerImage>
                  <StyledImage src={'./assets/svg/pBTC.svg'} />
                </ContainerImage>
                <Text>pBTC v2</Text>
              </TdContent>
            </Td>
            <Td>
              <ContinueButton onClick={() => onMigrate('pBTC-v1-to-v2')}>Migrate</ContinueButton>
            </Td>
          </Tr>
          <Tr>
            <Td>B</Td>
            <Td>
              {' '}
              <TdContent>
                <ContainerImage>
                  <StyledImage src={'./assets/svg/PNT_gray.svg'} />
                </ContainerImage>
                <Text>ethPNT</Text>
              </TdContent>
            </Td>
            <Td>
              {' '}
              <TdContent>
                <ContainerImage>
                  <StyledImage src={'./assets/svg/PNT.svg'} />
                </ContainerImage>
                <Text>PNT</Text>
              </TdContent>
            </Td>
            <Td>
              <ContinueButton onClick={() => onMigrate('ethPNT-to-PNT')}>Migrate</ContinueButton>
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
