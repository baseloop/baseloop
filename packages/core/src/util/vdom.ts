import { ComponentClass, createElement, FunctionComponent, ReactElement } from 'react'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { combineObject, ObservableRecord } from './rxjs'

type Element<T> = FunctionComponent<T> | ComponentClass<T>

export function createReactiveElement<T>(
  element: Element<T>,
  propsAsObservables: ObservableRecord<T>
): Observable<ReactElement> {
  return combineObject(propsAsObservables).pipe(map(props => createElement(element, props)))
}
