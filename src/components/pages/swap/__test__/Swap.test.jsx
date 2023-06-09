/* eslint-disable import/first */
import UserEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { waitFor, render, screen } from '@testing-library/react'
import * as Icon from '../../../atoms/icon/Icon'
vi.spyOn(Icon, 'default').mockImplementation((props) => <div {...props} data-testid="icon" />)
import * as SwapInfo from '../../../organisms/swapInfo/SwapInfo'
import * as feeUtils from '../../../../utils/fee'
import Swap from '../Swap'
import assets from '../../../../settings/swap-assets'
import { getDefaultSelection } from '../../../../store/swap/utils/default-selection'
import { useCallback, useState } from 'react'

const Wrapper = ({ asset, originBlockchain, destBlockchain }) => {
  const [button, setButton] = useState({})
  const [wallets] = useState({})
  const updateSwapButton = useCallback((_text, _disabled = false) => {
    setButton({ text: _text, disabled: _disabled })
  }, [])
  const v2selection = {}
  if (asset && originBlockchain && destBlockchain) {
    v2selection.asset = asset
    v2selection.from = originBlockchain
    v2selection.to = destBlockchain
  }
  return (
    <Swap
      assets={[...assets, ...getDefaultSelection(assets, v2selection)]}
      migrationAssets={[]}
      progress={{}}
      depositAddressModal={{}}
      updateSwapButton={updateSwapButton}
      bpm={{}}
      wallets={wallets}
      swappersBalances={{}}
      swapButton={button}
    />
  )
}

describe('Swap', async () => {
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
    ;[img1, img2, img3] = screen.getAllByRole('img')
    expect(img1).toHaveAttribute('src', './assets/svg/BTC.svg')
    expect(img2).toHaveAttribute('src', './assets/svg/pBTC.svg')
    expect(img3).toHaveAttribute('src', './assets/svg/ETH.svg')
    const [, changeOrderButton] = screen.getAllByTestId('icon')
    await UserEvent.click(changeOrderButton)
    ;[img1, img2, img3] = screen.getAllByRole('img')
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
})
