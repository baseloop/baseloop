import { lensProp, set } from 'ramda'
import { BehaviorSubject } from 'rxjs'

/**
 * This is a container for state. Allows you to easily update parts of the insides.
 */
export class Model<T> extends BehaviorSubject<T> {
  public constructor(value: T) {
    super(value)
  }

  public get = (): T => super.getValue()

  public set = (value: T): void => super.next(value)

  public update(path: string): (value: any) => void
  public update(path: string, value: any): void

  public update(path: string, value?: any): any {
    if (value === undefined) {
      return (value: any): void => this.update(path, value)
    }
    super.next(set(lensProp(path), value, this.get()))
  }
}
