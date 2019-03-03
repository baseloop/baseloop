# Baseloop &middot; [![Discord](https://img.shields.io/discord/551772477165010959.svg?color=green&label=chat%20on%20Discord)](https://discord.gg/zMyuFwt)

Baseloop is not a framework, but rather a toolkit with a guide, which shows you how to build modern web applications that 
adhere to well-proven principles of modern web app development such as functional and reactive programming.

![npm-version](https://img.shields.io/npm/v/@baseloop/core.svg?color=green&label=npm%20package)
![license](https://img.shields.io/npm/l/@baseloop/core.svg?color=green)

## Running the demo

- `git clone` the entire repository.
- Install [Lerna](https://github.com/lerna/lerna/): `npm install -g lerna`.
- Run at the root level: `lerna bootstrap --hoist`. This will install and set up all dependencies.
- Under the directory `packages/example/`, keep the following scripts running:
  - `npm run watch-server` (a watcher that builds the server-side code)
  - `npm run watch-client` (for client-side code)
  - `npm run app` (the server app)
- Go to [http://localhost/](http://localhost/)

## Architecture (store-view-controller)
![architecture](https://github.com/baseloop/baseloop/raw/master/resources/baseloop-architecture.png)

SVC (store-view-controller) is based on reactive programming and thus observable events.

These events are created by views (user interaction such as mouse clicks or key presses) and web APIs 
(such as ajax responses or WebSocket message events).

Controllers and stores can observe these events. Controllers can also observe store state changes. And in the end,
views observe controller state changes. SVC is based on *unidirectional data flow*. This means that data always flows
in one direction. 
