import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import Navbar from '../organisms/Navbar'

vi.mock('react-router-dom')

describe('All menu items are rendered', () => {
  it('should have all menu items', () => {
    render(<Navbar />)
    const navbar = screen.getByRole('navbar')
    expect(navbar).toHaveTextContent('Swap')
    expect(navbar).toHaveTextContent('Risks')
  });

});