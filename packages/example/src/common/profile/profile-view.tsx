import React from 'react'
import Input from '../form/Input'
import NumberInput from '../form/number-input'
import Select from '../form/Select'
import FormEntry from '../layout/form-entry'
import { Box } from '@baseloop/core'

interface Props {
  profileStore: Box<{}>,
  profile: any,
  genderOptions: any[]
}

export default class ProfileView extends React.PureComponent<Props> {
  render () {
    const {profileStore, profile, genderOptions} = this.props

    const selectedGender = genderOptions.find(option => option.id === profile.gender)

    return (
      <section>
        <h1>Profile</h1>
        <p>On this page you may edit your profile.</p>

        <FormEntry label="Name">
          <Input value={profile.name} onChange={profileStore.update('name')} inputProps={{autoFocus: true}}/>
        </FormEntry>

        <FormEntry label="Profession">
          <Input value={profile.profession} onChange={profileStore.update('profession')}/>
        </FormEntry>

        <FormEntry label="Gender">
          <Select value={profile.gender} options={genderOptions} onChange={profileStore.update('gender')}/>
        </FormEntry>

        <FormEntry label="Annual income">
          <NumberInput value={profile.annualIncome} onChange={profileStore.update('annualIncome')}/>
        </FormEntry>

        <h1>Summary</h1>
        <p>{profile.name || 'Mister X'} is a {selectedGender ? selectedGender.label : ''} professional {profile.profession || 'freeloader'}.</p>
      </section>
    )
  }
}
