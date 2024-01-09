import { render, screen } from '@testing-library/react'
import { describe, expect, it } from "vitest"

import App from '../App';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    const navbarSwapLink = screen.getByText('A')
    expect(navbarSwapLink).toBeInTheDocument()
  });
});