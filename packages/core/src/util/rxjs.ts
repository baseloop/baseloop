import { clone, init, is, last, reduce, tail } from 'ramda'
import { combineLatest, Observable, of, MonoTypeOperatorFunction } from 'rxjs'
import { map, tap } from 'rxjs/operators'

export type ObservableRecord<T> = {
  [P in keyof T]: Observable<T[P]> | T[P] | ObservableRecord<T[P]>
}

export function log<T>(): MonoTypeOperatorFunction<T> {
  const args = Array.prototype.slice.call(arguments)

  return tap(function(): void {
    const allParams = args.concat(Array.prototype.slice.call(arguments))
    console.log(...allParams)
  })
}

interface ObservableAndFullPath {
  value: Observable<any>
  fullPath: string
}

export function combineObject<T>(obj: ObservableRecord<T>): Observable<T> {
  const data = getObservableDataRecursivelyFromObject(obj)

  if (data.length === 0) {
    return of(obj as T)
  }

  const observables = data.map((o: ObservableAndFullPath) => o.value)
  const fullPaths = data.map((o: ObservableAndFullPath) => o.fullPath)

  const createObject = (values: any[]): T => {
    const o = clone(obj as T)
    values.forEach((value, i) => {
      setObjectValueBasedOnPath(o, fullPaths[i], value)
    })
    return o
  }

  return combineLatest(...observables).pipe(map(createObject))
}

function getObservableDataRecursivelyFromObject(obj: Record<string, any>, path = ''): ObservableAndFullPath[] {
  const observables: ObservableAndFullPath[] = []

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      const fullPath = path + '.' + key

      if (is(Observable, value)) {
        observables.push({ value, fullPath })
      } else if (is(Object, value)) {
        const xs = getObservableDataRecursivelyFromObject(value, fullPath)
        for (const x of xs) {
          observables.push(x)
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
