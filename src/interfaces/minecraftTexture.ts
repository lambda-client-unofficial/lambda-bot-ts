export default interface Texture {
  id: string
  name: string
  properties: Property[]
}

export interface Property {
  name: string
  value: string
}