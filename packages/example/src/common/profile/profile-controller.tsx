import { Atom } from '@baseloop/atom'
import { createReactiveElement } from '@baseloop/core'
import { of } from 'rxjs'
import { EmailType, Profile } from './profile'
import ProfileView from './profile-view'

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

  return {
    view: createReactiveElement(ProfileView, {
      genderOptions: [{ id: 'FEMALE', label: 'Female' }, { id: 'MALE', label: 'Male' }],
      profile: of(profile)
    })
  }
}
