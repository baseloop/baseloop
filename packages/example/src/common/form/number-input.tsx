import React, { InputHTMLAttributes } from 'react'
import Input from './Input'

interface Props {
  onChange: (value: string) => void,
  value: string,
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export default function NumberInput (props: Props) {
  return <Input {...props}/>
}
