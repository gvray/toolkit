export interface FunctionMeta {
  name: string
  description: string
  descriptionEn?: string
  example: string
  since: string
  category: string
}

export interface KitMeta {
  id: string
  packageName: string
  functions: FunctionMeta[]
}
