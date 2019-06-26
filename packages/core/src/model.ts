import { lensProp, set } from 'ramda'
import { BehaviorSubject } from 'rxjs'

export class Model<T> extends BehaviorSubject<T> {
  public constructor(value: any) {
    super(value)
  }

  public get(): T {
    return super.getValue()
  }

  public set(value: any): void {
    super.next(value)
  }

  public update(path: string): (value: any) => void
  public update(path: string, value: any): void

  public update(path: string, value?: any): any {
    if (value === undefined) {
      return (value: any): void => this.update(path, value)
    }
    super.next(set(lensProp(path), value, this.get()))
  }
}
