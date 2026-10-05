import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ColorPicker } from '../components/ColorPicker'
import { PRODUCTS, defaultColors } from '../data/options'

const parts = PRODUCTS.shoe.parts
const colors = defaultColors('shoe')

describe('ColorPicker', () => {
  it('renders a row of swatches for every part', () => {
    render(<ColorPicker parts={parts} colors={colors} onChange={jest.fn()} />)
    parts.forEach(p => expect(screen.getByText(p.label)).toBeInTheDocument())
    expect(screen.getAllByRole('button').length).toBeGreaterThan(parts.length * 10)
  })

  it('calls onChange with the correct part and hex when clicked', () => {
    const onChange = jest.fn()
    render(<ColorPicker parts={parts} colors={colors} onChange={onChange} />)
    fireEvent.click(screen.getAllByTitle('#c9a961')[0])
    expect(onChange).toHaveBeenCalledWith(parts[0].id, '#c9a961')
  })

  it('accepts a custom color from the color input', () => {
    const onChange = jest.fn()
    render(<ColorPicker parts={parts} colors={colors} onChange={onChange} />)
    fireEvent.change(screen.getByLabelText('Custom Upper color'), { target: { value: '#123456' } })
    expect(onChange).toHaveBeenCalledWith('upper', '#123456')
  })

  it('shows active state for the currently selected color', () => {
    render(<ColorPicker parts={parts} colors={colors} onChange={jest.fn()} />)
    expect(screen.getAllByRole('button', { pressed: true }).length).toBeGreaterThan(0)
  })
})
