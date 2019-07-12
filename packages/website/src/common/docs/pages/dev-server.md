# Development server

The development server is part of the `@baseloop/dev` package. It is similar to `webpack-dev-server`.

## Installation

```
npm install --save-dev @baseloop/dev
```

## Usage

### A dev server for frontend development

*Note: compilation and bundling currently works with Webpack only.*

Similarly to `webpack-dev-server`, you can start a development server for your frontend development:

```
npx baseloop dev
```

The above command will do the following:

* Start a dev server on your local machine.
  * You can specify `host` and `port` options if needed.
  * Serves your code from `public-dir`, which defaults to `dist/`. 
    Expects an `index.html` file there along with the compiled code. The default output path for Webpack is `dist/`.
* Compile and bundle your frontend code with Webpack.
  * If you do not specify a config file, it defaults to `webpack.config.js`.
* Watch for file changes, recompiling as needed.
  * Automatically reloads the browser when the code is recompiled.
* Default to `spa` mode (Single-Page App), meaning it will serve the same `index.html` file from every URL you access.
  This lets you have client-side routing for SPAs. Can be turned off with `--spa=false`.

### A dev server for backend & frontend development

If you have a backend server that you want to use, you can tell Baseloop dev server to use it:

```
npx baseloop dev --server dist/server/index.js
```

In addition to the previous explanation above, the backend server options will also:

* Recompile your backend code using the Webpack config.
* Watch for backend code changes and restart your backend.

### Setting up a simple npm cli command

To ease your burden, you can setup a simple npm script for yourself in `package.json`:

```
{
  "scripts": {
    "app": "baseloop dev --server dist/server/index.js"
  }
}
```

Then you can just run it: `npm run app`.
