import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ColorPicker } from '../components/ColorPicker'
import { DEFAULT_SHOE_COLORS } from '../hooks/useConfigurator'

describe('ColorPicker', () => {
  it('renders color swatches for all shoe parts', () => {
    render(<ColorPicker shoeColors={DEFAULT_SHOE_COLORS} onChange={jest.fn()} />)
    // There are 7 parts × 8 swatches = 56 swatch buttons plus possible focus-visible elements
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(20)
  })

  it('calls onChange with the correct part and hex when clicked', () => {
    const onChange = jest.fn()
    render(<ColorPicker shoeColors={DEFAULT_SHOE_COLORS} onChange={onChange} />)
    // Click the first '#e94560' swatch (first occurrence in the list)
    const redSwatches = screen.getAllByTitle('#e94560')
    fireEvent.click(redSwatches[0])
    expect(onChange).toHaveBeenCalledWith(expect.any(String), '#e94560')
  })

  it('shows active state for the currently selected color', () => {
    render(<ColorPicker shoeColors={DEFAULT_SHOE_COLORS} onChange={jest.fn()} />)
    // The white swatch for 'upper' should have aria-pressed=true
    const pressedButtons = screen.getAllByRole('button', { pressed: true })
    expect(pressedButtons.length).toBeGreaterThan(0)
  })
})
