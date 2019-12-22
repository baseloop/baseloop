import { Atom } from '@baseloop/atom'
import { EmailType, Profile } from './profile'
import ProfileView from './profile-view'
import * as React from 'react'

export default function ProfileController() {
  const profile = new Atom<Profile>({
    annualIncome: 1500000,
    birthday: new Date(),
    emails: [
      { address: 'bar@baz.foo', type: EmailType.PERSONAL },
      { address: 'foo@bar.baz', type: EmailType.BUSINESS }
    ],
    gender: null,
    name: 'John Doe',
    profession: 'Plumber'
  })

  profile.subscribe(p => console.log('profile model', p))

  return {
    view: React.createElement(ProfileView, {
      genderOptions: [{ id: 'FEMALE', label: 'Female' }, { id: 'MALE', label: 'Male' }],
      profile
    })
  }
}
