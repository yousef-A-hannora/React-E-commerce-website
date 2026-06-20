import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CartTop from './CartTop'

describe('CartTop', () => {
  it('renders the "Shopping cart" heading', () => {
    render(<CartTop itemsCount={3} />)
    expect(screen.getByRole('heading', { name: 'Shopping cart' })).toBeInTheDocument()
  })

  it('displays the correct items count', () => {
    render(<CartTop itemsCount={5} />)
    expect(screen.getByText('5 Items')).toBeInTheDocument()
  })

  it('displays 0 items when count is zero', () => {
    render(<CartTop itemsCount={0} />)
    expect(screen.getByText('0 Items')).toBeInTheDocument()
  })

  it('renders a horizontal rule separator', () => {
    const { container } = render(<CartTop itemsCount={1} />)
    expect(container.querySelector('hr')).toBeInTheDocument()
  })
})
