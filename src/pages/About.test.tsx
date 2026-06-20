import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import About from './About'
import { renderWithProviders } from '../test/test-utils'

describe('About', () => {
  it('renders the Header component', () => {
    renderWithProviders(<About />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the "About Is Working" text', () => {
    renderWithProviders(<About />)
    expect(screen.getByText('About Is Working')).toBeInTheDocument()
  })

  it('renders navigation links from Header', () => {
    renderWithProviders(<About />)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
  })
})
