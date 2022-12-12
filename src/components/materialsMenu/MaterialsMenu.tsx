import React from 'react'
import { motion } from 'framer-motion'
import MaterialCard from '../materialCard/MaterialCard'

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
      animate={{ y: roomDisplayerWidth <= 1024 ? -yCoordinate - 90 : -yCoordinate + 10 }}
      transition={{ duration: 0.2 }}
      className='absolute lg:right-3  2xl:w-88 lg:w-80 w-full bg-lightBG lg:bg-opacity-0'
    >
      <ul className='flex lg:flex-col flex-row overflow-x-scroll w-full'>
        <MaterialCard materialImage='/none' materialName='Rock white' selected roomDisplayerWidth={roomDisplayerWidth} />
        <MaterialCard materialImage='/none' materialName='Rock black' selected roomDisplayerWidth={roomDisplayerWidth} />
        <MaterialCard materialImage='/none' materialName='Rock black' selected roomDisplayerWidth={roomDisplayerWidth} />
      </ul>
    </motion.section>
  )
}

export default MaterialsMenu
