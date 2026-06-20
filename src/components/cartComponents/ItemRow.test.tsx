import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { ItemRow } from './ItemRow'
import { renderWithProviders } from '../../test/test-utils'

describe('ItemRow', () => {
  const defaultProps = {
    id: 1,
    title: 'Test Product',
    price: 25.0,
    category: 'electronics',
    image: 'https://example.com/img.jpg',
    quantity: 3,
  }

  it('renders product details', () => {
    renderWithProviders(
      <table>
        <tbody>
          <ItemRow {...defaultProps} />
        </tbody>
      </table>,
    )
    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  it('displays quantity', () => {
    renderWithProviders(
      <table>
        <tbody>
          <ItemRow {...defaultProps} />
        </tbody>
      </table>,
    )
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('displays unit price', () => {
    renderWithProviders(
      <table>
        <tbody>
          <ItemRow {...defaultProps} />
        </tbody>
      </table>,
    )
    expect(screen.getByText('25')).toBeInTheDocument()
  })

  it('calculates and displays total (price * quantity)', () => {
    renderWithProviders(
      <table>
        <tbody>
          <ItemRow {...defaultProps} />
        </tbody>
      </table>,
    )
    expect(screen.getByText('75')).toBeInTheDocument()
  })

  it('renders the product image', () => {
    renderWithProviders(
      <table>
        <tbody>
          <ItemRow {...defaultProps} />
        </tbody>
      </table>,
    )
    expect(screen.getByAltText('Test Product')).toHaveAttribute(
      'src',
      'https://example.com/img.jpg',
    )
  })
})
