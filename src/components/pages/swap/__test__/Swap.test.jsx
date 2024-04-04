/* eslint-disable import/first */
import { waitFor, render, screen, getByText } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import BigNumber from 'bignumber.js'
import { useCallback, useState } from 'react'
import { ThemeContext } from 'styled-components'
import { describe, expect, it, vi } from 'vitest'

import { PBTC_ON_ETH_MAINNET, PNT_ON_BSC_MAINNET, PNT_ON_ETH_MAINNET } from '../../../../constants'
import * as UseSwapInfo from '../../../../hooks/use-swap-info'
import swapAssets from '../../../../settings/swap-assets'
import { getDefaultSelection } from '../../../../store/swap/utils/default-selection'
import * as feeUtils from '../../../../utils/fee'
import * as AssetListModal from '../../../organisms/assetListModal/AssetListModal'
import * as SwapInfo from '../../../organisms/swapInfo/SwapInfo'
import Swap from '../Swap'

const Wrapper = ({ asset, originBlockchain, destBlockchain, algorand_from_assetid, algorand_to_assetid }) => {
  const ThemeContextMock = {}
  const [button, setButton] = useState({})
  const [wallets] = useState({ eth: {}, bsc: {}, algorand: {} })
  const updateSwapButton = useCallback((_text, _disabled = false) => {
    setButton({ text: _text, disabled: _disabled })
  }, [])
  const v2selection = {}
  if (asset && originBlockchain && destBlockchain) {
    v2selection.asset = asset
    v2selection.from = originBlockchain
    v2selection.to = destBlockchain
    v2selection.algorand_from_assetid = algorand_from_assetid
    v2selection.algorand_to_assetid = algorand_to_assetid
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
        swappersBalances={{}}
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

  it('Should set amount correctly', async () => {
    vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
    const computeSwap = vi.spyOn(feeUtils, 'computeSwapAmount')
    render(<Wrapper />)
    await waitFor(() => expect(screen.getByText(/Enter an address/)).toBeInTheDocument())
    const [fromInput, toInput] = screen.getAllByRole('textbox')
    await UserEvent.type(fromInput, '1')
    expect(computeSwap).toBeCalledTimes(1)
    await UserEvent.type(toInput, '1')
    expect(computeSwap).toBeCalledTimes(2)
  })

  it('Should prevent swap if balance is 0', async () => {
    vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
    vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
    swapAssets.find((_el) => _el.id === PNT_ON_ETH_MAINNET).balance = BigNumber(0)
    swapAssets.find((_el) => _el.id === PNT_ON_BSC_MAINNET).balance = BigNumber(0)
    render(<Wrapper asset="pnt" originBlockchain="eth" destBlockchain="bsc" />)
    await waitFor(() => expect(screen.getByText(/balance is 0/)).toBeInTheDocument())
    const [, , swapButton] = screen.getAllByRole('button')
    const [fromInput, toInput] = screen.getAllByRole('textbox')
    await UserEvent.type(fromInput, '1')
    expect(fromInput).toHaveAttribute('value', '1')
    expect(toInput).toHaveAttribute('value', '-2')
    expect(swapButton).toHaveTextContent(
      `${swapAssets.find((_el) => _el.id === PNT_ON_ETH_MAINNET).symbol} balance is 0`
    )
    expect(swapButton).toBeDisabled()
  })

  it('Should continue and warn USDT swap from Algorand if pool is not reachable', async () => {
    vi.spyOn(UseSwapInfo, 'useSwapInfo').mockReturnValue({ eta: '1', poolAmount: undefined })
    vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
    vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
    render(<Wrapper asset="usdt" originBlockchain="algorand" destBlockchain="eth" algorand_from_assetid={'312769'} />)
    await waitFor(() => expect(screen.getByText(/Enter an amount/)).toBeInTheDocument())
    const [swapButton] = screen.getAllByRole('button')
    const [fromInput, toInput] = screen.getAllByRole('textbox')
    await UserEvent.type(fromInput, '10')
    expect(fromInput).toHaveAttribute('value', '10')
    expect(toInput).toHaveAttribute('value', '7')
    expect(swapButton).toHaveTextContent('Connect Wallet')
    expect(screen.getByText(/the transaction will likely fail/)).toBeInTheDocument()
    expect(swapButton).toBeEnabled()
  })

  test.each(['0', '1000'])(
    'Should prevent and warn USDT swap from Algorand if pool liquidity is insufficient',
    async (poolAmount) => {
      vi.spyOn(UseSwapInfo, 'useSwapInfo').mockReturnValue({ eta: '1', poolAmount: poolAmount })
      vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
      vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
      render(<Wrapper asset="usdt" originBlockchain="algorand" destBlockchain="eth" algorand_from_assetid={'312769'} />)
      await waitFor(() => expect(screen.getByText(/Enter an amount/)).toBeInTheDocument())
      const [swapButton] = screen.getAllByRole('button')
      const [fromInput, toInput] = screen.getAllByRole('textbox')
      await UserEvent.type(fromInput, '10000')
      expect(fromInput).toHaveAttribute('value', '10,000')
      expect(toInput).toHaveAttribute('value', '9,984')
      expect(swapButton).toHaveTextContent('Insufficient liquidity')
      expect(screen.getByText(/There is not enough liquidity in the stableswap/)).toBeInTheDocument()
      expect(swapButton).toBeDisabled()
    }
  )

  it('Should continue and warn USDT swap to Algorand if pool is not reachable', async () => {
    vi.spyOn(UseSwapInfo, 'useSwapInfo').mockReturnValue({ eta: '1', poolAmount: undefined })
    vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
    vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
    render(<Wrapper asset="usdt" originBlockchain="eth" destBlockchain="algorand" algorand_to_assetid={'312769'} />)
    await waitFor(() => expect(screen.getByText(/Enter an amount/)).toBeInTheDocument())
    const [swapButton] = screen.getAllByRole('button')
    const [fromInput, toInput] = screen.getAllByRole('textbox')
    await UserEvent.type(fromInput, '100')
    expect(fromInput).toHaveAttribute('value', '100')
    expect(toInput).toHaveAttribute('value', '97')
    expect(swapButton).toHaveTextContent('Connect Wallet')
    expect(screen.getByText(/you will likely receive pUSDT rather than native USDT/)).toBeInTheDocument()
    expect(swapButton).toBeEnabled()
  })

  test.each(['0', '1000'])(
    'Should continue and warn USDT swap to Algorand if pool liquidity is insufficient',
    async (poolAmount) => {
      vi.spyOn(UseSwapInfo, 'useSwapInfo').mockReturnValue({ eta: '1', poolAmount: poolAmount })
      vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
      vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
      render(<Wrapper asset="usdt" originBlockchain="eth" destBlockchain="algorand" algorand_to_assetid={'312769'} />)
      await waitFor(() => expect(screen.getByText(/Enter an amount/)).toBeInTheDocument())
      const [swapButton] = screen.getAllByRole('button')
      const [fromInput, toInput] = screen.getAllByRole('textbox')
      await UserEvent.type(fromInput, '10000')
      expect(fromInput).toHaveAttribute('value', '10,000')
      expect(toInput).toHaveAttribute('value', '9,984')
      expect(swapButton).toHaveTextContent('Connect Wallet')
      expect(
        screen.getByText(/Due to insufficient liquidity it may not be possible to process a swap of this size/)
      ).toBeInTheDocument()
      expect(swapButton).toBeEnabled()
    }
  )

  it('Should continue with balance null', async () => {
    vi.spyOn(SwapInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
    vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
    swapAssets.find((_el) => _el.id === 'BTC').balance = null
    swapAssets.find((_el) => _el.id === PBTC_ON_ETH_MAINNET).balance = BigNumber(0)
    render(<Wrapper asset="btc" originBlockchain="btc" destBlockchain="eth" />)
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
    ;[img1, , img2, img3] = screen.getAllByRole('img')
    expect(img1).toHaveAttribute('src', './assets/svg/BTC.svg')
    expect(img2).toHaveAttribute('src', './assets/svg/pBTC.svg')
    expect(img3).toHaveAttribute('src', './assets/svg/ETH.svg')
    const changeOrderButton = screen.getByTestId('icon-sort')
    await UserEvent.click(changeOrderButton)
    ;[img1, img2, , , img3] = screen.getAllByRole('img')
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
