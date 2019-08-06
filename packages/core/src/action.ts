import { Subject } from 'rxjs'

export class Action extends Subject<void> {
  public get trigger() {
    return () => this.next()
  }
}
