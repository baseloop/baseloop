import React from 'react'
import styled from 'styled-components'
import { Flex } from '@baseloop/ui'
import backgroundImage from '../../static/header-background.png'
import Shield from '../component/shield'
import { HEADER_BACKGROUND, HEADER_FOREGROUND, FOOTER_BACKGROUND } from '../styles/colors'
import Icon from '../component/icon'

const Content = styled(Flex)`
  padding: 1rem;
  max-width: 64rem;

  > div {
    margin-bottom: 2rem;
  }
`

const Header = styled(Flex)`
  background: ${HEADER_BACKGROUND}, url(${backgroundImage});
  padding: 2rem;
  text-align: center;
  height: 17.5rem;
  color: ${HEADER_FOREGROUND};

  h1 {
    font-size: 3rem;
    font-family: 'Merienda', cursive;
  }

  p {
    font-size: 1.5rem;
    margin-top: 1rem;
    font-weight: 200;
  }
`

const ShieldContainer = styled.div`
  text-align: center;
  margin-top: 2.5rem;
  margin-bottom: 1rem;

  > a {
    margin-right: 0.5rem;
  }
`

const FeaturesContainer = styled(Flex)`
  > div {
    margin: 1.25rem 0;
    border-radius: 0.375rem;
    text-align: left;
    width: 30rem;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${FOOTER_BACKGROUND};
  }
`

export default function Home() {
  return (
    <>
      <Header alignItems="center" justifyContent="center">
        <div>
          <h1>Baseloop</h1>
          <p>
            <Icon id="s-wrench" /> A toolkit for writing modern functional reactive web applications in JavaScript.
          </p>
          <ShieldContainer>
            <Shield
              src="https://img.shields.io/npm/v/@baseloop/core.svg?color=green&label=npm%20package"
              alt="Package version"
            />
            <Shield src="https://img.shields.io/npm/l/@baseloop/core.svg?color=green" alt="License" />
            <Shield
              src="https://img.shields.io/discord/551772477165010959.svg?color=green&label=chat on Discord"
              href="https://discord.gg/zMyuFwt"
              alt="Discord link"
            />
          </ShieldContainer>
        </div>
      </Header>
      <Flex direction="row" justifyContent="center">
        <Content direction="column">
          <FeaturesContainer direction="row" wrap="wrap" justifyContent="space-evenly">
            <div>
              <h2>
                <Icon id="s-terminal" /> Functional
              </h2>
              <p>
                We use functional programming to enable predictable program behavior. This leads to highly maintainable
                programs at scale.
              </p>
              <p>
                Programs are easier to comprehend and their behavior is easier to predict, because all state changes are
                transformations rather than mutations and functions are{' '}
                <a
                  href="https://en.wikipedia.org/wiki/Referential_transparency"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  referentially transparent
                </a>
                .
              </p>
            </div>

            <div>
              <h2>
                <Icon id="s-bolt" /> Reactive
              </h2>
              <p>
                Applications with an abundance of events benefit the most from reactive programming, which both
                simplifies your (async) evented code and separates logical concerns.
              </p>
              <p>
                This leads to{' '}
                <a
                  href="https://en.wikipedia.org/wiki/Separation_of_concerns"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Separation of Concerns
                </a>
                , because changes to data are co-located and isolated, thus impossible to change from the outside world.
              </p>
            </div>

            <div>
              <h2>
                <Icon id="s-recycle" /> Unidirectional data flow
              </h2>
              <p>
                Baseloop apps have an explicit data flow where the data always flows predictably in a single direction.
              </p>
              <p>
                This aspect allows you to reason about your program state updates as you know exactly what takes place
                and where. This also makes debugging easier as you can just follow the flow of data like some breadcrumb
                trail.
              </p>
            </div>

            <div>
              <h2>
                <Icon id="s-projectDiagram" /> Atoms, views and controllers
              </h2>
              <p>
                Baseloop is based on an architectural pattern that has atoms, views and controllers. This is built
                specifically for unidirectional data flow and reactive programming in mind.
              </p>
              <p>
                In SVC, every action is an observable and all the state changes are transformations rather than
                mutations. Stores are the single source of truth. Controllers implement logic and views are thin without
                any logic besides highly view-specific logic.
              </p>
            </div>

            <div>
              <h2>
                <Icon id="s-toolbox" /> A toolkit, not a framework
              </h2>
              <p>
                Baseloop is a toolkit (with a guide) and not a framework. We believe in libraries and modularity, where
                you pick the parts you need for your app.
              </p>
              <p>
                This can lead to developers wondering how to go about their apps, which is why we decided to write
                extensive guides and example projects to follow.
              </p>
            </div>

            <div>
              <h2>
                <Icon id="s-userCheck" /> Simple, explicit and concise
              </h2>
              <p>
                Unlike some frameworks and toolkits, Baseloop aims to be explicit in what it does so that you can
                understand what&apos;s going on. After all, Baseloop aims to help you, not hide things from you.
              </p>
              <p>
                We believe in concise code, but not at the expense of simplicity. When code grows too complicated, it
                should be broken down into separate modules. Baseloop follows this ideology, and with the help of
                reactive and functional programming, this can be achieved trivially.
              </p>
            </div>

            <div>
              <h2>
                <Icon id="s-comments" /> Decoupled components
              </h2>
              <p>
                All Baseloop components can be decoupled from each other allowing for maximum code-reuse, testability
                and debugging.
              </p>
              <p>
                This also allows for separation of a component into its own module. That&apos;s ultimately what Baseloop
                is all about: a toolkit of re-usable modules.
              </p>
            </div>

            <div>
              <h2>
                <Icon id="s-copy" /> Separation of concerns
              </h2>
              <p>
                Some developers advocate the use of React components for non-view specific purposes such as Ajax
                requests or application logic. In Baseloop, all React (Preact or Inferno) components are thin and do not
                handle application logic. We believe in separation of concerns and thus views are only used for view
                purposes.
              </p>
            </div>

            <div>
              <h2>
                <Icon id="s-rook" /> Virtual DOM
              </h2>
              <p>Baseloop leverages the concept of a virtual DOM. We support React, Preact and Inferno.</p>
              <p>
                Unlike Vue.js or AngularJS, virtual DOMs are well suited for functional programming with unidirectional
                data flows.
              </p>
            </div>

            <div>
              <h2>Server-side rendering</h2>
              <p>TODO</p>
            </div>

            <div>
              <h2>Time travelling</h2>
              <p>TODO</p>
            </div>

            <div>
              <h2>Documentation</h2>
              <p>TODO</p>
            </div>

            <div>
              <h2>Web APIs</h2>
              <p>TODO</p>
            </div>

            <div>
              <h2>Comparisons with React, Vue, Angular, Circle, MOBX, etc.</h2>
              <p>TODO</p>
            </div>
          </FeaturesContainer>
        </Content>
      </Flex>
    </>
  )
}
