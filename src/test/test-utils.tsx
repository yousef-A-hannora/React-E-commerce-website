/* eslint-disable react-refresh/only-export-components */
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { CartContext } from '../Contexts'
import { ProductContext } from '../Contexts'
import type { CartContextType, ProductContextType, cart, product } from '../types'

export const mockProduct: product = {
  id: 1,
  title: 'Test Product',
  image: 'https://example.com/image.jpg',
  price: 29.99,
  description: 'A test product description',
  category: 'electronics',
  rating: { rate: 4.5, count: 120 },
}

export const mockProduct2: product = {
  id: 2,
  title: 'Another Product',
  image: 'https://example.com/image2.jpg',
  price: 49.99,
  description: 'Another product description',
  category: 'clothing',
  rating: { rate: 3.2, count: 50 },
}

export const mockCart: cart = {
  id: 1,
  userId: 1,
  date: new Date('2024-01-01'),
  products: [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 1 },
  ],
  __v: 0,
}

export const mockEmptyCart: cart = {
  id: 1,
  userId: 1,
  date: new Date('2024-01-01'),
  products: [],
  __v: 0,
}

export function createMockCartContext(overrides?: Partial<CartContextType>): CartContextType {
  return {
    cart: mockCart,
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    ...overrides,
  }
}

export function createMockProductContext(overrides?: Partial<ProductContextType>): ProductContextType {
  return {
    products: [mockProduct, mockProduct2],
    addToProducts: vi.fn(),
    UpdateProduct: vi.fn(),
    removeFromProducts: vi.fn(),
    ...overrides,
  }
}

function AllProviders({
  children,
  cartContext,
  productContext,
}: {
  children: ReactNode
  cartContext?: CartContextType
  productContext?: ProductContextType
}) {
  const cart = cartContext ?? createMockCartContext()
  const product = productContext ?? createMockProductContext()

  return (
    <ProductContext.Provider value={product}>
      <CartContext.Provider value={cart}>
        <MemoryRouter>{children}</MemoryRouter>
      </CartContext.Provider>
    </ProductContext.Provider>
  )
}

export function renderWithProviders(
  ui: ReactElement,
  options?: RenderOptions & {
    cartContext?: CartContextType
    productContext?: ProductContextType
  },
) {
  const { cartContext, productContext, ...renderOptions } = options ?? {}

  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders cartContext={cartContext} productContext={productContext}>
        {children}
      </AllProviders>
    ),
    ...renderOptions,
  })
}
