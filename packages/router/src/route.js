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
    return regex.test(pathname) && pathParts.length === pathnameParts.length
  }

  return {name, match, parse, compile}
}

function getPathParts(path) {
  return path == null ? [] : path.split('/').filter(v => v !== '')
}
