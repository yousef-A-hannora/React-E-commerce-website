import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './Form'

describe('Form', () => {
  it('renders an email label', () => {
    render(<Form />)
    expect(screen.getByLabelText('Email here')).toBeInTheDocument()
  })

  it('renders an email input with placeholder', () => {
    render(<Form />)
    const input = screen.getByPlaceholderText('Enter your email')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('name', 'email')
  })

  it('renders a submit button', () => {
    render(<Form />)
    expect(screen.getByRole('button', { name: 'Submit here' })).toBeInTheDocument()
  })

  it('accepts user input in the email field', async () => {
    render(<Form />)
    const input = screen.getByPlaceholderText('Enter your email')
    await userEvent.type(input, 'test@example.com')
    expect(input).toHaveValue('test@example.com')
  })
})
