import { Route } from '../route'

test('route matching', () => {
  expect(new Route({ path: '/', name: '' }).match('/docs')).toBe(false)
  expect(new Route({ path: '/', name: '' }).match('/')).toBe(true)

  expect(new Route({ path: '/docs', name: '' }).match('/docs')).toBe(true)
  expect(new Route({ path: '/docs/:page', name: '' }).match('/docs/page')).toBe(true)
  expect(new Route({ path: '/docs', name: '' }).match('/')).toBe(false)

  expect(new Route({ path: '/encoding/:test', name: '' }).match('/encoding/test%2F%20%5E%20%C2%B4%20ersdf')).toBe(true)

  expect(new Route({ path: '/docs/:page?', name: '' }).match('/docs')).toBe(true)
  expect(new Route({ path: '/docs/:page?/foo/:foo?', name: '' }).match('/docs/5/foo')).toBe(true)
})

test('route parsing', () => {
  expect(new Route({ path: '/docs/:id/foo/:foo', name: '' }).parse('/docs/5/foo/10')).toEqual({ id: '5', foo: '10' })
  expect(new Route({ path: '/docs/:id/foo/:foo', name: '' }).parse('/docs/5')).toEqual({})

  expect(new Route({ path: '/encoding/:test', name: '' }).parse('/encoding/test%2F%20%5E%20%C2%B4%20ersdf')).toEqual({
    test: 'test/ ^ ´ ersdf'
  })
})

test('route compilation', () => {
  expect(new Route({ path: '/docs/:id/foo/:foo', name: '' }).compile({ id: 100, foo: 'test' })).toEqual(
    '/docs/100/foo/test'
  )
  expect(new Route({ path: '/encoding/:test', name: '' }).compile({ test: 'test/ ^ ´ ersdf' })).toEqual(
    '/encoding/test%2F%20%5E%20%C2%B4%20ersdf'
  )
})
