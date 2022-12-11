import Image from 'next/legacy/image'
import React, { useEffect, useState } from 'react'
import RoomDisplayerMeasures from '../../interfaces/RoomDisplayerMeasures'
import ItemPointer from '../itemPointer/ItemPointer'

const RoomDisplayer = (): any => {
  const [roomDisplayerMeasures, setRoomDisplayerMeasures] = useState({ height: 844, width: 390 })

  useEffect(() => {
    const roomDisplayerElement = document.querySelector('.room-displayer')
    const roomDisplayerMeasures: RoomDisplayerMeasures = {
      height: roomDisplayerElement?.clientHeight ?? 844,
      width: roomDisplayerElement?.clientWidth ?? 390
    }
    console.log(roomDisplayerMeasures)
    window.addEventListener('resize', () => setRoomDisplayerMeasures(roomDisplayerMeasures))
    return () => {
      window.removeEventListener('resize', () =>
        setRoomDisplayerMeasures(roomDisplayerMeasures)
      )
    }
  }, [roomDisplayerMeasures.width, roomDisplayerMeasures.height])
  return (
    <div className='flex w-full justify-center'>
      <div className='flex flex-col items-center justify-center  h-screen w-screen max-w-[1420px]'>
        <section className='w-full h-full relative '>
          <Image
            alt='modern kitchen'
            className='-z-10 object-contain room-displayer'
            src={process.env.NEXT_PUBLIC_KITCHEN_URL as string}
            layout='fill'
            priority
          />
          <ItemPointer roomDisplayerMeasures={roomDisplayerMeasures} />
        </section>
      </div>
    </div>
  )
}

export default RoomDisplayer
