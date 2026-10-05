import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductTypeSelector } from '../components/ProductTypeSelector'

describe('ProductTypeSelector', () => {
  it('renders all product type buttons including shirt and cap', () => {
    render(<ProductTypeSelector selected="shoe" onChange={jest.fn()} />)
    expect(screen.getByText('Footwear')).toBeInTheDocument()
    expect(screen.getByText('Top')).toBeInTheDocument()
    expect(screen.getByText('Cap')).toBeInTheDocument()
    expect(screen.getByText('Bottoms')).toBeInTheDocument()
  })

  it('marks selected button as aria-pressed', () => {
    render(<ProductTypeSelector selected="shirt" onChange={jest.fn()} />)
    expect(screen.getByText('Top').closest('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('fires onChange with correct value on click', () => {
    const onChange = jest.fn()
    render(<ProductTypeSelector selected="shoe" onChange={onChange} />)
    fireEvent.click(screen.getByText('Cap'))
    expect(onChange).toHaveBeenCalledWith('cap')
  })
})
