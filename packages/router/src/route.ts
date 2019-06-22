import pathToRegexp from 'path-to-regexp'
import { clone, last } from 'ramda'

interface RouteSettings {
  path: string
  name: string
  defaults?: object
}

export class Route {
  public name: string
  public compile: pathToRegexp.PathFunction<object>

  private readonly isFinalParameterOptional: boolean
  private readonly defaults?: object
  private regex: RegExp
  private keys: any[] = []
  private pathParts: string[]

  public constructor({ path, name, defaults }: RouteSettings) {
    this.regex = pathToRegexp(path, this.keys, {
      end: false,
      sensitive: false,
      strict: false
    })

    this.pathParts = getPathParts(path)
    this.isFinalParameterOptional = this.pathParts.length > 0 && last(this.pathParts)!.endsWith('?')
    this.compile = pathToRegexp.compile(path)
    this.name = name
    this.defaults = defaults
  }

  public parse(pathname: string): object {
    const results = this.regex.exec(pathname)
    if (results == null) {
      return {}
    }
    const params = results.slice(1)
    const pathVariables: Record<string, any> = this.defaults == null ? {} : clone(this.defaults)
    for (let i = 0; i < params.length; i++) {
      const result = params[i]
      const key = this.keys[i]
      if (result != null) {
        pathVariables[key.name] = decodeURIComponent(result)
      }
    }
    return pathVariables
  }

  public match(pathname: string) {
    const pathnameParts = getPathParts(pathname)
    const isExactMatch =
      pathnameParts.length === this.pathParts.length ||
      (this.isFinalParameterOptional && pathnameParts.length === this.pathParts.length - 1)
    return this.regex.test(pathname) && isExactMatch
  }
}

function getPathParts(path: string) {
  return path == null ? [] : path.split('/').filter(v => v !== '')
}
