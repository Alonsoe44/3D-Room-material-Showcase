import { render, screen } from '@testing-library/react'
import RoomDisplayer from './RoomDisplayer'
import '@testing-library/jest-dom'

describe('Given a RoomDisplayer component', () => {
  describe("When it's rendered", () => {
    test('Then it should display an image', () => {
      render(<RoomDisplayer />)

      const foundImage = screen.getByRole('img', { name: /modern kitchen/i })

      expect(foundImage).toBeInTheDocument()
    })
  })
})
