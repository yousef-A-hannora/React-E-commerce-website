import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import Navbar from './Navbar'
import { renderWithProviders, createMockCartContext, mockCart } from '../../test/test-utils'

describe('Navbar', () => {
  const routes = [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/about' },
    { title: 'Cart', url: '/cart' },
  ]

  it('renders all navigation links', () => {
    renderWithProviders(<Navbar routs={routes} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders links with correct hrefs', () => {
    renderWithProviders(<Navbar routs={routes} />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
  })

  it('displays cart count in the Cart link', () => {
    const cartContext = createMockCartContext({ cart: mockCart })
    renderWithProviders(<Navbar routs={routes} />, { cartContext })
    expect(screen.getByText(`Cart(${mockCart.products.length})`)).toBeInTheDocument()
  })

  it('displays Cart(0) when cart is empty', () => {
    const cartContext = createMockCartContext({
      cart: { ...mockCart, products: [] },
    })
    renderWithProviders(<Navbar routs={routes} />, { cartContext })
    expect(screen.getByText('Cart(0)')).toBeInTheDocument()
  })

  it('renders non-Cart titles without count suffix', () => {
    renderWithProviders(<Navbar routs={[{ title: 'User', url: '/user' }]} />)
    expect(screen.getByText('User')).toBeInTheDocument()
  })
})
