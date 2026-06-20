import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import OrderSummary from './OrderSummary'

describe('OrderSummary', () => {
  const cities = [
    { city: 'cairo', cost: 20 },
    { city: 'Alex', cost: 35 },
  ]

  it('renders the "Order Summary" heading', () => {
    render(<OrderSummary Total={100} cities={cities} />)
    expect(screen.getByRole('heading', { name: 'Order Summary' })).toBeInTheDocument()
  })

  it('displays the total amount', () => {
    render(<OrderSummary Total={150} cities={cities} />)
    const totals = screen.getAllByText('150 Total')
    expect(totals.length).toBeGreaterThanOrEqual(1)
  })

  it('renders shipping city options in datalist', () => {
    const { container } = render(<OrderSummary Total={100} cities={cities} />)
    const options = container.querySelectorAll('datalist option')
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveAttribute('value', 'cairo - 20')
    expect(options[1]).toHaveAttribute('value', 'Alex - 35')
  })

  it('renders the Shipping label', () => {
    render(<OrderSummary Total={100} cities={cities} />)
    expect(screen.getByText('Shipping')).toBeInTheDocument()
  })

  it('renders a CHECKOUT button', () => {
    render(<OrderSummary Total={100} cities={cities} />)
    expect(screen.getByRole('button', { name: 'CHECKOUT' })).toBeInTheDocument()
  })

  it('includes the CoponCOmponent', () => {
    render(<OrderSummary Total={100} cities={cities} />)
    expect(screen.getByText('Promo Code')).toBeInTheDocument()
  })

  it('handles empty cities array', () => {
    const { container } = render(<OrderSummary Total={50} cities={[]} />)
    expect(container.querySelectorAll('datalist option')).toHaveLength(0)
  })
})
