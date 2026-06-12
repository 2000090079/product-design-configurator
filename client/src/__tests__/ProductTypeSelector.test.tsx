import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductTypeSelector } from '../components/ProductTypeSelector'

describe('ProductTypeSelector', () => {
  it('renders all product type buttons', () => {
    render(<ProductTypeSelector selected="shoe" onChange={jest.fn()} />)
    expect(screen.getByText('Footwear')).toBeInTheDocument()
    expect(screen.getByText('Top')).toBeInTheDocument()
    expect(screen.getByText('Bottoms')).toBeInTheDocument()
  })

  it('marks selected button as aria-pressed', () => {
    render(<ProductTypeSelector selected="shirt" onChange={jest.fn()} />)
    const shirtBtn = screen.getByText('Top').closest('button')!
    expect(shirtBtn).toHaveAttribute('aria-pressed', 'true')
  })

  it('fires onChange with correct value on click', () => {
    const onChange = jest.fn()
    render(<ProductTypeSelector selected="shoe" onChange={onChange} />)
    fireEvent.click(screen.getByText('Bottoms'))
    expect(onChange).toHaveBeenCalledWith('pants')
  })
})
