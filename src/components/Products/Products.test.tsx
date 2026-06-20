import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import Products from './Products'
import { renderWithProviders, createMockProductContext, mockProduct, mockProduct2 } from '../../test/test-utils'

describe('Products', () => {
  it('renders product cards for each product', () => {
    renderWithProviders(<Products />)
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText(mockProduct2.title)).toBeInTheDocument()
  })

  it('displays prices for all products', () => {
    renderWithProviders(<Products />)
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument()
    expect(screen.getByText(`$${mockProduct2.price.toFixed(2)}`)).toBeInTheDocument()
  })

  it('renders nothing when products is null', () => {
    const productContext = createMockProductContext({ products: null })
    const { container } = renderWithProviders(<Products />, { productContext })
    const productCards = container.querySelectorAll('.product-card')
    expect(productCards).toHaveLength(0)
  })

  it('renders nothing when products is empty', () => {
    const productContext = createMockProductContext({ products: [] })
    const { container } = renderWithProviders(<Products />, { productContext })
    const productCards = container.querySelectorAll('.product-card')
    expect(productCards).toHaveLength(0)
  })

  it('renders Add to Cart button for each product', () => {
    renderWithProviders(<Products />)
    const buttons = screen.getAllByRole('button', { name: 'Add to Cart' })
    expect(buttons).toHaveLength(2)
  })
})
