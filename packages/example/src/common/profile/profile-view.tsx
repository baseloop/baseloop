import { Model } from '@baseloop/core'
import React from 'react'
import Input from '../form/input'
import NumberInput from '../form/number-input'
import Select from '../form/select'
import FormEntry from '../layout/form-entry'
import { Profile } from './profile'

export interface Props {
  profileModel: Model<Profile>
  profile: Profile
  genderOptions: any[]
}

export default function ProfileView({ profileModel, profile, genderOptions }: Props) {
  const selectedGender = genderOptions.find(option => option.id === profile.gender)

  return (
    <section>
      <h1>Profile</h1>
      <p>On this page you may edit your profile.</p>

      <FormEntry label="Name">
        <Input value={profile.name} onChange={profileModel.update('name')} inputProps={{ autoFocus: true }} />
      </FormEntry>

      <FormEntry label="Profession">
        <Input value={profile.profession} onChange={profileModel.update('profession')} />
      </FormEntry>

      <FormEntry label="Gender">
        <Select value={profile.gender} options={genderOptions} onChange={profileModel.update('gender')} />
      </FormEntry>

      <FormEntry label="Annual income">
        <NumberInput value={profile.annualIncome.toString()} onChange={profileModel.update('annualIncome')} />
      </FormEntry>

      <h1>Summary</h1>
      <p>
        {profile.name || 'Mister X'} is a {selectedGender ? selectedGender.label : ''} professional{' '}
        {profile.profession || 'freeloader'}.
      </p>
    </section>
  )
}
