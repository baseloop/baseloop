import { lensProp, set } from 'ramda'
import { BehaviorSubject } from 'rxjs'

export class Box<T> extends BehaviorSubject<T> {
  constructor(value: any) {
    super(value)
  }

  get() {
    return super.getValue()
  }

  set(value: any) {
    super.next(value)
  }

  update(path: string): (value: any) => void
  update(path: string, value: any): void

  update(path: string, value?: any): any {
    if (value === undefined) {
      return (value: any) => this.update(path, value)
    }
    super.next(set(lensProp(path), value, this.get()))
  }
}
