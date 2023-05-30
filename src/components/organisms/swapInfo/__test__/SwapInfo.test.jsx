import { ThemeContext } from 'styled-components'
import UserEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { render, screen, getByRole, getByText, queryByText, queryByRole } from '@testing-library/react'
import SwapInfo from '../SwapInfo'
import assets from '../../../../settings/swap-assets'

describe('SwapInfo', () => {
  it('Should not show if from is missing', async () => {
    const { container } = render(<SwapInfo to={assets[1]}></SwapInfo>)
    expect(container.querySelector('div')).toHaveAttribute('show', 'false')
  })

  it('Should not show if to is missing', async () => {
    const { container } = render(<SwapInfo from={assets[0]}></SwapInfo>)
    expect(container.querySelector('div')).toHaveAttribute('show', 'false')
  })

  it('Should show skeleton if fees are not loaded', async () => {
    const from = assets.find((_el) => _el.id === 'PBTC_ON_ETH_MAINNET')
    const to = assets.find((_el) => _el.id === 'BTC')
    const { container } = render(<SwapInfo from={from} to={to} bpm={{}}></SwapInfo>)
    expect(container.querySelector('div')).toHaveAttribute('show', 'true')
    const feesRow = screen.getByText('Fee').parentElement
    expect(getByRole(feesRow, 'generic', { busy: true, live: 'polite' })).toBeInTheDocument()
  })

  it('Should show fees 1', async () => {
    const from = assets.find((_el) => _el.id === 'BTC')
    const to = assets.find((_el) => _el.id === 'PBTC_ON_ETH_MAINNET')
    const { container } = render(
      <SwapInfo
        from={from}
        to={to}
        bpm={{}}
        fees={{ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 }}
      ></SwapInfo>
    )
    expect(container.querySelector('div')).toHaveAttribute('show', 'true')
    const feesRow = screen.getByText('Fee').parentElement
    const formattedFee = getByText(feesRow, '0.15 % (min 2.00 PBTC) + 1.00 PBTC')
    expect(formattedFee).toBeInTheDocument()
    expect(queryByText(feesRow, /Protocol fee:/)).not.toBeInTheDocument()
    expect(queryByText(feesRow, /Network fee:/)).not.toBeInTheDocument()
    await UserEvent.hover(formattedFee)
    expect(queryByText(feesRow, 'Protocol fee: 0.15 % (min 2.00 BTC)')).toBeInTheDocument()
    expect(queryByText(feesRow, 'Network fee: 1.00 BTC')).toBeInTheDocument()
  })

  it('Should show fees 2', async () => {
    const from = assets.find((_el) => _el.id === 'BTC')
    const to = assets.find((_el) => _el.id === 'PBTC_ON_ETH_MAINNET')
    const { container } = render(
      <SwapInfo from={from} to={to} bpm={{}} fees={{ basisPoints: 15, networkFee: 1e18, minProtocolFee: 0 }}></SwapInfo>
    )
    expect(container.querySelector('div')).toHaveAttribute('show', 'true')
    const feesRow = screen.getByText('Fee').parentElement
    const formattedFee = getByText(feesRow, '0.15 % + 1.00 PBTC')
    expect(formattedFee).toBeInTheDocument()
    expect(queryByText(feesRow, /Protocol fee:/)).not.toBeInTheDocument()
    expect(queryByText(feesRow, /Network fee:/)).not.toBeInTheDocument()
    await UserEvent.hover(formattedFee)
    expect(queryByText(feesRow, 'Protocol fee: 0.15 %')).toBeInTheDocument()
    expect(queryByText(feesRow, 'Network fee: 1.00 BTC')).toBeInTheDocument()
  })

  it('Should show fees 3', async () => {
    const ThemeContextMock = {}
    const from = assets.find((_el) => _el.id === 'BTC')
    const to = assets.find((_el) => _el.id === 'PBTC_ON_ETH_MAINNET')
    const { container } = render(
      <ThemeContext.Provider value={ThemeContextMock}>
        <SwapInfo from={from} to={to} bpm={{}} fees={{ basisPoints: 15, networkFee: 0, minProtocolFee: 0 }}></SwapInfo>
      </ThemeContext.Provider>
    )
    expect(container.querySelector('div')).toHaveAttribute('show', 'true')
    const feesRow = screen.getByText('Fee').parentElement
    const formattedFee = getByText(feesRow, '0.15 %')
    expect(formattedFee).toBeInTheDocument()
    expect(queryByText(feesRow, /Protocol fee:/)).not.toBeInTheDocument()
    expect(queryByText(feesRow, /Network fee:/)).not.toBeInTheDocument()
    await UserEvent.hover(formattedFee)
    expect(queryByText(feesRow, 'Protocol fee: 0.15 %')).toBeInTheDocument()
    expect(queryByText(feesRow, /Network fee:/)).not.toBeInTheDocument()
    const gasLessRow = screen.getByText('Gasless').parentElement
    const gasLessSwitch = queryByRole(gasLessRow, 'switch')
    expect(gasLessSwitch).toHaveAttribute('aria-checked', 'true')
    await UserEvent.hover(gasLessSwitch)
    expect(queryByText(gasLessRow, /are covered by the pNetwork protocol/)).toBeInTheDocument()
  })

  it('Should show fees 4', async () => {
    const ThemeContextMock = {}
    const from = assets.find((_el) => _el.id === 'BTC')
    const to = assets.find((_el) => _el.id === 'PBTC_ON_ETH_MAINNET')
    const { container } = render(
      <ThemeContext.Provider value={ThemeContextMock}>
        <SwapInfo
          from={from}
          to={to}
          bpm={{}}
          fees={{ basisPoints: 15, networkFee: 0, minProtocolFee: 2e18 }}
        ></SwapInfo>
      </ThemeContext.Provider>
    )
    expect(container.querySelector('div')).toHaveAttribute('show', 'true')
    const feesRow = screen.getByText('Fee').parentElement
    const formattedFee = getByText(feesRow, '0.15 % (min 2.00 PBTC)')
    expect(formattedFee).toBeInTheDocument()
    expect(queryByText(feesRow, /Protocol fee:/)).not.toBeInTheDocument()
    expect(queryByText(feesRow, /Network fee:/)).not.toBeInTheDocument()
    await UserEvent.hover(formattedFee)
    expect(queryByText(feesRow, '0.15 % (min 2.00 PBTC)')).toBeInTheDocument()
    expect(queryByText(feesRow, /Network fee:/)).not.toBeInTheDocument()
    const gasLessRow = screen.getByText('Gasless').parentElement
    const gasLessSwitch = queryByRole(gasLessRow, 'switch')
    expect(gasLessSwitch).toHaveAttribute('aria-checked', 'true')
    await UserEvent.hover(gasLessSwitch)
    expect(queryByText(gasLessRow, /are covered by the pNetwork protocol/)).toBeInTheDocument()
  })

  it('Should show default processing time if bpm is missing', async () => {
    const ThemeContextMock = {}
    const from = assets.find((_el) => _el.id === 'BTC')
    const to = assets.find((_el) => _el.id === 'PBTC_ON_ETH_MAINNET')
    const { container } = render(
      <ThemeContext.Provider value={ThemeContextMock}>
        <SwapInfo
          from={from}
          to={to}
          bpm={{}}
          fees={{ basisPoints: 15, networkFee: 0, minProtocolFee: 2e18 }}
        ></SwapInfo>
      </ThemeContext.Provider>
    )
    expect(container.querySelector('div')).toHaveAttribute('show', 'true')
    expect(screen.getByText('Estimated processing time')).toBeInTheDocument()
    expect(screen.getByText('~10 minutes')).toBeInTheDocument()
  })

  it('Should show default processing time if estimated sync time is reasonable', async () => {
    const ThemeContextMock = {}
    const from = assets.find((_el) => _el.id === 'BTC')
    const to = assets.find((_el) => _el.id === 'PBTC_ON_ETH_MAINNET')
    const { container } = render(
      <ThemeContext.Provider value={ThemeContextMock}>
        <SwapInfo
          from={from}
          to={to}
          bpm={{
            'pbtc-on-eth': { bridgeName: 'pbtc-on-eth', nativeChainId: from.chainId, estimatedNativeSyncTime: 10 },
          }}
          fees={{ basisPoints: 15, networkFee: 0, minProtocolFee: 2e18 }}
        ></SwapInfo>
      </ThemeContext.Provider>
    )
    expect(container.querySelector('div')).toHaveAttribute('show', 'true')
    expect(screen.getByText('Estimated processing time')).toBeInTheDocument()
    expect(screen.getByText('~10 minutes')).toBeInTheDocument()
  })

  it('Should show bpm sync time if estimated sync time is high (peg-in)', async () => {
    const ThemeContextMock = {}
    const from = assets.find((_el) => _el.id === 'BTC')
    const to = assets.find((_el) => _el.id === 'PBTC_ON_ETH_MAINNET')
    const { container } = render(
      <ThemeContext.Provider value={ThemeContextMock}>
        <SwapInfo
          from={from}
          to={to}
          bpm={{
            'pbtc-on-eth': { bridgeName: 'pbtc-on-eth', nativeChainId: from.chainId, estimatedNativeSyncTime: 20 },
          }}
          fees={{ basisPoints: 15, networkFee: 0, minProtocolFee: 2e18 }}
        ></SwapInfo>
      </ThemeContext.Provider>
    )
    expect(container.querySelector('div')).toHaveAttribute('show', 'true')
    expect(screen.getByText('Estimated processing time')).toBeInTheDocument()
    expect(screen.getByText('~20 minutes')).toBeInTheDocument()
  })

  it('Should show bpm sync time if estimated sync time is high (peg-out)', async () => {
    const ThemeContextMock = {}
    const from = assets.find((_el) => _el.id === 'PBTC_ON_ETH_MAINNET')
    const to = assets.find((_el) => _el.id === 'BTC')
    const { container } = render(
      <ThemeContext.Provider value={ThemeContextMock}>
        <SwapInfo
          from={from}
          to={to}
          bpm={{ 'pbtc-on-eth': { bridgeName: 'pbtc-on-eth', hostChainId: from.chainId, estimatedHostSyncTime: 11 } }}
          fees={{ basisPoints: 15, networkFee: 0, minProtocolFee: 2e18 }}
        ></SwapInfo>
      </ThemeContext.Provider>
    )
    expect(container.querySelector('div')).toHaveAttribute('show', 'true')
    expect(screen.getByText('Estimated processing time')).toBeInTheDocument()
    expect(screen.getByText('~11 minutes')).toBeInTheDocument()
  })

  it('Should show unknown processing time if estimated time is high', async () => {
    const ThemeContextMock = {}
    const from = assets.find((_el) => _el.id === 'BTC')
    const to = assets.find((_el) => _el.id === 'PBTC_ON_ETH_MAINNET')
    const { container } = render(
      <ThemeContext.Provider value={ThemeContextMock}>
        <SwapInfo
          from={from}
          to={to}
          bpm={{
            'pbtc-on-eth': { bridgeName: 'pbtc-on-eth', nativeChainId: from.chainId, estimatedNativeSyncTime: 46 },
          }}
          fees={{ basisPoints: 15, networkFee: 0, minProtocolFee: 2e18 }}
        ></SwapInfo>
      </ThemeContext.Provider>
    )
    expect(container.querySelector('div')).toHaveAttribute('show', 'true')
    expect(screen.getByText('Estimated processing time')).toBeInTheDocument()
    expect(screen.getByText('Unknown')).toBeInTheDocument()
  })

  it('Should show unknown processing time if estimated time is in error', async () => {
    const ThemeContextMock = {}
    const from = assets.find((_el) => _el.id === 'BTC')
    const to = assets.find((_el) => _el.id === 'PBTC_ON_ETH_MAINNET')
    const { container } = render(
      <ThemeContext.Provider value={ThemeContextMock}>
        <SwapInfo
          from={from}
          to={to}
          bpm={{
            'pbtc-on-eth': { bridgeName: 'pbtc-on-eth', nativeChainId: from.chainId, estimatedNativeSyncTime: -1 },
          }}
          fees={{ basisPoints: 15, networkFee: 0, minProtocolFee: 2e18 }}
        ></SwapInfo>
      </ThemeContext.Provider>
    )
    expect(container.querySelector('div')).toHaveAttribute('show', 'true')
    expect(screen.getByText('Estimated processing time')).toBeInTheDocument()
    expect(screen.getByText('Unknown')).toBeInTheDocument()
  })
})
