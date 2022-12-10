import Image from 'next/legacy/image'
import React from 'react'

const RoomDisplayer = (): any => {
  return (
    <section className='w-full h-screen relative'>
      <Image
        alt='modern kitchen'
        className='-z-10 object-contain'
        src={process.env.NEXT_PUBLIC_KITCHEN_URL as string}
        layout='fill'
        priority
      />
    </section>
  )
}

export default RoomDisplayer
