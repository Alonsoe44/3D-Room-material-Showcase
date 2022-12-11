import Image from 'next/legacy/image'
import React, { useEffect, useState } from 'react'
import { itemPointerYPositionFinder } from '../../utils/helpers'
import ItemPointer from '../itemPointer/ItemPointer'

const RoomDisplayer = (): any => {
  const [roomDisplayerMeasurements, setRoomDisplayerMeasurements] = useState({ width: 390, point: 100 })

  useEffect(() => {
    const roomDisplayerElement = document.querySelector('.room-displayer') as HTMLElement
    window.addEventListener('resize', () => setRoomDisplayerMeasurements({ width: roomDisplayerElement.clientWidth, point: itemPointerYPositionFinder(roomDisplayerElement.clientWidth) }))
    setRoomDisplayerMeasurements({ width: roomDisplayerElement.clientWidth, point: itemPointerYPositionFinder(roomDisplayerElement.clientWidth) })

    return () => {
      window.removeEventListener('resize', () =>
        setRoomDisplayerMeasurements({ width: roomDisplayerElement.clientWidth, point: itemPointerYPositionFinder(roomDisplayerElement.clientWidth) })
      )
    }
  }, [roomDisplayerMeasurements.width, roomDisplayerMeasurements.point])
  return (
    <section className='flex w-full justify-center'>
      <div className='flex flex-col items-center justify-center  h-screen w-screen max-w-[1420px]'>
        <div className='w-full h-full relative '>
          <Image
            alt='modern kitchen'
            className='-z-10 object-contain room-displayer'
            src={process.env.NEXT_PUBLIC_KITCHEN_URL as string}
            layout='fill'
            priority
          />
          <ItemPointer
            pointerCoordinates={{ xCoordinate: 0, yCoordinate: roomDisplayerMeasurements.point }}
            roomDisplayerWidth={roomDisplayerMeasurements.width}
          />
        </div>
      </div>
    </section>
  )
}

export default RoomDisplayer
