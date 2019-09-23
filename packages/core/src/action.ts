import { Subject } from 'rxjs'

/**
 * This represents an action such as a button click:
 *
 * ```
 * const clickAction = new Action()
 * ...
 * <Button onClick={clickAction.trigger} />
 * ```
 */
export class Action extends Subject<void> {
  public get trigger() {
    return () => this.next()
  }
}
