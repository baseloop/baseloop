import pathToRegexp from 'path-to-regexp'

export function Route ({path, name}) {
  const keys = []
  const regex = pathToRegexp(path, keys, {
    sensitive: false,
    strict: false,
    end: false,
  })
  const compile = pathToRegexp.compile(path)
  const pathParts = getPathParts(path)
  const isFinalParameterOptional = pathParts.length > 0 && pathParts[pathParts.length - 1].endsWith('?')

  function parse(pathname) {
    const results = regex.exec(pathname)
    if (results == null) {
      return null
    }
    const params = results.slice(1)
    const pathVariables = {}
    for (let i = 0; i < params.length; i++) {
      const result = params[i]
      const key = keys[i]
      pathVariables[key.name] = decodeURIComponent(result)
    }
    return pathVariables
  }

  function match(pathname) {
    const pathnameParts = getPathParts(pathname)
    const isExactMatch = pathnameParts.length === pathParts.length || (isFinalParameterOptional && pathnameParts.length === pathParts.length - 1)
    return regex.test(pathname) && isExactMatch
  }

  return {name, match, parse, compile}
}

function getPathParts(path) {
  return path == null ? [] : path.split('/').filter(v => v !== '')
}
