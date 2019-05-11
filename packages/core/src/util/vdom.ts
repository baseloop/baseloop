import { createElement, FunctionComponent, ComponentClass, ClassType, ReactElement } from 'react'
import { map } from 'rxjs/operators'
import { combineObject } from './rxjs'
import { Observable } from 'rxjs'

type Element = string | FunctionComponent | ComponentClass | ClassType<any, any, any>

export function createReactiveElement (element: Element, propsWithObservables: Object): Observable<ReactElement> {
  return combineObject(propsWithObservables).pipe(
    map(props => createElement(element, props)) // TODO: children?
  )
}
