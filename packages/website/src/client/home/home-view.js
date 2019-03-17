import React from 'react'
import { css } from 'styled-components'
import Flex from '@baseloop/ui/src/layout/flex'
import backgroundImage from '../../static/header-background.png'
import Shield from '../component/shield'
import { FOOTER_BACKGROUND } from '../styles/colors'
import Icon from '../component/icon'

const contentStyle = css`
  padding: 16px;
  width: 1024px;
  
  > div {
    margin-bottom: 32px;
  }
`

const headerStyle = css`
  background: url(${backgroundImage}),linear-gradient(to top right,#2b5f7a,#7fc6e9) repeat;
  padding: 32px;
  text-align: center;
  height: 192px;
  color: #e4f6ff;
  border-top: 1px solid #b1d5e6;
  border-bottom: 1px solid #1d333e;
  
  h1 {
    font-size: 48px;
    font-family: "Merienda", cursive;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  }
  
  p {
    font-size: 20px;
    margin-top: 16px;
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
  }
`

const shieldStyle = css`
  text-align: center;
  margin-bottom: 16px;
  
  > a {
    margin-right: 8px;
  }
`

const featuresContainerStyle = css`
  > div {
    margin: 32px 0;
    border-radius: 6px;
    text-align: center;
    width: 320px;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 16px;
    color: ${FOOTER_BACKGROUND};
  }
`

export default function Home () {
  return (
    <>
      <Flex css={headerStyle} alignItems="center" justifyContent="center">
        <div>
          <h1>Baseloop</h1>
          <p><Icon id="s-wrench" /> A toolkit for writing modern functional reactive web applications in JavaScript.</p>
        </div>
      </Flex>
      <Flex justifyContent="center">
        <Flex css={contentStyle} direction="column">
          <div css={shieldStyle}>
            <Shield src="https://img.shields.io/npm/v/@baseloop/core.svg?color=green&label=npm%20package" />
            <Shield src="https://img.shields.io/npm/l/@baseloop/core.svg?color=green" />
            <Shield src="https://img.shields.io/discord/551772477165010959.svg?color=green&label=chat%20on%20Discord" href="https://discord.gg/zMyuFwt" />
          </div>

          <Flex css={featuresContainerStyle} direction="row" wrap="wrap" justifyContent="space-between">
            <div>
              <h2><Icon id="s-terminal" /> Functional</h2>
              <p>We use functional programming to enable predictable program behavior. This leads to highly maintainable programs at scale.</p>
              <p>Programs are easier to comprehend and their behavior is easier to predict, because all state changes are transformations rather than mutations and functions are <a href="https://en.wikipedia.org/wiki/Referential_transparency" target="_blank">referentially transparent</a>.</p>
            </div>

            <div>
              <h2><Icon id="s-bolt" /> Reactive</h2>
              <p>Applications with an abundance of events benefit the most from reactive programming, which both simplifies your (async) evented code and separates logical concerns.</p>
              <p>This leads to <a href="https://en.wikipedia.org/wiki/Separation_of_concerns" target="_blank">Separation of Concerns</a>, because changes to data are co-located and isolated, thus impossible to change from the outside world.</p>
            </div>

            <div>
              <h2><Icon id="s-recycle" /> Unidirectional data flow</h2>
              <p>Baseloop apps have an explicit data flow where the data always flows predictably in a single direction.</p>
              <p>This aspect allows you to reason about your program state updates as you know exactly what takes place and where. This also makes debugging easier as you can just follow the flow of data like some breadcrumb trail.</p>
            </div>

            <div>
              <h2><Icon id="s-projectDiagram" /> Store-view-controller</h2>
              <p>Baseloop is based on an architectural pattern called store-view-controller, which was built specifically for unidirectional data flow and reactive programming in mind.</p>
              <p>In SVC, every action is an observable and all the state changes are transformations rather than mutations. Stores are the single source of truth. Controllers implement logic and views are thin without any logic besides highly view-specific logic.</p>
            </div>

            <div>
              <h2><Icon id="s-toolbox" /> A toolkit, not a framework</h2>
              <p>Baseloop is a toolkit (with a guide) and not a framework. We believe in libraries and modularity, where you pick the parts you need for your app.</p>
              <p>This can lead to developers wondering how to go about their apps, which is why we decided to write extensive guides and example projects to follow.</p>
            </div>

            <div>
              <h2><Icon id="s-userCheck" /> Simple, explicit and concise</h2>
              <p>Unlike some frameworks and toolkits, Baseloop aims to be explicit in what it does so that you can understand what's going on. After all, Baseloop aims to help you, not hide things from you.</p>
              <p>We believe in concise code, but not at the expense of simplicity. When code grows too complicated, it should be broken down into separate modules. Baseloop follows this ideology, and with the help of reactive and functional programming, this can be achieved trivially.</p>
            </div>

            <div>
              <h2><Icon id="s-comments" /> Decoupled components</h2>
              <p>All Baseloop components can be decoupled from each other allowing for maximum code-reuse, testability and debugging.</p>
              <p>This also allows for separation of a component into its own module. That's ultimately what Baseloop is all about: a toolkit of re-usable modules.</p>
            </div>

            <div>
              <h2><Icon id="s-copy" /> Separation of concerns</h2>
              <p>Some developers advocate the use of React components for non-view specific purposes such as Ajax requests or application logic. In Baseloop, all React (Preact or Inferno) components are thin and do not handle application logic. We believe in separation of concerns and thus views are only used for view purposes.</p>
            </div>

            <div>
              <h2><Icon id="s-rook" /> Virtual DOM</h2>
              <p>Baseloop leverages the concept of a virtual DOM. We support React, Preact and Inferno.</p>
              <p>Unlike Vue.js or AngularJS, virtual DOMs are well suited for functional programming with unidirectional data flows.</p>
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
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
