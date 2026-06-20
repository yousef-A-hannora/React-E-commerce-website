import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductDetails from './TheProductDetails'
import { renderWithProviders, createMockCartContext } from '../../test/test-utils'

describe('TheProductDetails', () => {
  const defaultProps = {
    id: 1,
    title: 'Test Product',
    category: 'electronics',
    image: 'https://example.com/img.jpg',
  }

  it('renders the product image with alt text', () => {
    renderWithProviders(<ProductDetails {...defaultProps} />)
    const img = screen.getByAltText('Test Product')
    expect(img).toHaveAttribute('src', 'https://example.com/img.jpg')
  })

  it('renders the product title', () => {
    renderWithProviders(<ProductDetails {...defaultProps} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  it('renders the category as a link', () => {
    renderWithProviders(<ProductDetails {...defaultProps} />)
    const link = screen.getByRole('link', { name: 'electronics' })
    expect(link).toHaveAttribute('href', '/categories/electronics')
  })

  it('renders a remove button', () => {
    renderWithProviders(<ProductDetails {...defaultProps} />)
    expect(screen.getByRole('button', { name: 'remove' })).toBeInTheDocument()
  })

  it('calls removeFromCart with the product id when remove is clicked', async () => {
    const removeFromCart = vi.fn()
    const cartContext = createMockCartContext({ removeFromCart })

    renderWithProviders(<ProductDetails {...defaultProps} />, { cartContext })

    await userEvent.click(screen.getByRole('button', { name: 'remove' }))
    expect(removeFromCart).toHaveBeenCalledWith(1)
  })
})
