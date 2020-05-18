import flatRoutes from '../flat-routes'

test('flattens routes', () => {
  const routes = [
    { path: '/', name: 'home' },
    {
      name: 'foo',
      path: '/foo'
    },
    {
      name: 'qux',
      path: '/qux'
    }
  ]

  expect(flatRoutes(routes)).toEqual([
    { path: '/', name: 'home' },
    { path: '/foo', name: 'foo' },
    { path: '/qux', name: 'qux' }
  ])
})
