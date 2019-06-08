import flatRoutes from '../flat-routes'

test('flattens routes', () => {
  const routes = [
    { path: '/', name: 'home' },
    {
      children: [{ path: '/test', name: 'test' }],
      name: 'foo',
      path: '/foo'
    },
    {
      children: [
        { path: '/a', name: 'a' },
        {
          children: [{ path: '/asd', name: 'asd' }],
          name: 'b',
          path: '/b'
        }
      ],
      name: 'qux',
      path: '/qux'
    }
  ]

  expect(flatRoutes(routes)).toEqual([
    { path: '/', name: 'home' },
    { path: '/foo', name: 'foo' },
    { path: '/foo/test', name: 'foo.test' },
    { path: '/qux', name: 'qux' },
    { path: '/qux/a', name: 'qux.a' },
    { path: '/qux/b', name: 'qux.b' },
    { path: '/qux/b/asd', name: 'qux.b.asd' }
  ])
})
