import { equals, Lens, lensProp, view, set } from 'ramda'
import { BehaviorSubject, Subscriber, Subscription } from 'rxjs'

export abstract class ImmutableAtom<T> extends BehaviorSubject<T> {
  abstract get(): T

  view<K extends keyof T>(k: K): ImmutableAtom<T[K]>

  view<U>(key: string): ImmutableAtom<U> {
    if (key == null) {
      return (this as unknown) as ImmutableAtom<U>
    }
    const lens = lensProp(key)
    return new AtomView<T, U>(this, lens)
  }
}

export abstract class MutableAtom<T> extends ImmutableAtom<T> {
  abstract modify(updateFn: (x: T) => T): void

  set(x: T) {
    this.modify(() => x)
  }

  lens<K extends keyof T>(k: K): Atom<T[K]>

  lens<U>(key: string): Atom<any> {
    const lens = lensProp(key)
    return new LensedAtom(this, lens)
  }
}

export class Atom<T> extends MutableAtom<T> {
  constructor(initialValue: T) {
    super(initialValue)
  }

  get() {
    return this.getValue()
  }

  modify(fn: (x: T) => T) {
    const prevValue = this.getValue()
    const next = fn(prevValue)

    if (!equals(prevValue, next)) {
      this.next(next)
    }
  }

  set(x: T) {
    const prevValue = this.getValue()

    if (!equals(prevValue, x)) {
      this.next(x)
    }
  }
}

export class LensedAtom<From, To> extends MutableAtom<To> {
  constructor(private _source: Atom<From>, private _lens: Lens) {
    super(undefined!)
  }

  get() {
    return this._subscription ? this.getValue() : view<From, To>(this._lens, this._source.get())
  }

  modify(updateFn: (x: To) => To) {
    this._source.modify(x => {
      return set(this._lens, updateFn(view<From, To>(this._lens, x)), x)
    })
  }

  set(newValue: To) {
    this._source.modify(x => {
      return set(this._lens, newValue, x)
    })
  }

  private _onSourceValue(x: From) {
    const prevValue = this.getValue()
    const next = view<From, To>(this._lens, x)

    if (!equals(prevValue, next)) {
      this.next(next)
    }
  }

  private _subscription: Subscription | null = null
  private _refCount = 0

  _subscribe(subscriber: Subscriber<To>) {
    if (!this._subscription) {
      this._subscription = this._source.subscribe(x => this._onSourceValue(x))
    }
    this._refCount++

    const sub = new Subscription(() => {
      if (--this._refCount <= 0 && this._subscription) {
        this._subscription.unsubscribe()
        this._subscription = null
      }
    })
    sub.add(super._subscribe(subscriber))

    return sub
  }

  unsubscribe() {
    if (this._subscription) {
      this._subscription.unsubscribe()
      this._subscription = null
    }
    this._refCount = 0

    super.unsubscribe()
  }
}

export class AtomView<From, To> extends ImmutableAtom<To> {
  constructor(private _source: ImmutableAtom<From>, private _lens: Lens) {
    super(undefined!)
  }

  get() {
    return this._subscription ? this.getValue() : view<From, To>(this._lens, this._source.get())
  }

  private _onSourceValue(x: From) {
    const prevValue = this.getValue()
    const next = view<From, To>(this._lens, x)

    if (!equals(prevValue, next)) {
      this.next(next)
    }
  }

  private _subscription: Subscription | null = null
  private _refCount = 0

  _subscribe(subscriber: Subscriber<To>) {
    if (!this._subscription) {
      this._subscription = this._source.subscribe(x => this._onSourceValue(x))
    }
    this._refCount++

    const sub = new Subscription(() => {
      if (--this._refCount <= 0 && this._subscription) {
        this._subscription.unsubscribe()
        this._subscription = null
      }
    })
    sub.add(super._subscribe(subscriber))

    return sub
  }

  unsubscribe() {
    if (this._subscription) {
      this._subscription.unsubscribe()
      this._subscription = null
    }
    this._refCount = 0

    super.unsubscribe()
  }
}
