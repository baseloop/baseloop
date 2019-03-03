import { toPairs } from 'ramda'

export const createQueryParameterString = params => {
  if (params == null) {
    return ''
  }
  return '?' + toPairs(params).map(pair => pair.join('=')).join('&')
}

export const parseQueryParameters = qs => {
  const params = {}
  if (qs != null) {
    qs.split('&').forEach(part => {
      const [key, value] = part.split('=')
      params[key] = value
    })
  }
  return params
}
