/**
 * Check if the code is running in a browser environment.
 *
 * @remarks
 * This function detects if the code is running in a browser by checking for the presence of `window` and `document`
 * objects, and whether `document.createElement` function is available.
 *
 * @returns A boolean value indicating whether the code is running in a browser environment.
 * @deprecated Use isBrowser from @gvray/envkit
 *
 * @example
 * ```typescript
 * import { isBrowser } from "./browserDetection";
 *
 * if (isBrowser()) {
 *     console.log("This is running in a browser!");
 * } else {
 *     console.log("This is not a browser environment!");
 * }
 * ```
 */
export const isBrowser = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'

export default isBrowser
