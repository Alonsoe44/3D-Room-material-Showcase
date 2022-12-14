import {
  getFirestore,
  collection
} from 'firebase/firestore/lite'
import { initializeApp } from 'firebase/app'
import config from '../../firebase/config'
import ItemSelector from '../interfaces/ItemSelector'

const firebaseApp = initializeApp(config)
const db = getFirestore(firebaseApp) as any

const getItemMaterials = async (db: any, localCollection: any, localQuery: any, localWhere: any, localGetDocs: any, materialId: string): Promise<any> => {
  const materialsRef = collection(db, 'materials')
  const itemQuery = localQuery(
    materialsRef,
    localWhere('points', 'array-contains', materialId)
  )
  const itemMaterialsSnapshot = await localGetDocs(itemQuery)
  const itemMaterials = itemMaterialsSnapshot.docs.map((point: any) => ({ ...point.data(), id: point.id })
  )
  return itemMaterials
}
const getItemSelectorsCoordinates = async (db: any, customCollection: any, customGetDocs: any): Promise<ItemSelector[]> => {
  const itemSelectorsRef = collection(db, 'points')
  const itemSelectorsSnapshot = await customGetDocs(itemSelectorsRef)
  const itemSelectors = itemSelectorsSnapshot.docs.map((point: any) => ({ ...point.data(), id: point.id })) as ItemSelector[]
  const itemSelectorsExchangeCoordinates = itemSelectors.map((itemSelector) => ({ ...itemSelector, coordY: -(itemSelector.coordY - 100) }))
  return itemSelectorsExchangeCoordinates
}

export { getItemSelectorsCoordinates, db, getItemMaterials }
