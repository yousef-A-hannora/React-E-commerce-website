import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from './productCard'
import { renderWithProviders, createMockCartContext } from '../../test/test-utils'

describe('ProductCard', () => {
  const defaultProps = {
    image: 'https://example.com/product.jpg',
    id: 1,
    title: 'Test Product',
    desc: 'A great product',
    price: 29.99,
    rate: 4.5,
  }

  it('renders the product title', () => {
    renderWithProviders(<ProductCard {...defaultProps} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  it('renders the product description', () => {
    renderWithProviders(<ProductCard {...defaultProps} />)
    expect(screen.getByText('A great product')).toBeInTheDocument()
  })

  it('displays the formatted price', () => {
    renderWithProviders(<ProductCard {...defaultProps} />)
    expect(screen.getByText('$29.99')).toBeInTheDocument()
  })

  it('displays the rating value', () => {
    renderWithProviders(<ProductCard {...defaultProps} />)
    expect(screen.getByText('4.5')).toBeInTheDocument()
  })

  it('renders star emojis based on rating', () => {
    const { container } = renderWithProviders(<ProductCard {...defaultProps} />)
    const ratingDiv = container.querySelector('.rating')
    expect(ratingDiv?.textContent).toContain('⭐')
  })

  it('renders the product image', () => {
    renderWithProviders(<ProductCard {...defaultProps} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'https://example.com/product.jpg')
  })

  it('renders an Add to Cart button', () => {
    renderWithProviders(<ProductCard {...defaultProps} />)
    expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument()
  })

  it('calls addToCart with product id when button is clicked', async () => {
    const addToCart = vi.fn()
    const cartContext = createMockCartContext({ addToCart })

    renderWithProviders(<ProductCard {...defaultProps} />, { cartContext })

    await userEvent.click(screen.getByRole('button', { name: 'Add to Cart' }))
    expect(addToCart).toHaveBeenCalledWith(1)
  })

  it('formats price with 2 decimal places', () => {
    renderWithProviders(<ProductCard {...defaultProps} price={10} />)
    expect(screen.getByText('$10.00')).toBeInTheDocument()
  })
})
