const itemPointerSizeFinder = (size: number): number => (size / 20.8) <= 30 ? 30 : size / 20.8
const itemPointerYPositionFinder = (displayerWidth: number): number => {
  let yPosition = 0
  if (typeof window !== 'undefined') {
    yPosition = ((window?.innerHeight ?? 844) / 2) - ((displayerWidth / 1.42) / 2)
  }
  return -yPosition
}

export { itemPointerSizeFinder, itemPointerYPositionFinder }
