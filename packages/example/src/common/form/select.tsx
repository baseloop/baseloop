import React, { ChangeEvent } from 'react'
import { Atom } from '@baseloop/atom'
import { useAtom } from '@baseloop/hooks'

interface Option {
  id: string
  label: string
}

interface Props {
  value: Atom<string | null>
  options: Option[]
  onChange?: (value: string) => void
}

export default function Select(props: Props) {
  const value = useAtom(props.value)

  return (
    <select onChange={handleChange} value={value || ''}>
      <option key="default">Choose...</option>
      {props.options.map((option, i) => (
        <option value={option.id} key={i}>
          {option.label}
        </option>
      ))}
    </select>
  )

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
    props.value.set(e.target.value)
  }
}

Select.defaultProps = {
  onChange: () => null,
  options: []
}
