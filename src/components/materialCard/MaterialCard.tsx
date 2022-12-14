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
  return (
    <motion.li
      className=' w-min my-3 rounded-md bg-lightContrast p-2 text-sm mx-2'
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
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
