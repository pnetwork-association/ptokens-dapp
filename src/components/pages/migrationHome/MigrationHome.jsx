import React, { useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Container, Table } from 'react-bootstrap'
import Button from '../../atoms/button/Button'

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
  padding: 25px !important;
  border: 0 !important;
`

const Td = styled.td`
  padding: 25px !important;
`

const Tbody = styled.tbody`
  align-items: center;
  justify-content: center;
`

const ContinueButton = styled(Button)`
  height: 30px;
  font-size: 15px;
`

const MigrationHome = ({ selectPage, loadMigrationData }) => {
  const onMigrate = useCallback(
    _strategy => {
      switch (_strategy) {
        case 'a':
          selectPage('migration/a')
          loadMigrationData({
            strategy: 'a'
          })
          break
        case 'b':
          break
        case 'c':
          break
        case 'd':
          break
        default:
          break
      }
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
            <Td>pBTC V1</Td>
            <Td>pBTC V2</Td>
            <Td>-</Td>
            <Td>-</Td>
            <Td>
              <ContinueButton onClick={() => onMigrate('a')}>Migrate</ContinueButton>
            </Td>
          </Tr>
          <Tr>
            <Td>B</Td>
            <Td>pBTC V1 Curve Gauge</Td>
            <Td>pBTC V2 Curve Gauge</Td>
            <Td>3%</Td>
            <Td>10%</Td>
            <Td>
              <ContinueButton onClick={() => onMigrate('b')}>Migrate</ContinueButton>
            </Td>
          </Tr>
          <Tr>
            <Td>C</Td>
            <Td>pBTC V1 Curve Gauge</Td>
            <Td>pBTC V2 Idle Senior Tranche</Td>
            <Td>10%</Td>
            <Td>20%</Td>
            <Td>
              <ContinueButton onClick={() => onMigrate('c')}>Migrate</ContinueButton>
            </Td>
          </Tr>
          <Tr>
            <Td>D</Td>
            <Td>pBTC V1 Curve Gauge</Td>
            <Td>pBTC V2 Idle Junior Tranche</Td>
            <Td>10%</Td>
            <Td>40%</Td>
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
