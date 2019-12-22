import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import { Atom } from '@baseloop/atom'
import { useAtom } from '@baseloop/hooks'

interface Props {
  onChange: (value: string) => void
  value: Atom<string>
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export default function Input(props: Props) {
  const value = useAtom(props.value)

  return <input value={value == null ? '' : value} type="text" {...props.inputProps} onChange={handleChange} />

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    props.onChange(value)
    props.value.set(value)
  }
}

Input.defaultProps = {
  inputProps: {},
  onChange: () => null
}
