# Contributing to Baseloop

## Install dependencies and tools

- `git clone` the entire repository.
- Install NodeJS and NPM.
- Install [Lerna](https://github.com/lerna/lerna/) and Webpack: `npm install -g lerna webpack webpack-cli`.
- Run at the root level: `lerna bootstrap --hoist`. This will install and set up all dependencies.
  - You need to run this command every time you wish to update node_modules of any package. Do not use `npm install`!

### Run the website

- Under the directory `packages/website/`, keep the following script running:
  - `npm run website:server`
    - This will keep watching and building your client-side source code and auto-reload the page.
- Go to [http://localhost:8080/](http://localhost:8080/) or whatever the port happens to be.

### Run the example

- Under the directory `packages/example/`, keep the following script running:
  - `npm run example:server`
    - This will keep watching and building your client-side source code and auto-reload the page.
- Go to [http://localhost:8080/](http://localhost:8080/) or whatever the port happens to be.
