import { render, screen } from '@testing-library/react'
import Button from './Button'
import '@testing-library/jest-dom'

describe('Given a button component', () => {
  describe("When it's rendered", () => {
    test('Then it should display some text', () => {
      render(<Button />)

      const foundText = screen.getByRole('button', { name: /magic/i })

      expect(foundText).toBeInTheDocument()
    })
  })
})
