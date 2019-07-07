import { useEffect, useState } from 'react'
import { Observable } from 'rxjs'

export function useObservable<T>(observable: Observable<T>, initialValue: T): T {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const subscription = observable.subscribe(setValue)
    return () => subscription.unsubscribe()
  }, [observable, initialValue])

  return value
}
