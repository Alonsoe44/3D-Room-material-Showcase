const mockDB = jest.fn().mockImplementation(() => [])
const mockCollections = jest.fn().mockImplementation(() => 'mocked collection')
const mockGetDocs = jest.fn().mockImplementation(() => ({ docs: [{ data: () => ({ id: 'mocked id', coordX: 0, coordY: 0 }) }] }))

const fireMock = jest.mock('firebase/firestore/lite', () => ({
  ...jest.requireActual('firebase'), getDocs: mockGetDocs, collection: mockCollections, db: mockDB
}))

export { fireMock, mockDB, mockCollections, mockGetDocs }
