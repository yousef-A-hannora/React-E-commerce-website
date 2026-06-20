import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button onClick={vi.fn()}>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies inline styles', () => {
    render(<Button onClick={vi.fn()}>Styled</Button>)
    const button = screen.getByRole('button')
    expect(button.style.color).toBe('white')
    expect(button.style.backgroundColor).toBe('black')
  })

  it('renders complex children', () => {
    render(
      <Button onClick={vi.fn()}>
        <span>Icon</span> Add to Cart
      </Button>,
    )
    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Add to Cart')
  })
})
