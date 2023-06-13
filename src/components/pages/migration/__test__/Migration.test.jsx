/* eslint-disable import/first */
import BigNumber from 'bignumber.js'
import UserEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeContext } from 'styled-components'
import * as Icon from '../../../atoms/icon/Icon'
vi.spyOn(Icon, 'default').mockImplementation((props) => <div {...props} data-testid="icon" />)
import * as MigrationInfo from '../../../organisms/migrationInfo/MigrationInfo'
import * as feeUtils from '../../../../utils/fee'
import Migration from '../Migration'
import assets from '../../../../settings/migration-assets'
import { getDefaultSelection } from '../../../../store/migration/utils/default-selection'
import { useCallback, useState } from 'react'
import { ETHPNT_ON_ETH_MAINNET, PNT_ON_ETH_MAINNET } from '../../../../constants'

const Wrapper = ({ strategy, connectWithWallet, migrate, assets }) => {
  const ThemeContextMock = {}
  const [button, setButton] = useState({})
  const [wallets] = useState({ eth: { account: 'account' }, bsc: {} })
  const updateMigrateButton = useCallback((_text, _disabled = false) => {
    setButton({ text: _text, disabled: _disabled })
  }, [])
  let defaultSelection = []
  if (strategy) {
    defaultSelection = getDefaultSelection(assets, { strategy })
  }
  return (
    <ThemeContext.Provider value={ThemeContextMock}>
      <Migration
        assets={[...assets, ...defaultSelection]}
        progress={{}}
        depositAddressModal={{}}
        updateMigrateButton={updateMigrateButton}
        bpm={{}}
        wallets={wallets}
        swappersBalances={{}}
        migrateButton={button}
        connectWithWallet={connectWithWallet}
        migrate={migrate}
      />
    </ThemeContext.Provider>
  )
}

describe('Migration', async () => {
  it('Should update "to" amount correctly and call migrate', async () => {
    vi.mock('../../../../utils/history', () => ({ default: { location: { pathname: '#/migration/ethPNT-to-PNT' } } }))
    vi.spyOn(MigrationInfo, 'default').mockImplementation(() => <div data-testid="swap-info" />)
    vi.spyOn(feeUtils, 'getSwapFees').mockResolvedValue({ basisPoints: 15, networkFee: 1e18, minProtocolFee: 2e18 })
    const migrateSpy = vi.fn()
    assets.find((_el) => _el.id === ETHPNT_ON_ETH_MAINNET).balance = BigNumber(15000e18)
    assets.find((_el) => _el.id === PNT_ON_ETH_MAINNET).balance = BigNumber(0)
    render(<Wrapper strategy="ethPNT-to-PNT" migrate={migrateSpy} assets={assets} />)
    const [maxButton, swapButton] = screen.getAllByRole('button')
    expect(swapButton).toHaveTextContent('Enter an amount')
    const [fromInput, toInput] = screen.getAllByRole('textbox')
    await UserEvent.type(fromInput, '1')
    expect(swapButton).toHaveTextContent('Migrate')
    expect(fromInput).toHaveAttribute('value', '1')
    expect(toInput).toHaveAttribute('value', '0.9975')
    await UserEvent.type(fromInput, '0')
    expect(fromInput).toHaveAttribute('value', '10')
    expect(toInput).toHaveAttribute('value', '9.975')
    await UserEvent.click(maxButton)
    expect(toInput).toHaveAttribute('value', '14,962.5')
    expect(swapButton).toHaveTextContent('Migrate')
    await UserEvent.click(swapButton)
    expect(migrateSpy).toHaveBeenCalledTimes(1)
    expect(migrateSpy).toHaveBeenNthCalledWith(
      1,
      'ethPNT-to-PNT',
      '15000',
      expect.objectContaining({ address: '0xf4eA6B892853413bD9d9f1a5D3a620A0ba39c5b2' }),
      expect.objectContaining({ address: '0x89ab32156e46f46d02ade3fecbe5fc4243b9aaed' })
    )
  })
})
