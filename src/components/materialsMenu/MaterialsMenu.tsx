import React from 'react'
import { motion } from 'framer-motion'

interface MenuCoordinates {
  xCoordinate: number
  yCoordinate: number
}
interface MaterialsMenuProps {
  menuCoordinates: MenuCoordinates
  roomDisplayerWidth: number
}

const MaterialsMenu = ({ menuCoordinates: { yCoordinate }, roomDisplayerWidth }: MaterialsMenuProps): any => {
  return (
    <motion.section
      initial={{ y: 0 }}
      animate={{ y: -yCoordinate + 10 }}
      transition={{ duration: 0.2 }}
      className='absolute lg:right-10 right-3 w-40 bg-lightContrast'
    >
      <ul><li>Magenta</li></ul>
    </motion.section>
  )
}

export default MaterialsMenu
