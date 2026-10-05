import React from 'react'
import { render } from '@testing-library/react'
import { ProductPreview } from '../components/ProductPreview'
import { PRODUCTS } from '../data/options'
import { ProductType } from '../types'

describe('ProductPreview', () => {
  (Object.keys(PRODUCTS) as ProductType[]).forEach(type => {
    PRODUCTS[type].views.forEach(view => {
      it(`renders ${type} (${view.id} view)`, () => {
        const { container } = render(<ProductPreview productType={type} view={view.id} />)
        expect(container.querySelector('svg')).toBeInTheDocument()
      })
    })
  })

  it('paints parts with the chosen colors', () => {
    const { container } = render(
      <ProductPreview productType="cap" view="side" colors={{ brim: '#ff0000' }} />
    )
    expect(container.querySelector('#region-brim')).toHaveAttribute('fill', '#ff0000')
  })
})
