import { of } from 'rxjs'
import { createReactiveElement, Store } from '@baseloop/core'
import ProfileView from './profile-view'

export default function ProfileController () {
  const profile = Store({
    name: 'John Doe',
    profession: 'Plumber',
    gender: null,
    annualIncome: 1500000,
    birthday: new Date(),
    emails: [
      {address: 'bar@baz.foo', type: 'PERSONAL'},
      {address: 'foo@bar.baz', type: 'BUSINESS'},
    ],
  })

  return {
    view: createReactiveElement(ProfileView, {
      profile,
      profileStore: of(profile),
      genderOptions: [
        {id: 'FEMALE', label: 'Female'},
        {id: 'MALE', label: 'Male'}],
    }),
  }
}
