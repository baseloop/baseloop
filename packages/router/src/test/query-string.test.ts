import { compile, parse } from '../query-string'

test('query string compilation', () => {
  expect(compile({ foo: '1', bar: 'bar', test: 'test ^ test' })).toEqual('?foo=1&bar=bar&test=test%20%5E%20test')
  expect(compile({})).toEqual('')
  expect(compile(null)).toEqual('')
})

test('query string parsing', () => {
  expect(parse('foo=1&bar=bar&test=test%20%5E%20test')).toEqual({ foo: '1', bar: 'bar', test: 'test ^ test' })
  expect(parse('foo=1&foo=2')).toEqual({ foo: '2' })
  expect(parse('')).toEqual({})
  expect(parse(null)).toEqual({})
})
