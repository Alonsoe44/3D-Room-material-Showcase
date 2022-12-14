import React, { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import MaterialCard from '../materialCard/MaterialCard'
import Material from '../../interfaces/Material'
import LayersAndMaterial from '../../interfaces/SelectedLayersAndMaterial'

interface MenuCoordinates {
  xCoordinate: number
  yCoordinate: number
}
interface MaterialsMenuProps {
  menuCoordinates: MenuCoordinates
  roomDisplayerWidth: number
  itemMaterials: Material[]
  setRoomLayer: Dispatch<SetStateAction<LayersAndMaterial>>
  layersAndMaterial: LayersAndMaterial
}

const MaterialsMenu = ({ menuCoordinates: { yCoordinate }, roomDisplayerWidth, itemMaterials, layersAndMaterial, setRoomLayer }: MaterialsMenuProps): any => {
  return (
    <motion.section
      initial={{ y: 0 }}
      animate={{ y: roomDisplayerWidth <= 1024 ? -yCoordinate - 90 : -yCoordinate + 10 }}
      transition={{ duration: 0.2 }}
      className='absolute lg:right-3  2xl:w-88 lg:w-80 w-full lg:bg-opacity-0 z-20'
    >
      <ul className='flex lg:flex-col flex-row overflow-x-scroll md:overflow-hidden w-full items-end scrollbar-hide'>{
       itemMaterials.map((material: Material) =>
         <MaterialCard
           key={material.id}
           selected={layersAndMaterial.selectedMaterial === material.id}
           material={material}
           layersAndMaterial={layersAndMaterial}
           setRoomLayer={setRoomLayer}
         />
       )
      }
      </ul>
    </motion.section>
  )
}

export default MaterialsMenu
