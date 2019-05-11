export { Box } from './box'
export { createReactiveElement } from './util/vdom'
export { combineObject, log } from './util/rxjs'
export { run } from './run'

export const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null
export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'
export const isDevelopment = typeof process !== 'undefined' && process.env.NODE_ENV === 'development'
