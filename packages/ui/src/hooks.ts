import { useEffect, useState } from 'react'
import { combineLatest, Observable } from 'rxjs'

export function useObservables<T>(...observablePairs: Array<[Observable<T>, any]>) {
  const observable = combineLatest(observablePairs.map(pair => pair[0]))
  const initialValues = observablePairs.map(pair => pair[1])

  const [, setValue] = useState(initialValues)

  useEffect(() => {
    const subscription = observable.subscribe(setValue)
    return () => subscription.unsubscribe()
  }, observablePairs)

  return initialValues
}
