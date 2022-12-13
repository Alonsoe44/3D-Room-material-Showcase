import {
  getFirestore,
  collection
} from 'firebase/firestore/lite'
import { initializeApp } from 'firebase/app'
import config from '../../firebase/config'
import ItemSelector from '../interfaces/ItemSelector'

const firebaseApp = initializeApp(config)
const db = getFirestore(firebaseApp) as any

const nothinggg = async (db: any, localCollection: any, localQuery: any, localWhere: any, localGetDocs: any): Promise<any> => {
  const materialsRef = collection(db, 'materials')
  const somePointQuery = localQuery(
    materialsRef,
    localWhere('points', 'array-contains', 'EnRd8hAaNydVdVJ06qgF')
  )
  const pavimentoMaterialsSnapshot = await localGetDocs(somePointQuery)
  const pavimentMaterials = pavimentoMaterialsSnapshot.docs.map((point: any) =>
    point.data()
  )
  console.log(pavimentMaterials)
  return pavimentMaterials
}
const getItemSelectorsCoordinates = async (db: any, customCollection: any, customGetDocs: any): Promise<ItemSelector[]> => {
  const itemSelectorsRef = collection(db, 'points')
  const itemSelectorsSnapshot = await customGetDocs(itemSelectorsRef)
  const itemSelectors = itemSelectorsSnapshot.docs.map((point: any) => ({ ...point.data(), id: point.id })) as ItemSelector[]
  const itemSelectorsExchangeCoordinates = itemSelectors.map((itemSelector) => ({ ...itemSelector, coordY: -(itemSelector.coordY - 100) }))
  return itemSelectorsExchangeCoordinates
}

export { getItemSelectorsCoordinates, db, nothinggg }
