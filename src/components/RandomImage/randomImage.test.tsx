import { render, screen } from '@testing-library/react'

import RandomImageContainer from '.'

describe('<RandomImageContainer />', () => {
  it('should render an empty placeholder image when no src is provided', () => {
    render(<RandomImageContainer />)

    expect(screen.getByTestId('empty-image')).toBeInTheDocument()
  })
})
