import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import NavbarItem from '../molecules/NavbarItems'

const onclick = () => 'Done'

describe('Should render a button with custom text', () => {
  it('should render the passed text', () => {
    const children = 'Item'
    render(<NavbarItem label={children} onclick={onclick}>{children}</NavbarItem> )
    const navbaritem = screen.getByLabelText(`goto-${children}`)
    expect(navbaritem).toHaveTextContent(children)
  })
  it('should call onclick function when clicked', () => {
    const children = 'Click'
    const onclick = vi.fn();
    render(<NavbarItem label={children} onclick={onclick}>Item</NavbarItem> )
    const navbaritem = screen.getByLabelText(`goto-${children}`)
    fireEvent.click(navbaritem)
    expect(onclick).toHaveBeenCalled()
  })
})