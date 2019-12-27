import { useEffect, useState } from 'react'
import { ImmutableAtom } from '@baseloop/atom'
import { combineLatest } from 'rxjs'

export function useAtom<A>(a: ImmutableAtom<A>): A
export function useAtom<A, B>(a: ImmutableAtom<A>, b: ImmutableAtom<B>): [A, B]
export function useAtom<A, B, C>(a: ImmutableAtom<A>, b: ImmutableAtom<B>, c: ImmutableAtom<C>): [A, B, C]
export function useAtom<A, B, C, D>(
  a: ImmutableAtom<A>,
  b: ImmutableAtom<B>,
  c: ImmutableAtom<C>,
  d: ImmutableAtom<D>
): [A, B, C, D]
export function useAtom<A, B, C, D, E>(
  a: ImmutableAtom<A>,
  b: ImmutableAtom<B>,
  c: ImmutableAtom<C>,
  d: ImmutableAtom<D>,
  e: ImmutableAtom<E>
): [A, B, C, D, E]
export function useAtom<A, B, C, D, E, F>(
  a: ImmutableAtom<A>,
  b: ImmutableAtom<B>,
  c: ImmutableAtom<C>,
  d: ImmutableAtom<D>,
  e: ImmutableAtom<E>,
  f: ImmutableAtom<F>
): [A, B, C, D, E, F]
export function useAtom<A, B, C, D, E, F, G>(
  a: ImmutableAtom<A>,
  b: ImmutableAtom<B>,
  c: ImmutableAtom<C>,
  d: ImmutableAtom<D>,
  e: ImmutableAtom<E>,
  f: ImmutableAtom<F>,
  g: ImmutableAtom<G>
): [A, B, C, D, E, F, G]
export function useAtom<A, B, C, D, E, F, G, H>(
  a: ImmutableAtom<A>,
  b: ImmutableAtom<B>,
  c: ImmutableAtom<C>,
  d: ImmutableAtom<D>,
  e: ImmutableAtom<E>,
  f: ImmutableAtom<F>,
  g: ImmutableAtom<G>,
  h: ImmutableAtom<H>
): [A, B, C, D, E, F, G, H]
export function useAtom(...atoms: ImmutableAtom<any>[]): any {
  const initialValues = atoms.map(atom => atom.getValue())
  const [, setV] = useState(initialValues)
  useEffect(() => {
    const subscription = combineLatest(atoms).subscribe(setV)
    return () => subscription.unsubscribe()
  }, atoms)
  return initialValues.length == 1 ? initialValues[0] : initialValues
}
