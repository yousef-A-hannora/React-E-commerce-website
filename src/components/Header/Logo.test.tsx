import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import Logo from './Logo'
import { renderWithProviders } from '../../test/test-utils'

describe('Logo', () => {
  it('renders a link to the home page', () => {
    renderWithProviders(<Logo />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders an image inside the link', () => {
    renderWithProviders(<Logo />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '../../public/favicon.svg')
  })
})
