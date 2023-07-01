import { waitFor, render, screen, getByText } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import { useCallback, useState } from 'react'
import { ThemeContext } from 'styled-components'
import { describe, expect, it, vi } from 'vitest'

import swapAssets from '../../../../settings/swap-assets'
import { getDefaultSelection } from '../../../../store/swap/utils/default-selection'
import * as feeUtils from '../../../../utils/fee'
import * as AssetListModal from '../../../organisms/assetListModal/AssetListModal'
import * as SwapInfo from '../../../organisms/swapInfo/SwapInfo'
import Swap from '../Swap'

const Wrapper = ({ asset, originBlockchain, destBlockchain }) => {
  const ThemeContextMock = {}
  const [button, setButton] = useState({})
  const [wallets] = useState({ eth: {}, bsc: {} })
  const updateSwapButton = useCallback((_text, _disabled = false) => {
    setButton({ text: _text, disabled: _disabled })
  }, [])
  const v2selection = {}
  if (asset && originBlockchain && destBlockchain) {
    v2selection.asset = asset
    v2selection.from = originBlockchain
    v2selection.to = destBlockchain
  }
  const [assets] = useState([...swapAssets, ...getDefaultSelection(swapAssets, v2selection)])
  return (
    <ThemeContext.Provider value={ThemeContextMock}>
      <Swap
        assets={assets}
        migrationAssets={[]}
        progress={{}}
        depositAddressModal={{}}
        updateSwapButton={updateSwapButton}
        bpm={{}}
        wallets={wallets}
        swapButton={button}
      />
    </ThemeContext.Provider>
  )
}

