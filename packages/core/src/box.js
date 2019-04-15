import { BehaviorSubject } from 'rxjs'
import { lensProp, set } from 'ramda'

class BoxClass extends BehaviorSubject {
  get () {
    return this.value
  }

  set (value) {
    super.next(value)
  }

  update (path, value) {
    if (arguments.length === 1) {
      const me = this
      return value => me.update(path, value)
    }
    super.next(set(lensProp(path), value, this.value))
  }
}

export default function Box (initialState) {
  return new BoxClass(initialState)
}
