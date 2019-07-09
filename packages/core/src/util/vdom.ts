import { ComponentClass, createElement, FunctionComponent, ReactElement, Component } from 'react'
import { Observable, Subscription } from 'rxjs'
import { map, first } from 'rxjs/operators'
import { combineObject, ObservableRecord } from './rxjs'

type Element<T> = FunctionComponent<T> | ComponentClass<T>

interface Props<T> {
  element: Element<T>
  initialProps: T
  observableProps: Observable<T>
}

interface State<T> {
  props: T
}

class ReactiveElement<T> extends Component<Props<T>, State<T>> {
  private observer?: Subscription

  public constructor(props: Props<T>) {
    super(props)

    this.state = {
      props: props.initialProps
    }
  }

  public componentDidMount() {
    this.observer = this.props.observableProps.subscribe({
      next: props => {
        this.setState({ props })
      },
      error: e => {
        console.error(e)
      }
    })
  }

  public componentWillUnmount() {
    if (this.observer != null) {
      this.observer.unsubscribe()
    }
  }

  public render() {
    return createElement(this.props.element, this.state.props)
  }
}

export function createReactiveElement<T>(
  element: Element<T>,
  propsAsObservables: ObservableRecord<T>
): Observable<ReactElement> {
  const observableProps: Observable<T> = combineObject(propsAsObservables)
  return observableProps.pipe(
    first(),
    map((initialProps: T) => {
      // @ts-ignore
      return createElement(ReactiveElement, { element, initialProps, observableProps })
    })
  )
}
