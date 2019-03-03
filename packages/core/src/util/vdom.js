import React from 'react'
import { map } from 'rxjs/operators'
import { combineObject } from './rxjs'

export function createReactiveElement (element, propsWithObservables) {
  return combineObject(propsWithObservables).pipe(
    map(props => React.createElement(element, props)), // TODO: children?
  )
}
