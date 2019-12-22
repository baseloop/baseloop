import { Atom } from './index'

describe('Atom', () => {
  test('Chaining of lenses references correctly', () => {
    const a = new Atom({
      user: {
        name: 'Hey',
        address: {
          street: 'Fredikanterassi',
          city: 'Helsinki'
        }
      }
    })

    a.lens('user')
      .lens('address')
      .lens('city')
      .set('Lahti')

    expect(a.get()).toEqual({
      user: {
        name: 'Hey',
        address: {
          street: 'Fredikanterassi',
          city: 'Lahti'
        }
      }
    })
  })
})
