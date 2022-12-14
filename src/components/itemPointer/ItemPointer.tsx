import Image from 'next/legacy/image'
import React from 'react'
import fingerprint from '../../assets/fingerprint.webp'
import { motion } from 'framer-motion'
import { itemPointerSizeFinder } from '../../utils/helpers'

interface PointerCoordinates {
  xCoordinate: number
  yCoordinate: number
}
interface ItemPointerProps {
  pointerCoordinates: PointerCoordinates
  roomDisplayerWidth: number
  selectItem: () => any
}

const ItemPointer = ({ pointerCoordinates: { xCoordinate, yCoordinate }, roomDisplayerWidth, selectItem }: ItemPointerProps): any => {
  return (
    <motion.button
      className='absolute bottom-0 active:scale-[0.90] z-10'
      initial={{ y: 0, x: 0 }}
      animate={{ y: yCoordinate, x: xCoordinate }}
      transition={{ duration: 0.2 }}
      onClick={() => selectItem()}
    >
      <Image
        src={fingerprint}
        width={itemPointerSizeFinder(roomDisplayerWidth)}
        height={itemPointerSizeFinder(roomDisplayerWidth)}
        alt='item pointer'
      />
    </motion.button>
  )
}

export default ItemPointer
