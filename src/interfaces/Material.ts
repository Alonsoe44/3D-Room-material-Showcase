interface Material {
  layers: {
    [key: string]: string
  }
  materialPreview: string
  name: string
  points: string[]
  id: string
}

export default Material
