import { Observable, combineLatest } from 'rxjs'
import { useEffect, useState } from 'react'

export function useObservables<T> (...observablePairs: [Observable<T>, any][]) {
  const observable = combineLatest(observablePairs.map(pair => pair[0]))
  const initialValues = observablePairs.map(pair => pair[1])

  const [, setValue] = useState(initialValues)

  useEffect(() => {
    const subscription = observable.subscribe(setValue)
    return () => subscription.unsubscribe()
  }, observablePairs)

  return initialValues
}
