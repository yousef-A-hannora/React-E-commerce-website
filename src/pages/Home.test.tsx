import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import Home from './Home'
import { renderWithProviders } from '../test/test-utils'

describe('Home', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the Header component', () => {
    renderWithProviders(<Home />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderWithProviders(<Home />)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
  })

  it('renders the Products component', () => {
    renderWithProviders(<Home />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Another Product')).toBeInTheDocument()
  })

  it('renders Add to Cart buttons for products', () => {
    renderWithProviders(<Home />)
    const buttons = screen.getAllByRole('button', { name: 'Add to Cart' })
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })
})
