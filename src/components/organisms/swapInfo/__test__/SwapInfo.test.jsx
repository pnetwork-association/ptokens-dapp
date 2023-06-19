import React from 'react'
import { ThemeContext } from 'styled-components'
import UserEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { render, screen, getByRole, getByText } from '@testing-library/react'
import SwapInfo from '../SwapInfo'
import assets from '../../../../settings/swap-assets'
import ReactTooltip from 'react-tooltip'
import { PTokenId, TokenId } from '../../../../constants'

describe('SwapInfo', () => {
  it('Should not show if from is missing', async () => {
    const { container } = render(<SwapInfo to={assets[1]}></SwapInfo>)
    expect(container.querySelector('div')).toHaveAttribute('show', 'false')
  })

  it('Should not show if to is missing', async () => {
    const { container } = render(<SwapInfo from={assets[0]}></SwapInfo>)
    expect(container.querySelector('div')).toHaveAttribute('show', 'false')
  })

  it('Should show skeletons if fees are not loaded', async () => {
    const from = assets.find((_el) => _el.id === PTokenId.PBTC_ON_ETH_MAINNET)
    const to = assets.find((_el) => _el.id === TokenId.BTC)
    const { container } = render(<SwapInfo from={from} to={to} bpm={{}}></SwapInfo>)
    expect(container.querySelector('div')).toHaveAttribute('show', 'true')
    const feesRow = screen.getByText('Fees').parentElement
    let arrow = container.querySelector('#Capa_1')
    await UserEvent.click(arrow)
    const protocolFeeRow = screen.getByText('Protocol Fee').parentElement.parentElement
    expect(getByRole(feesRow, 'generic', { busy: true, live: 'polite' })).toBeInTheDocument()
    expect(getByRole(protocolFeeRow, 'generic', { busy: true, live: 'polite' })).toBeInTheDocument()
  })

  it('Should show fees structure if there is no specified amount (with network fee)', async () => {
    const from = assets.find((_el) => _el.id === TokenId.BTC)
    const to = assets.find((_el) => _el.id === PTokenId.PBTC_ON_ETH_MAINNET)
    const { container } = render(
      <React.Fragment>
        <SwapInfo
          from={from}
          to={to}
          bpm={{}}
          fees={{ basisPoints: 15, networkFee: 1e18, minProtocolFee: 0 }}
          amount={''}
        ></SwapInfo>
        <ReactTooltip id="tooltip-fees" multiline={true} />
      </React.Fragment>
    )
    const feesRow = screen.getByText('Fees').parentElement
    const formattedFee = getByText(feesRow, '0.15 % + 1.00 PBTC')
    expect(formattedFee).toBeInTheDocument()
    expect(screen.queryByText('Protocol Fee')).not.toBeInTheDocument()
    expect(screen.queryByText('Network Fee')).not.toBeInTheDocument()
    let arrow = container.querySelector('#Capa_1')
    await UserEvent.click(arrow)
    const protocolFeeLabel = screen.getByText('Protocol Fee')
    const networkFeeLabel = screen.getByText('Network Fee')
    screen.findByText('0.15 %')
    screen.findByText('1.00 PBTC')
    await UserEvent.hover(protocolFeeLabel)
    await screen.findByText(
      '"Protocol Fee" is designed to reward the pNetwork nodes for operating and securing the pNetwork bridges.'
    )
    await UserEvent.hover(networkFeeLabel)
    await screen.findByText(
      '"Network Fee" covers the computing resources required to execute transactions on the chain (also known as Gas Fee).'
    )
    arrow = container.querySelector('#Layer_1')
    await UserEvent.click(arrow)
    expect(screen.queryByText('Protocol Fee')).not.toBeInTheDocument()
    expect(screen.queryByText('Network Fee')).not.toBeInTheDocument()
    expect(screen.queryByText('0.15 % (min 2.00 PBTC)')).not.toBeInTheDocument()
    expect(screen.queryByText('1.00 PBTC')).not.toBeInTheDocument()
  })

  it('Should show fees structure if there is no specified amount (without network fee)', async () => {
    const ThemeContextMock = {}
    const from = assets.find((_el) => _el.id === TokenId.BTC)
    const to = assets.find((_el) => _el.id === PTokenId.PBTC_ON_ETH_MAINNET)
    const { container } = render(
      <ThemeContext.Provider value={ThemeContextMock}>
        <SwapInfo
          from={from}
          to={to}
          bpm={{}}
          fees={{ basisPoints: 15, networkFee: 0, minProtocolFee: 0 }}
          amount={''}
        ></SwapInfo>
        <ReactTooltip id="tooltip-fees" multiline={true} />
      </ThemeContext.Provider>
    )
    const feesRow = screen.getByText('Fees').parentElement
    const formattedFee = getByText(feesRow, '0.15 %')
    expect(formattedFee).toBeInTheDocument()
    expect(screen.queryByText('Protocol Fee')).not.toBeInTheDocument()
    expect(screen.queryByText('Network Fee')).not.toBeInTheDocument()
    let arrow = container.querySelector('#Capa_1')
    await UserEvent.click(arrow)
    const protocolFeeLabel = screen.getByText('Protocol Fee')
    expect(screen.queryByText('Network Fee')).not.toBeInTheDocument()
    screen.findByText('0.15 %')
    screen.findByText('1.00 PBTC')
    await UserEvent.hover(protocolFeeLabel)
    await screen.findByText(
      '"Protocol Fee" is designed to reward the pNetwork nodes for operating and securing the pNetwork bridges.'
    )
    arrow = container.querySelector('#Layer_1')
    await UserEvent.click(arrow)
    expect(screen.queryByText('Protocol Fee')).not.toBeInTheDocument()
    expect(screen.queryByText('Network Fee')).not.toBeInTheDocument()
    expect(screen.queryByText('0.15 % (min 2.00 PBTC)')).not.toBeInTheDocument()
    expect(screen.queryByText('1.00 PBTC')).not.toBeInTheDocument()
  })

  it('Should show computed fees if there is an amount specified', async () => {
    const from = assets.find((_el) => _el.id === TokenId.BTC)
    const to = assets.find((_el) => _el.id === PTokenId.PBTC_ON_ETH_MAINNET)
    const { container } = render(
      <React.Fragment>
        <SwapInfo
          from={from}
          to={to}
          bpm={{}}
          fees={{ basisPoints: 15, networkFee: 1e18, minProtocolFee: 0 }}
          amount={'10'}
        ></SwapInfo>
        <ReactTooltip id="tooltip-fees" multiline={true} />
      </React.Fragment>
    )
    const feesRow = screen.getByText('Fees').parentElement
    const formattedFee = getByText(feesRow, '~1.02 PBTC')
    expect(formattedFee).toBeInTheDocument()
    expect(screen.queryByText('Protocol Fee')).not.toBeInTheDocument()
    expect(screen.queryByText('Network Fee')).not.toBeInTheDocument()
    let arrow = container.querySelector('#Capa_1')
    await UserEvent.click(arrow)
    const protocolFeeLabel = screen.getByText('Protocol Fee')
    const networkFeeLabel = screen.getByText('Network Fee')
    screen.findByText('0.0150 PBTC (=0.15%)')
    screen.findByText('1.00 PBTC')
    await UserEvent.hover(protocolFeeLabel)
    await screen.findByText(
      '"Protocol Fee" is designed to reward the pNetwork nodes for operating and securing the pNetwork bridges.'
    )
    await UserEvent.hover(networkFeeLabel)
    await screen.findByText(
      '"Network Fee" covers the computing resources required to execute transactions on the chain (also known as Gas Fee).'
    )
    arrow = container.querySelector('#Layer_1')
    await UserEvent.click(arrow)
    expect(screen.queryByText('Protocol Fee')).not.toBeInTheDocument()
    expect(screen.queryByText('Network Fee')).not.toBeInTheDocument()
    expect(screen.queryByText('0.0150 PBTC (=0.15%)')).not.toBeInTheDocument()
    expect(screen.queryByText('1.00 PBTC')).not.toBeInTheDocument()
  })

  it('Should show gasless switch', async () => {
    const ThemeContextMock = {}
    const from = assets.find((_el) => _el.id === TokenId.BTC)
    const to = assets.find((_el) => _el.id === PTokenId.PBTC_ON_ETH_MAINNET)
    const { container } = render(
      <ThemeContext.Provider value={ThemeContextMock}>
        <SwapInfo from={from} to={to} bpm={{}} fees={{ basisPoints: 15, networkFee: 0, minProtocolFee: 0 }}></SwapInfo>
        <ReactTooltip id="tooltip-gasless" multiline={true} />
      </ThemeContext.Provider>
    )
    expect(container.querySelector('div')).toHaveAttribute('show', 'true')
    const feesRow = screen.getByText('Fees').parentElement
    const formattedFee = getByText(feesRow, '0.15 %')
    expect(formattedFee).toBeInTheDocument()
    await UserEvent.hover(formattedFee)
    const gasLessSwitch = screen.queryByRole('switch')
    await UserEvent.hover(gasLessSwitch)
    expect(screen.queryByText(/are covered by the pNetwork protocol/)).toBeInTheDocument()
  })

  it('Should show default processing time if bpm is missing', async () => {
    const ThemeContextMock = {}
    const from = assets.find((_el) => _el.id === TokenId.BTC)
    const to = assets.find((_el) => _el.id === PTokenId.PBTC_ON_ETH_MAINNET)
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
    const from = assets.find((_el) => _el.id === TokenId.BTC)
    const to = assets.find((_el) => _el.id === PTokenId.PBTC_ON_ETH_MAINNET)
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
    const from = assets.find((_el) => _el.id === TokenId.BTC)
    const to = assets.find((_el) => _el.id === PTokenId.PBTC_ON_ETH_MAINNET)
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
    const from = assets.find((_el) => _el.id === PTokenId.PBTC_ON_ETH_MAINNET)
    const to = assets.find((_el) => _el.id === TokenId.BTC)
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
    const from = assets.find((_el) => _el.id === TokenId.BTC)
    const to = assets.find((_el) => _el.id === PTokenId.PBTC_ON_ETH_MAINNET)
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
    const from = assets.find((_el) => _el.id === TokenId.BTC)
    const to = assets.find((_el) => _el.id === PTokenId.PBTC_ON_ETH_MAINNET)
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
