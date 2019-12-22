import React, { InputHTMLAttributes } from 'react'
import Input from './input'
import { Atom } from '@baseloop/atom'

interface Props {
  onChange?: (value: string) => void
  value: Atom<number>
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export default function NumberInput(props: Props) {
  return <Input {...props} />
}
