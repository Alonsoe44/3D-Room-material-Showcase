import { collection, getDocs, query, where } from 'firebase/firestore/lite'
import Image from 'next/legacy/image'
import React, { useEffect, useState } from 'react'
import ItemSelector from '../../interfaces/ItemSelector'
import Material from '../../interfaces/Material'
import RoomDisplayerMeasurements from '../../interfaces/RoomDisplayerMeasurements'
import LayersAndMaterial from '../../interfaces/SelectedLayersAndMaterial'
import { db, getItemMaterials, getItemSelectorsCoordinates } from '../../utils/firebaseApp'
import { absoluteXCoordinateFinder, absoluteYCoordinateFinder, itemPointerYPositionFinder } from '../../utils/helpers'
import ItemPointer from '../itemPointer/ItemPointer'
import MaterialsMenu from '../materialsMenu/MaterialsMenu'

const RoomDisplayer = (): any => {
  const [roomDisplayerMeasurements, setRoomDisplayerMeasurements] = useState<RoomDisplayerMeasurements>({ width: 390, baseYCoordinate: 100 })
  const [itemSelectors, setItemSelectors] = useState<ItemSelector[]>([])
  const [selectedItemMaterials, setSelectedItemMaterials] = useState<Material[]>([])
  const [layersAndMaterial, setLayersAndMaterial] = useState<LayersAndMaterial>({ selectedMaterial: 'no Material selected', selectedLayers: [] })

  useEffect(() => {
    (async () => {
      const newSelectors = await getItemSelectorsCoordinates(db, collection, getDocs)
      setItemSelectors(newSelectors)
      setLayersAndMaterial({
        ...layersAndMaterial,
        selectedLayers: newSelectors.map((selector) => ({ layerId: selector.id, layerImage: 'none', layerName: 'none' }))
      })
    })()
      .catch((error) => console.log(error))

    const roomDisplayerElement = document.querySelector('.room-displayer') as HTMLElement
    window.addEventListener('resize', () => setRoomDisplayerMeasurements({ width: roomDisplayerElement.clientWidth, baseYCoordinate: itemPointerYPositionFinder(roomDisplayerElement.clientWidth) }))
    setRoomDisplayerMeasurements({ width: roomDisplayerElement.clientWidth, baseYCoordinate: itemPointerYPositionFinder(roomDisplayerElement.clientWidth) })
    return () => {
      window.removeEventListener('resize', () =>
        setRoomDisplayerMeasurements({ width: roomDisplayerElement.clientWidth, baseYCoordinate: itemPointerYPositionFinder(roomDisplayerElement.clientWidth) })
      )
    }
  }, [roomDisplayerMeasurements.width, roomDisplayerMeasurements.baseYCoordinate])
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
          {itemSelectors.map((itemSelector) =>
            <ItemPointer
              key={itemSelector.id}
              pointerCoordinates={{
                xCoordinate: absoluteXCoordinateFinder(roomDisplayerMeasurements.width, itemSelector.coordX),
                yCoordinate: absoluteYCoordinateFinder(roomDisplayerMeasurements.width, roomDisplayerMeasurements.baseYCoordinate, itemSelector.coordY)
              }}
              roomDisplayerWidth={roomDisplayerMeasurements.width}
              selectItem={async () => {
                setSelectedItemMaterials(await getItemMaterials(db, collection, query, where, getDocs, itemSelector.id))
              }}
            />
          )}
          <MaterialsMenu
            menuCoordinates={{ yCoordinate: roomDisplayerMeasurements.baseYCoordinate, xCoordinate: 0 }}
            roomDisplayerWidth={roomDisplayerMeasurements.width}
            itemMaterials={selectedItemMaterials}
            layersAndMaterial={layersAndMaterial}
            setRoomLayer={setLayersAndMaterial}
          />
          {layersAndMaterial.selectedLayers.filter((layer) => layer.layerImage !== 'none')
            .map((layer) =>
              <Image
                className='absolute top-0 z-0 object-contain'
                src={layer.layerImage}
                layout='fill'
                key={layer.layerId + 'layer'}
                alt={layer.layerName}
              />
            )}
        </div>
      </div>
    </section>
  )
}

export default RoomDisplayer
