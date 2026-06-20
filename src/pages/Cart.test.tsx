import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen } from '@testing-library/react'
import Cart from './Cart'
import {
  renderWithProviders,
  createMockCartContext,
  createMockProductContext,
  mockCart,
  mockProduct,
  mockProduct2,
} from '../test/test-utils'

describe('Cart page', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => mockProduct,
    } as Response)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the Header', () => {
    renderWithProviders(<Cart />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders CartTop with items count', () => {
    renderWithProviders(<Cart />)
    expect(screen.getByText('Shopping cart')).toBeInTheDocument()
    expect(screen.getByText(`${mockCart.products.length} Items`)).toBeInTheDocument()
  })

  it('renders OrderSummary', () => {
    renderWithProviders(<Cart />)
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
    expect(screen.getByText('CHECKOUT')).toBeInTheDocument()
  })

  it('shows "No Items to Show" when cart is null', () => {
    const cartContext = createMockCartContext({ cart: null })
    renderWithProviders(<Cart />, { cartContext })
    expect(screen.getByText('No Items to Show')).toBeInTheDocument()
  })

  it('renders shipping city options', () => {
    const { container } = renderWithProviders(<Cart />)
    const options = container.querySelectorAll('datalist option')
    expect(options.length).toBeGreaterThan(0)
  })
})

describe('calculateTotal', () => {
  it('is reflected in the OrderSummary total', () => {
    const products = [mockProduct, mockProduct2]
    const cart = {
      ...mockCart,
      products: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ],
    }
    const productContext = createMockProductContext({ products })
    const cartContext = createMockCartContext({ cart })

    vi.spyOn(console, 'log').mockImplementation(() => {})

    renderWithProviders(<Cart />, { cartContext, productContext })

    const expectedTotal = Math.round(mockProduct.price * 2 + mockProduct2.price * 1)
    const totalElements = screen.getAllByText(`${expectedTotal} Total`)
    expect(totalElements.length).toBeGreaterThanOrEqual(1)
  })
})