describe('Swap', async () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.mock('../../../atoms/icon/Icon')
  })

  it('Should update "to" amount correctly', async () => {
    vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
    vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
    render(<Wrapper />)
    await waitFor(() => expect(screen.getByText(/Enter an address/)).toBeInTheDocument())
    const [, swapButton] = screen.getAllByRole('button')
    const [fromInput, toInput, addressInput] = screen.getAllByRole('textbox')
    await UserEvent.type(fromInput, '1')
    expect(fromInput).toHaveAttribute('value', '1')
    expect(toInput).toHaveAttribute('value', '-2')
    expect(swapButton).toHaveTextContent('Amount too low')
    await UserEvent.type(fromInput, '0')
    expect(fromInput).toHaveAttribute('value', '10')
    expect(toInput).toHaveAttribute('value', '7')
    expect(swapButton).toHaveTextContent('Enter an address')
    await UserEvent.type(addressInput, 'tttt')
    expect(swapButton).toHaveTextContent('Invalid Address')
    await UserEvent.clear(addressInput)
    await UserEvent.type(addressInput, '0xA8Ae3c4cF1c92ADFf13e33b35280fc59b6600cA3')
    expect(swapButton).toHaveTextContent('Get Deposit Address')
  })

  it('Should change swap order %s', async (_) => {
    vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
    vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
    render(<Wrapper />)
    await waitFor(() => expect(screen.getByText(/Enter an address/)).toBeInTheDocument())
    let img1, img2, img3
    ;[, img1, , img2, img3] = screen.getAllByRole('img')
    expect(img1).toHaveAttribute('src', './assets/svg/BTC.svg')
    expect(img2).toHaveAttribute('src', './assets/svg/pBTC.svg')
    expect(img3).toHaveAttribute('src', './assets/svg/ETH.svg')
    const changeOrderButton = screen.getByTestId('icon-sort')
    await UserEvent.click(changeOrderButton)
    ;[, img1, img2, , , img3] = screen.getAllByRole('img')
    expect(img1).toHaveAttribute('src', './assets/svg/pBTC.svg')
    expect(img2).toHaveAttribute('src', './assets/svg/ETH.svg')
    expect(img3).toHaveAttribute('src', './assets/svg/BTC.svg')
  })

  it('Should update "to" amount correctly', async () => {
    vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
    vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
    render(<Wrapper />)
    await waitFor(() => expect(screen.getByText(/Enter an address/)).toBeInTheDocument())
    const [, swapButton] = screen.getAllByRole('button')
    const [, , addressInput] = screen.getAllByRole('textbox')
    await UserEvent.type(addressInput, '0xA8Ae3c4cF1c92ADFf13e33b35280fc59b6600cA3')
    expect(swapButton).toHaveTextContent('Get Deposit Address')
  })

  it('Should permit to select NATIVE TLOS only when pegging-out pTLOS on Ethereum', async () => {
    vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
    vi.spyOn(AssetListModal, 'default').mockImplementation(
      ({ show: showModal, title, onClose, onSelect, assets: _assets, defaultAssets }) => (
        <div data-testid="asset-list-modal">
          {`show="${showModal.toString()}"`}
          <br />
          {`title="${title}"`}
          <br />
          {`assets="${JSON.stringify(_assets.map((_asset) => _asset.id))}"`}
        </div>
      )
    )
    vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
    render(<Wrapper asset="tlos" originBlockchain="eth" destBlockchain="telos" />)
    await waitFor(() => expect(screen.getByText(/Enter an amount/)).toBeInTheDocument())
    const [, , , , , img1] = screen.getAllByRole('img')
    const assetListModals = screen.getAllByTestId('asset-list-modal')
    expect(getByText(assetListModals[0], /show="false"/)).toBeInTheDocument()
    expect(getByText(assetListModals[1], /show="false"/)).toBeInTheDocument()
    await UserEvent.click(img1)
    expect(getByText(assetListModals[0], /show="false"/)).toBeInTheDocument()
    expect(getByText(assetListModals[1], /show="true"/)).toBeInTheDocument()
    expect(getByText(assetListModals[1], /title="Swap to \.\.\."/)).toBeInTheDocument()
    expect(getByText(assetListModals[1], /assets=["TLOS","TLOS"]/)).toBeInTheDocument()
  })

  it('Should permit to select NATIVE TLOS and pTLOS on Ethereum when pegging-out pTLOS on BSC', async () => {
    vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
    vi.spyOn(AssetListModal, 'default').mockImplementation(
      ({ show: showModal, title, onClose, onSelect, assets: _assets, defaultAssets }) => (
        <div data-testid="asset-list-modal">
          {`show="${showModal.toString()}"`}
          <br />
          {`title="${title}"`}
          <br />
          {`assets="${JSON.stringify(_assets.map((_asset) => _asset.id))}"`}
        </div>
      )
    )
    vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
    render(<Wrapper asset="tlos" originBlockchain="bsc" destBlockchain="telos" />)
    await waitFor(() => expect(screen.getByText(/Enter an amount/)).toBeInTheDocument())
    const [, , , , , img1] = screen.getAllByRole('img')
    const assetListModals = screen.getAllByTestId('asset-list-modal')
    expect(getByText(assetListModals[0], /show="false"/)).toBeInTheDocument()
    expect(getByText(assetListModals[1], /show="false"/)).toBeInTheDocument()
    await UserEvent.click(img1)
    expect(getByText(assetListModals[0], /show="false"/)).toBeInTheDocument()
    expect(getByText(assetListModals[1], /show="true"/)).toBeInTheDocument()
    expect(getByText(assetListModals[1], /title="Swap to \.\.\."/)).toBeInTheDocument()
    expect(getByText(assetListModals[1], /assets=["TLOS_ON_ETH_MAINNET","TLOS","TLOS"]/)).toBeInTheDocument()
  })

  it('Should permit to pegout to tEVM when pegging-out pTLOS on BSC', async () => {
    vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
    vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
    render(<Wrapper asset="tlos" originBlockchain="bsc" destBlockchain="telos" />)
    await waitFor(() => expect(screen.getByText(/Enter an amount/)).toBeInTheDocument())
    expect(screen.getByText('Receive on a tEVM (Telos EVM) compatible address')).toBeInTheDocument()
  })

  it('Should permit to pegout to tEVM when pegging-out pTLOS on ETH', async () => {
    vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
    vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
    render(<Wrapper asset="tlos" originBlockchain="eth" destBlockchain="telos" />)
    await waitFor(() => expect(screen.getByText(/Enter an amount/)).toBeInTheDocument())
    expect(screen.getByText('Receive on a tEVM (Telos EVM) compatible address')).toBeInTheDocument()
  })

  it('Should show deposit address warning when pegging-in pLTC on Ethereum', async () => {
    vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
    vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
    render(<Wrapper asset="ltc" originBlockchain="ltc" destBlockchain="eth" />)
    await waitFor(() => expect(screen.getByText(/Enter an address/)).toBeInTheDocument())
    expect(
      screen.getByText(
        'Please refrain from using previously generated deposit addresses, as doing so may result in a loss of funds.'
      )
    ).toBeInTheDocument()
  })
})
