import flatRoutes from '../flat-routes'

test('flattens routes', () => {
  const routes = [
    {path: '/', name: 'home'},
    {
      path: '/foo', name: 'foo', children: [
        {path: '/test', name: 'test'},
      ],
    },
    {
      path: '/qux', name: 'qux', children: [
        {path: '/a', name: 'a'},
        {
          path: '/b', name: 'b', children: [
            {path: '/asd', name: 'asd'},
          ],
        },
      ],
    },
  ]

  expect(flatRoutes(routes)).toEqual([
    {path: '/', name: 'home'},
    {path: '/foo', name: 'foo'},
    {path: '/foo/test', name: 'foo.test'},
    {path: '/qux', name: 'qux'},
    {path: '/qux/a', name: 'qux.a'},
    {path: '/qux/b', name: 'qux.b'},
    {path: '/qux/b/asd', name: 'qux.b.asd'},
  ])
})
