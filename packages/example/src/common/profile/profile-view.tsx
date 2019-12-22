import { Atom, ImmutableAtom } from '@baseloop/atom'
import React from 'react'
import Input from '../form/input'
import NumberInput from '../form/number-input'
import Select from '../form/select'
import FormEntry from '../layout/form-entry'
import { Gender, Profile } from './profile'
import { useAtom } from '@baseloop/hooks'

export interface Props {
  profile: Atom<Profile>
  genderOptions: any[]
}

export default function ProfileView({ profile, genderOptions }: Props) {
  return (
    <section>
      <h1>Profile</h1>
      <p>On this page you may edit your profile.</p>

      <FormEntry label="Name">
        <Input value={profile.lens('name')} inputProps={{ autoFocus: true }} />
      </FormEntry>

      <FormEntry label="Profession">
        <Input value={profile.lens('profession')} />
      </FormEntry>

      <FormEntry label="Gender">
        <Select value={profile.lens('gender')} options={genderOptions} />
      </FormEntry>

      <FormEntry label="Annual income">
        <NumberInput value={profile.lens('annualIncome')} />
      </FormEntry>

      <Summary
        genderOptions={genderOptions}
        name={profile.view('name')}
        gender={profile.view('gender')}
        profession={profile.view('profession')}
      />
    </section>
  )
}

interface SummaryProps {
  genderOptions: any[]
  name: ImmutableAtom<string>
  gender: ImmutableAtom<Gender | null>
  profession: ImmutableAtom<string>
}

function Summary({ name: nameAtom, gender: genderAtom, profession: professionAtom, genderOptions }: SummaryProps) {
  const [name, gender, profession] = useAtom(nameAtom, genderAtom, professionAtom)
  const selectedGender = genderOptions.find(option => option.id === gender)
  return (
    <>
      <h1>Summary</h1>
      <p>
        {name || 'Mister X'} is a {selectedGender ? selectedGender.label : ''} professional {profession || 'freeloader'}
        .
      </p>
    </>
  )
}
