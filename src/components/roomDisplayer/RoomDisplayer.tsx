import { collection, getDocs, query, where } from 'firebase/firestore/lite'
import Image from 'next/legacy/image'
import React, { useEffect, useState } from 'react'
import ItemSelector from '../../interfaces/ItemSelector'
import Material from '../../interfaces/Material'
import RoomDisplayerMeasurements from '../../interfaces/RoomDisplayerMeasurements'
import { db, getItemMaterials, getItemSelectorsCoordinates } from '../../utils/firebaseApp'
import { absoluteXCoordinateFinder, absoluteYCoordinateFinder, itemPointerYPositionFinder } from '../../utils/helpers'
import ItemPointer from '../itemPointer/ItemPointer'
import MaterialsMenu from '../materialsMenu/MaterialsMenu'

const RoomDisplayer = (): any => {
  const [roomDisplayerMeasurements, setRoomDisplayerMeasurements] = useState<RoomDisplayerMeasurements>({ width: 390, baseYCoordinate: 100 })
  const [itemSelectors, setItemSelectors] = useState<ItemSelector[]>([])
  const [selectedItem, setSelectedItem] = useState<Material[]>([])
  console.log(itemSelectors)
  console.log(selectedItem)
  useEffect(() => {
    (async () => {
      setItemSelectors(await getItemSelectorsCoordinates(db, collection, getDocs))
    })().catch((error) => console.log(error))

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
                setSelectedItem(await getItemMaterials(db, collection, query, where, getDocs, itemSelector.id))
              }}
            />
          )}
          <MaterialsMenu
            menuCoordinates={{ yCoordinate: roomDisplayerMeasurements.baseYCoordinate, xCoordinate: 0 }}
            roomDisplayerWidth={roomDisplayerMeasurements.width}
            itemMaterials={selectedItem}
          />
        </div>
      </div>
    </section>
  )
}

export default RoomDisplayer
