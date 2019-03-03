import { BehaviorSubject } from 'rxjs'
import { lensProp, set } from 'ramda'

class StoreClass extends BehaviorSubject {
  update (path, value) {
    if (arguments.length === 1) {
      const me = this
      return value => me.update(path, value)
    }
    super.next(set(lensProp(path), value, this.value))
  }
}

export default function Store (initialState) {
  return new StoreClass(initialState)
}
