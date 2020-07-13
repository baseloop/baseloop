import { ComponentClass, createElement, FunctionComponent, ReactElement } from 'react'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { combineObject, ObservableRecord } from './rxjs'

type Element<T> = FunctionComponent<T> | ComponentClass<T>

/**
 * This is like React.createElement(X) (or <X />). The only difference is: this lets you pass Observables as props.
 * The result is a React element. You can mix and match both Observable and non-Observable props.
 */
export function createReactiveElement<T>(
  element: Element<T>,
  propsAsObservables: ObservableRecord<T>
): Observable<ReactElement> {
  return combineObject(propsAsObservables).pipe(map((props: any) => createElement(element, props)))
}
