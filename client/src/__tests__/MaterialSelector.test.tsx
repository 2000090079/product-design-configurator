import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MaterialSelector } from '../components/MaterialSelector'

describe('MaterialSelector', () => {
  it('renders all material options', () => {
    render(<MaterialSelector selectedId="flyknit" onChange={jest.fn()} />)
    expect(screen.getByText('Flyknit')).toBeInTheDocument()
    expect(screen.getByText('Full-Grain Leather')).toBeInTheDocument()
    expect(screen.getByText('Engineered Mesh')).toBeInTheDocument()
  })

  it('calls onChange when a material is clicked', () => {
    const onChange = jest.fn()
    render(<MaterialSelector selectedId="flyknit" onChange={onChange} />)
    fireEvent.click(screen.getByRole('option', { name: /canvas/i }))
    expect(onChange).toHaveBeenCalledWith('canvas')
  })
})
