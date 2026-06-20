import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import Header from './Header'
import { renderWithProviders } from '../../test/test-utils'

describe('Header', () => {
  it('renders the logo link', () => {
    renderWithProviders(<Header />)
    const logoLink = screen.getByRole('link', { name: '' })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders navigation links', () => {
    renderWithProviders(<Header />)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'User' })).toBeInTheDocument()
  })

  it('renders a header element', () => {
    renderWithProviders(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the navigation element', () => {
    renderWithProviders(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
