import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useContext } from 'react'
import CartContextProvider from './TheCartContextProvider'
import { CartContext } from '../Contexts'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    clear: vi.fn(() => {
      store = {}
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

function CartConsumer() {
  const ctx = useContext(CartContext)
  if (!ctx) return <div>No context</div>

  return (
    <div>
      <span data-testid="cart-count">{ctx.cart?.products?.length ?? 0}</span>
      <button onClick={() => ctx.addToCart(99)}>Add Item 99</button>
      <button onClick={() => ctx.removeFromCart(99)}>Remove Item 99</button>
    </div>
  )
}

beforeEach(() => {
  localStorageMock.clear()
  vi.restoreAllMocks()
})

describe('TheCartContextProvider', () => {
  it('provides cart context to children', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({
        id: 2,
        userId: 1,
        date: '2024-01-01',
        products: [{ productId: 1, quantity: 3 }],
        __v: 0,
      }),
    } as Response)

    await act(async () => {
      render(
        <CartContextProvider>
          <CartConsumer />
        </CartContextProvider>,
      )
    })

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
  })

  it('addToCart adds a new product', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({
        id: 2,
        userId: 1,
        date: '2024-01-01',
        products: [],
        __v: 0,
      }),
    } as Response)

    await act(async () => {
      render(
        <CartContextProvider>
          <CartConsumer />
        </CartContextProvider>,
      )
    })

    await userEvent.click(screen.getByRole('button', { name: 'Add Item 99' }))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
  })

  it('addToCart increments quantity if product already exists', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({
        id: 2,
        userId: 1,
        date: '2024-01-01',
        products: [{ productId: 99, quantity: 1 }],
        __v: 0,
      }),
    } as Response)

    await act(async () => {
      render(
        <CartContextProvider>
          <CartConsumer />
        </CartContextProvider>,
      )
    })

    await userEvent.click(screen.getByRole('button', { name: 'Add Item 99' }))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
  })

  it('removeFromCart removes a product', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({
        id: 2,
        userId: 1,
        date: '2024-01-01',
        products: [{ productId: 99, quantity: 2 }],
        __v: 0,
      }),
    } as Response)

    await act(async () => {
      render(
        <CartContextProvider>
          <CartConsumer />
        </CartContextProvider>,
      )
    })

    await userEvent.click(screen.getByRole('button', { name: 'Remove Item 99' }))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
  })

  it('persists cart to localStorage', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({
        id: 2,
        userId: 1,
        date: '2024-01-01',
        products: [{ productId: 1, quantity: 1 }],
        __v: 0,
      }),
    } as Response)

    await act(async () => {
      render(
        <CartContextProvider>
          <CartConsumer />
        </CartContextProvider>,
      )
    })

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cartItems',
      expect.any(String),
    )
  })

  it('handles fetch error gracefully', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'))
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await act(async () => {
      render(
        <CartContextProvider>
          <CartConsumer />
        </CartContextProvider>,
      )
    })

    expect(screen.getByTestId('cart-count')).toBeInTheDocument()
    consoleSpy.mockRestore()
  })
})
