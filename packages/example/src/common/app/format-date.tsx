import { useObservable } from '@baseloop/ui'
import React from 'react'
import { interval } from 'rxjs'
import { map } from 'rxjs/operators'

interface Params {
  date: Date
}

function format(date: Date) {
  const diff = new Date().getTime() - date.getTime()
  const seconds = Math.ceil(diff / 1000)
  return `${seconds} seconds ago`
}

export default function FormatDate({ date }: Params) {
  const text = useObservable(interval(1000).pipe(map(() => format(date))), format(date))

  return <span>{text}</span>
}
