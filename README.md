# ⛏ Baseloop &middot; [![Discord](https://img.shields.io/discord/551772477165010959.svg)]

Baseloop is not a framework, but rather a toolkit with a guide, which shows you how to build modern web applications that 
adhere to well-proven principles of modern web app development such as functional and reactive programming.

## Running the demo

- `git clone` the entire repository.
- Install [Lerna](https://github.com/lerna/lerna/): `npm install -g lerna`.
- Run at the root level: `lerna bootstrap --hoist`. This will install and set up all dependencies.
- Under the directory `packages/example/`, keep the following scripts running:
  - `npm run watch-server` (a watcher that builds the server-side code)
  - `npm run watch-client` (for client-side code)
  - `npm run app` (the server app)
- Go to [http://localhost/](http://localhost/)
