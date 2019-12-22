export { default as Flex } from './layout/flex'
export { default as resetStyle } from './styles/reset-style'
export { default as PositionFluid } from './layout/position-fluid'

/**
 * Fetches JSON-encoded data from the DOM with the given key.
 * Looks for an element with attribute name data-<key> and decodes its content.
 */
export function retrieveDataFromDOM<T>(key: string): T | null {
  const element = document.querySelector(`[data-${key}]`)
  if (element != null) {
    const json = element.textContent
    if (json != null) {
      try {
        return JSON.parse(json)
      } catch (e) {
        console.error(e)
      }
    }
  }
  return null
}
