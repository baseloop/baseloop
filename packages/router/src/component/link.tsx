import * as React from 'react'
import { RouterView } from '../router-view'

interface LinkProps {
  router: RouterView
  routeName: string
  pathVariables?: object
  queryParameters?: object
  onClick?: (e: Event) => void
  [key: string]: any
}

export const Link = ({ router, routeName, pathVariables, queryParameters, onClick, ...props }: LinkProps) => {
  const handleClick = React.useCallback(
    e => {
      router.navigate(routeName, pathVariables, queryParameters)
      e.preventDefault()
      if (onClick) {
        onClick(e)
      }
    },
    [router, routeName, pathVariables, queryParameters, onClick]
  )

  return <a href={router.buildUrl(routeName, pathVariables, queryParameters)} onClick={handleClick} {...props} />
}
