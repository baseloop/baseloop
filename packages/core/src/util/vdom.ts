import { ClassType, ComponentClass, createElement, FunctionComponent, ReactElement } from 'react'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { combineObject } from './rxjs'

type Element = string | FunctionComponent | ComponentClass | ClassType<any, any, any>

export function createReactiveElement(element: Element, propsWithObservables: object): Observable<ReactElement> {
  return combineObject(propsWithObservables).pipe(
    map(props => createElement(element, props)) // TODO: children?
  )
}
