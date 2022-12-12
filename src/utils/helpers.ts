const itemPointerSizeFinder = (size: number): number => (size / 20.8) <= 30 ? 30 : size / 20.8

const itemPointerYPositionFinder = (displayerWidth: number): number => {
  let yPosition = 0
  if (typeof window !== 'undefined') {
    yPosition = ((window?.innerHeight ?? 844) / 2) - ((displayerWidth / 1.42) / 2)
  }
  return -yPosition
}

const absoluteYCoordinateFinder = (displayerWidth: number, relativeYCoordinate: number, baseYCoordinate: number): number => relativeYCoordinate - ((baseYCoordinate) / 100) * displayerWidth / 1.42 + 30
const absoluteXCoordinateFinder = (displayerWidth: number, relativeXCoordinate: number): number => ((displayerWidth / 100) * relativeXCoordinate) - 10

export { itemPointerSizeFinder, itemPointerYPositionFinder, absoluteYCoordinateFinder, absoluteXCoordinateFinder }
