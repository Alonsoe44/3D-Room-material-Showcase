import {
  getFirestore
} from 'firebase/firestore/lite'
import { initializeApp } from 'firebase/app'
import config from '../../firebase/config'
import ItemSelector from '../interfaces/ItemSelector'

const firebaseApp = initializeApp(config)
const db = getFirestore(firebaseApp) as any

const getItemMaterials = async (localDb: any, localCollection: any, localQuery: any, localWhere: any, localGetDocs: any, materialId: string): Promise<any> => {
  const materialsRef = localCollection(localDb, 'materials')
  const itemQuery = localQuery(
    materialsRef,
    localWhere('points', 'array-contains', materialId)
  )
  const itemMaterialsSnapshot = await localGetDocs(itemQuery)
  return itemMaterialsSnapshot.docs.map((point: any) => ({ ...point.data(), id: point.id })
  )
}
const getItemSelectorsCoordinates = async (localDB: any, customCollection: any, customGetDocs: any): Promise<ItemSelector[]> => {
  const itemSelectorsRef = customCollection(localDB, 'points')
  const itemSelectorsSnapshot = await customGetDocs(itemSelectorsRef)
  const itemSelectors = itemSelectorsSnapshot.docs.map((point: any) => ({ ...point.data(), id: point.id })) as ItemSelector[]
  return itemSelectors.map((itemSelector) => ({ ...itemSelector, coordY: -(itemSelector.coordY - 100) }))
}

export { getItemSelectorsCoordinates, db, getItemMaterials }
