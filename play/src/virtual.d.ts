/// <reference types="vite/client" />

declare module 'virtual:kit-manifest' {
  import type { KitMeta } from './types'
  const manifest: KitMeta[]
  export default manifest
}
