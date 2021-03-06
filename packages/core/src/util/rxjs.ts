import { init, last, reduce, tail } from 'ramda'
import { combineLatest, merge, MonoTypeOperatorFunction, Observable, of } from 'rxjs'
import { catchError, filter, map, mapTo, shareReplay, startWith, tap, withLatestFrom } from 'rxjs/operators'
import { isBrowser } from '../index'
import isPlainObject from 'is-plain-object'

export type ObservableRecord<T> = {
  [P in keyof T]: Observable<T[P]> | T[P] | ObservableRecord<T[P]>
}

export type WithoutObservables<T> = {
  [P in keyof T]: T[P] extends Observable<infer U> ? U : T[P] extends Record<any, any> ? WithoutObservables<T[P]> : T[P]
}

export function log<T>(...args: any[]): MonoTypeOperatorFunction<T> {
  return tap((...params) => {
    const allParams = args.concat(params)
    if (isBrowser) {
      console.log(...allParams)
    } else {
      console.log(...allParams.map(p => (p == null ? null : p.toString())))
    }
  })
}

export function handleErrorsByLogging<T>(): MonoTypeOperatorFunction<T> {
  return catchError((e, obs) => {
    console.error(e)
    return obs
  })
}

export function upon<T>(notifier: Observable<any>): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => {
    const latest = withLatestFrom(source)(notifier)
    const mapper = map(([, source]: [any, T]) => source)
    return mapper(latest)
  }
}

export function awaiting(start: Observable<any>, end: Observable<any>): Observable<boolean> {
  return merge(
    start.pipe(mapTo(true)),
    end.pipe(
      catchError((e, obs) => obs),
      mapTo(false)
    )
  ).pipe(startWith(false), shareReplay())
}

export function filterBy<T>(observableFilter: Observable<boolean>): MonoTypeOperatorFunction<T> {
  return (obs: Observable<T>) =>
    withLatestFrom(observableFilter)(obs).pipe(
      filter((xs: [any, boolean]) => xs[1]),
      map(xs => xs[0])
    )
}

export function isEveryTrue(values: Array<Observable<boolean>>) {
  return combineLatest(values).pipe(map(xs => xs.every(v => v)))
}

export function and(condition: Observable<boolean>): MonoTypeOperatorFunction<boolean> {
  return (obs: Observable<boolean>) => withLatestFrom(condition)(obs).pipe(map((xs: [any, any]) => xs[0] && xs[1]))
}

export function not(): MonoTypeOperatorFunction<boolean> {
  return (obs: Observable<boolean>) => obs.pipe(map(x => !x))
}

interface ObservableAndFullPath {
  value: Observable<any>
  fullPath: string
}

export function combineObject<T>(obj: ObservableRecord<T>): Observable<WithoutObservables<T>> {
  const data = getObservableDataRecursivelyFromObject(obj)

  if (data.length === 0) {
    return of(obj as WithoutObservables<T>)
  }

  const observables = data.map((o: ObservableAndFullPath) => o.value)
  const fullPaths = data.map((o: ObservableAndFullPath) => o.fullPath)

  const createObject = (values: any[]): WithoutObservables<T> => {
    const o = { ...obj }
    values.forEach((value, i) => {
      setObjectValueBasedOnPath(o, fullPaths[i], value)
    })
    return (o as unknown) as WithoutObservables<T>
  }

  return combineLatest(observables).pipe(map(createObject))
}

function getObservableDataRecursivelyFromObject(obj: Record<string, any>, path = ''): ObservableAndFullPath[] {
  const observables: ObservableAndFullPath[] = []

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      if (value != null) {
        const fullPath = path + '.' + key

        if (typeof value['@@observable'] === 'function') {
          observables.push({ value, fullPath })
        } else if (isPlainObject(value)) {
          const xs = getObservableDataRecursivelyFromObject(value, fullPath)
          for (const x of xs) {
            observables.push(x)
          }
        }
      }
    }
  }

  return observables
}

function setObjectValueBasedOnPath<T>(obj: T, path: string, value: any): void {
  const parts = tail(path.split('.'))
  const o: Record<string, any> = reduce((o: Record<string, any>, key: string): any => o[key], obj, init(parts))
  const lastPart = last(parts)
  if (lastPart != null) {
    o[lastPart] = value
  }
}
