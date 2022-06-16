export default interface Textures {
  json(): Textures | PromiseLike<Textures>
  id: string
  name: string
  properties: Property[]
}

export interface Property {
  name: string
  value: Buffer
}
export interface TextureURL {
  timestamp: Date
  profileId: string
  profileName: string
  textures: {
    SKIN: {
      url: string
    }
  }
}
