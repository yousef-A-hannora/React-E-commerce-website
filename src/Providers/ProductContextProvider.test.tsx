import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useContext } from 'react'
import ProductContextProvider from './ProductContextProvider'
import { ProductContext } from '../Contexts'

function ProductConsumer() {
  const ctx = useContext(ProductContext)
  if (!ctx) return <div>No context</div>

  return (
    <div>
      <span data-testid="product-count">{ctx.products?.length ?? 0}</span>
      {ctx.products?.map((p) => (
        <span key={p.id} data-testid={`product-${p.id}`}>
          {p.title}
        </span>
      ))}
    </div>
  )
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('ProductContextProvider', () => {
  it('fetches and provides products to children', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Product 1',
        image: 'img1.jpg',
        price: 10,
        description: 'Desc 1',
        category: 'cat1',
        rating: { rate: 4, count: 100 },
      },
    ]

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => mockProducts,
    } as Response)

    await act(async () => {
      render(
        <ProductContextProvider>
          <ProductConsumer />
        </ProductContextProvider>,
      )
    })

    expect(screen.getByTestId('product-count')).toHaveTextContent('1')
    expect(screen.getByText('Product 1')).toBeInTheDocument()
  })

  it('handles fetch error gracefully', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('API Error'))
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await act(async () => {
      render(
        <ProductContextProvider>
          <ProductConsumer />
        </ProductContextProvider>,
      )
    })

    expect(screen.getByTestId('product-count')).toBeInTheDocument()
    consoleSpy.mockRestore()
  })

  it('shows loader while loading', async () => {
    let resolvePromise: (value: Response) => void
    const fetchPromise = new Promise<Response>((resolve) => {
      resolvePromise = resolve
    })
    vi.spyOn(globalThis, 'fetch').mockReturnValue(fetchPromise)

    render(
      <ProductContextProvider>
        <ProductConsumer />
      </ProductContextProvider>,
    )

    expect(document.querySelector('.loader-container')).toBeInTheDocument()

    await act(async () => {
      resolvePromise!({
        json: async () => [],
      } as Response)
    })
  })

  it('provides addToProducts, UpdateProduct, removeFromProducts functions', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => [],
    } as Response)

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    function ContextConsumer() {
      const ctx = useContext(ProductContext)
      return (
        <div>
          <button onClick={() => ctx?.addToProducts(1)}>add</button>
          <button onClick={() => ctx?.UpdateProduct(1)}>update</button>
          <button onClick={() => ctx?.removeFromProducts(1)}>remove</button>
          <span data-testid="has-ctx">{ctx ? 'yes' : 'no'}</span>
        </div>
      )
    }

    await act(async () => {
      render(
        <ProductContextProvider>
          <ContextConsumer />
        </ProductContextProvider>,
      )
    })

    expect(screen.getByTestId('has-ctx')).toHaveTextContent('yes')

    await userEvent.click(screen.getByRole('button', { name: 'add' }))
    await userEvent.click(screen.getByRole('button', { name: 'update' }))
    await userEvent.click(screen.getByRole('button', { name: 'remove' }))

    consoleSpy.mockRestore()
  })
})
