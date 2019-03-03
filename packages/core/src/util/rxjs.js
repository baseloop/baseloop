import { combineLatest, Observable, of } from 'rxjs'
import { clone, init, is, last, reduce, tail } from 'ramda'
import { tap } from 'rxjs/operators'

export function log () {
  const args = Array.prototype.slice.call(arguments)
  return tap(function () {
    console.log.apply(null, args.concat(Array.prototype.slice.call(arguments)))
  })
}

export function combineObject (obj) {
  const data = getObservableDataRecursivelyFromObject(obj)
  const observables = data.map(o => o.value)
  const fullPaths = data.map(o => o.fullPath)

  if (observables.length === 0) {
    return of(obj)
  }

  const createObject = (...values) => {
    const o = clone(obj)
    values.forEach((value, i) => {
      setObjectValueBasedOnPath(o, fullPaths[i], value)
    })
    return o
  }

  return combineLatest(...observables.concat(createObject))
}

function getObservableDataRecursivelyFromObject (obj, path = '') {
  const observables = []

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      const fullPath = path + '.' + key

      if (is(Observable, value)) {
        observables.push({value, fullPath})
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

function setObjectValueBasedOnPath (object, path, value) {
  const parts = tail(path.split('.'))
  const o = reduce((o, key) => o[key], object, init(parts))
  o[last(parts)] = value
}
