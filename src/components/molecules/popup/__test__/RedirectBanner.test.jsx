/* eslint-disable import/first */
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import RedirectBanner from '../RedirectBanner'

const expectedText = 'You are using an old domain that will be dismissed in the future.'

describe('RedirectBanner', async () => {
  test.each([
    ['http://ptokens.io'],
    ['http://dapp.ptokens.io'],
    ['https://dapp.ptokens.io/#/swap?asset=btc&from=btc&to=eth'],
  ])('Should show the url popup only on specific url', async (url) => {
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    })
    render(<RedirectBanner />)
    const textElement = screen.getByText((content) => content.includes(expectedText))
    expect(textElement).toBeInTheDocument()
  })

  test.each([
    ['http://p.network/'],
    ['https://dapp.p.network'],
    ['https://dapp.p.network/#/swap?asset=btc&from=btc&to=eth'],
    ['http://pnetwork.eth'],
    ['https://dapp.pnetwork.eth.limo/'],
    ['ipns://dapp.pnetwork.eth'],
    ['https://dapp.pnetwork.eth.limo/#/swap?asset=btc&from=btc&to=eth'],
  ])('Should show the url popup only on specific url', async (url) => {
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    })
    const { container } = render(<RedirectBanner />)
    expect(container.firstChild).toBeNull()
  })
})
