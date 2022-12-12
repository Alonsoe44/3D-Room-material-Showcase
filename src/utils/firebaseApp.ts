import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore/lite'
import { initializeApp } from 'firebase/app'
import config from '../../firebase/config'
import ItemSelector from '../interfaces/itemSelector'

const firebaseApp = initializeApp(config)
const db = getFirestore(firebaseApp) as any

const nothinggg = async (db: any) => {
  const materialsRef = collection(db, 'materials')
  const somePointQuery = query(
    materialsRef,
    where('points', 'array-contains', 'EnRd7hAaNydVdVJ06qgF')
  )
  const pavimentoMaterialsSnapshot = await getDocs(somePointQuery)
  const pavimentMaterials = pavimentoMaterialsSnapshot.docs.map((point) =>
    point.data()
  )
  console.log(pavimentMaterials)
  return pavimentMaterials
}
const getItemSelectorsCoordinates = async (db: any): Promise<ItemSelector[]> => {
  const itemSelectorsRef = collection(db, 'points')
  const itemSelectorsSnapshot = await getDocs(itemSelectorsRef)
  const itemSelectors = itemSelectorsSnapshot.docs.map((point) => ({ ...point.data(), id: point.id })) as ItemSelector[]
  const itemSelectorsExchangeCoordinates = itemSelectors.map((itemSelector) => ({ ...itemSelector, coordY: -(itemSelector.coordY - 100) }))
  return itemSelectorsExchangeCoordinates
}

const getAllMaterials = async (db) => {
  const pointsRef = collection(db, 'materials')
  const pointsSnapshot = await getDocs(pointsRef)
  const points = pointsSnapshot.docs.map((points) => points.data())
  console.log(points)
  return points
}

export { getItemSelectorsCoordinates, getAllMaterials, db }
