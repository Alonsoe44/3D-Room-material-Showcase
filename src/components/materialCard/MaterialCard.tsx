import Image from 'next/legacy/image'
import React from 'react'
import { motion } from 'framer-motion'

interface MaterialCardProps {
  materialName: string
  materialImage: string
  selected: boolean
  roomDisplayerWidth: number
}

const MaterialCard = ({ materialName, materialImage, roomDisplayerWidth }: MaterialCardProps): any => {
  console.log((1 / 1420) * roomDisplayerWidth)
  return (
    <motion.li
      className=' w-min my-3 rounded-md bg-lightContrast p-2 text-sm mx-2'

    >
      <button className='flex justify-between items-center'>
        <div className='w-32 flex justify-center'>
          <p className=''>{materialName}</p>
        </div>
        <div className='lg:w-24 w-16'>
          <Image src={materialImage} width={100} height={100} />
        </div>
      </button>
    </motion.li>
  )
}

export default MaterialCard
