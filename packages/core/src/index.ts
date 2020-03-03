export { Model } from './model'
export { Action } from './action'
export { createReactiveElement } from './util/vdom'
export { combineObject, log, handleErrorsByLogging, upon, awaiting, filterBy, isEveryTrue, and, not } from './util/rxjs'
export { run } from './run'

export const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null
export const isServer = isNode
export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'
export const isDevelopment = typeof process !== 'undefined' && process.env.NODE_ENV === 'development'
export const isProduction = typeof process !== 'undefined' && process.env.NODE_ENV === 'production'
export const isTest = typeof process !== 'undefined' && process.env.NODE_ENV === 'test'
