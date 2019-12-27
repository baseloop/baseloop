import { merge, Observable } from 'rxjs'
import { catchError, mapTo } from 'rxjs/operators'
import { Atom } from '@baseloop/atom'

export function awaiting(start: Observable<any>, end: Observable<any>): Atom<boolean> {
  const state = new Atom(false)
  merge(
    start.pipe(mapTo(true)),
    end.pipe(
      catchError((e, obs) => obs),
      mapTo(false)
    )
  ).subscribe(value => state.set(value))
  return state
}
