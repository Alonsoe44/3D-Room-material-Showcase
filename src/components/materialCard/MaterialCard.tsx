import Image from 'next/legacy/image'
import React, { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import Material from '../../interfaces/Material'
import LayersAndMaterial from '../../interfaces/SelectedLayersAndMaterial'

interface MaterialCardProps {
  material: Material
  selected: boolean
  layersAndMaterial: LayersAndMaterial
  setRoomLayer: Dispatch<SetStateAction<LayersAndMaterial>>
}

const MaterialCard = ({ material: { name: materialName, materialPreview, points, id: materialId, layers }, layersAndMaterial, setRoomLayer }: MaterialCardProps): any => {
  return (
    <motion.li
      className=' w-min my-3 rounded-md bg-lightContrast p-2 text-sm mx-2'
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className='flex justify-between items-center'
        onClick={() => {
          setRoomLayer({
            selectedLayers: layersAndMaterial.selectedLayers.map(
              roomLayer => roomLayer.layerId === points[0] ? { ...roomLayer, layerImage: layers[points[0]], layerName: materialName } : roomLayer
            ),
            selectedMaterial: materialId
          })
        }}
      >
        <div className='w-32 flex justify-center'>
          <p className=''>{materialName}</p>
        </div>
        <div className='lg:w-24 w-16'>
          <Image src={materialPreview} width={100} height={100} alt={materialName} />
        </div>
      </button>
    </motion.li>
  )
}

export default MaterialCard
