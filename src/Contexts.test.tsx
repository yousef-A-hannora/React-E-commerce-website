import { describe, it, expect } from 'vitest'
import { useContext } from 'react'
import { render, screen } from '@testing-library/react'
import { CartContext, ProductContext } from './Contexts'

describe('Contexts', () => {
  it('CartContext defaults to null', () => {
    function Consumer() {
      const ctx = useContext(CartContext)
      return <span data-testid="value">{ctx === null ? 'null' : 'not-null'}</span>
    }

    render(<Consumer />)
    expect(screen.getByTestId('value')).toHaveTextContent('null')
  })

  it('ProductContext defaults to null', () => {
    function Consumer() {
      const ctx = useContext(ProductContext)
      return <span data-testid="value">{ctx === null ? 'null' : 'not-null'}</span>
    }

    render(<Consumer />)
    expect(screen.getByTestId('value')).toHaveTextContent('null')
  })

  it('CartContext provides values when wrapped in Provider', () => {
    const mockValue = {
      cart: null,
      addToCart: () => {},
      removeFromCart: () => {},
    }

    function Consumer() {
      const ctx = useContext(CartContext)
      return <span data-testid="value">{ctx === null ? 'null' : 'provided'}</span>
    }

    render(
      <CartContext.Provider value={mockValue}>
        <Consumer />
      </CartContext.Provider>,
    )
    expect(screen.getByTestId('value')).toHaveTextContent('provided')
  })

  it('ProductContext provides values when wrapped in Provider', () => {
    const mockValue = {
      products: [],
      addToProducts: () => {},
      UpdateProduct: () => {},
      removeFromProducts: () => {},
    }

    function Consumer() {
      const ctx = useContext(ProductContext)
      return <span data-testid="value">{ctx === null ? 'null' : 'provided'}</span>
    }

    render(
      <ProductContext.Provider value={mockValue}>
        <Consumer />
      </ProductContext.Provider>,
    )
    expect(screen.getByTestId('value')).toHaveTextContent('provided')
  })
})
