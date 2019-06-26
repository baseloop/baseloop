import { Model, createReactiveElement } from '@baseloop/core'
import { of } from 'rxjs'
import ProfileView from './profile-view'

export default function ProfileController() {
  const profile = new Model({
    annualIncome: 1500000,
    birthday: new Date(),
    emails: [{ address: 'bar@baz.foo', type: 'PERSONAL' }, { address: 'foo@bar.baz', type: 'BUSINESS' }],
    gender: null,
    name: 'John Doe',
    profession: 'Plumber'
  })

  return {
    view: createReactiveElement(ProfileView, {
      genderOptions: [{ id: 'FEMALE', label: 'Female' }, { id: 'MALE', label: 'Male' }],
      profile,
      profileStore: of(profile)
    })
  }
}
