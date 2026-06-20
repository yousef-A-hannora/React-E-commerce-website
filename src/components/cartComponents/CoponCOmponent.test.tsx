import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CoponCOmponent from './CoponCOmponent'

describe('CoponCOmponent', () => {
  it('renders a promo code label', () => {
    render(<CoponCOmponent />)
    expect(screen.getByText('Promo Code')).toBeInTheDocument()
  })

  it('renders a text input', () => {
    render(<CoponCOmponent />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders a Use button', () => {
    render(<CoponCOmponent />)
    expect(screen.getByRole('button', { name: 'Use' })).toBeInTheDocument()
  })

  it('accepts user input for promo code', async () => {
    render(<CoponCOmponent />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'SAVE20')
    expect(input).toHaveValue('SAVE20')
  })
})
