import Image from 'next/legacy/image'
import React from 'react'
import fingerprint from '../../assets/fingerprint.webp'
import RoomDisplayerMeasures from '../../interfaces/RoomDisplayerMeasures'

interface ItemPointerProps {
  roomDisplayerMeasures: RoomDisplayerMeasures
}
const itemPointerSizeFinder = (size: number): number => (size / 30.8) <= 50 ? 50 : size / 30.8
const itemPointerYPositionFinder = (displayerWidth: number): number => {
  let yPosition = 0
  if (typeof window !== 'undefined') {
    console.log(window.innerHeight)
    console.log(displayerWidth)
    yPosition = ((window?.innerHeight ?? 844) / 2) - ((displayerWidth / 1.42) / 2)
  }
  console.log('yPosition ' + yPosition.toString())
  return yPosition
}

const ItemPointer = ({ roomDisplayerMeasures: { width, height } }: ItemPointerProps): any => {
  return (
    <button className='absolute bottom-0'>
      <Image
        className=''
        src={fingerprint}
        width={itemPointerSizeFinder(width)}
        height={itemPointerSizeFinder(width)}
        alt='item pointer'
      />
    </button>
  )
}

export default ItemPointer
