import { Route } from '../route'

test('route matching', () => {
  expect(Route({path: '/'}).match('/docs')).toBe(false)
  expect(Route({path: '/'}).match('/')).toBe(true)

  expect(Route({path: '/docs'}).match('/docs')).toBe(true)
  expect(Route({path: '/docs/:page'}).match('/docs/page')).toBe(true)
  expect(Route({path: '/docs'}).match('/')).toBe(false)

  expect(Route({path: '/encoding/:test'}).match('/encoding/test%2F%20%5E%20%C2%B4%20ersdf')).toBe(true)
})


test('route parsing', () => {
  expect(Route({path: '/docs/:id/foo/:foo'}).parse('/docs/5/foo/10')).toEqual({id: '5', foo: '10'})
  expect(Route({path: '/docs/:id/foo/:foo'}).parse('/docs/5')).toEqual(null)

  expect(Route({path: '/encoding/:test'}).parse('/encoding/test%2F%20%5E%20%C2%B4%20ersdf')).toEqual({test: 'test/ ^ ´ ersdf'})
})

test('route compilation', () => {
  expect(Route({path: '/docs/:id/foo/:foo'}).compile({id: 100, foo: 'test'})).toEqual('/docs/100/foo/test')
  expect(Route({path: '/encoding/:test'}).compile({test: 'test/ ^ ´ ersdf'})).toEqual('/encoding/test%2F%20%5E%20%C2%B4%20ersdf')
})
