import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ColorPicker } from '../components/ColorPicker'

describe('ColorPicker', () => {
  it('renders all color options', () => {
    render(<ColorPicker selectedId="midnight" onChange={jest.fn()} />)
    const buttons = screen.getAllByRole('option')
    expect(buttons.length).toBeGreaterThan(4)
  })

  it('marks the selected color as aria-selected', () => {
    render(<ColorPicker selectedId="velocity-red" onChange={jest.fn()} />)
    const selected = screen.getByRole('option', { name: 'Velocity Red' })
    expect(selected).toHaveAttribute('aria-selected', 'true')
  })

  it('calls onChange with the correct id when clicked', () => {
    const onChange = jest.fn()
    render(<ColorPicker selectedId="midnight" onChange={onChange} />)
    fireEvent.click(screen.getByRole('option', { name: 'Court Blue' }))
    expect(onChange).toHaveBeenCalledWith('court-blue')
  })
})
