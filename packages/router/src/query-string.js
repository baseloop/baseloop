import { toPairs } from 'ramda'

export const compile = params => {
  if (params == null || Object.keys(params).length === 0) {
    return ''
  }
  return '?' + toPairs(params).map(([key, value]) => {
    if (value == null || value === '') {
      return key
    }
    return key + '=' + encodeURIComponent(value)
  }).join('&')
}

export const parse = qs => {
  const params = {}
  if (qs != null && qs !== '') {
    qs.split('&').forEach(part => {
      const [key, value] = part.split('=')
      params[key] = decodeURIComponent(value)
    })
  }
  return params
}
