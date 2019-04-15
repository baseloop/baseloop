import React from 'react'
import { interval } from 'rxjs'
import { map } from 'rxjs/operators'
import { useObservables } from '@baseloop/ui'

export default function FormatDate ({date}) {
  const [text] = useObservables([
    interval(1000).pipe(map(() => format(date))),
    format(date)
  ])

  return (
    <span>{text}</span>
  )
}

function format (date) {
  const diff = (new Date).getTime() - date.getTime()
  const seconds = Math.ceil(diff / 1000)
  return `${seconds} seconds ago`
}
