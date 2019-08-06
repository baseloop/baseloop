export { default as Flex } from './layout/flex'
export { default as resetStyle } from './styles/reset-style'
export { default as PositionFluid } from './layout/position-fluid'
export { useObservable } from './hooks'

export function retrieveDataFromDOM<T>(selector: string): T | null {
  const element = document.querySelector(selector)
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
