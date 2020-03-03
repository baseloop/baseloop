# Installation

Start by cloning the example project: https://github.com/baseloop/baseloop-example

## Running the example

Install the dependencies:

```
npm i
```

Run the example with `npm run dev`.

## Example project structure 

Now you should have a similar project structure:

```
src/
  client/
    index.ts
    feature-x/
      feature-x-controller.ts
      feature-x-view.tsx
    ...
  server/
    static/
      index.html
    index.ts
package.json
webpack.config.js
...
```

Let me explain the project structure, which you are free to modify as you please.

Our example project is using Webpack. The configuration is defined in `webpack.config.js`, which is used by both frontend and backend.
You are free to use any other build tool you like such as [Parcel](https://parceljs.org/) or [Rollup](https://rollupjs.org/). We will not go through Webpack configuration as that is something you
can learn through their documentation.

The main source code lies under `src/`, grouped in `client/`, `common/` and `server/` folders. The `common/` folder is
used for all shared source code between the server and the client. If you're writing SSR, all view related code
would end up in `common`.

We prefer grouping source code based on *features* instead of types of code. This means we want all the code related
to one feature to lie within their own separate folder. Therefore we do not have folders such as `controllers/` or `views/`,
but instead folders such as `app/`, `about/`, `profile/`, `todos/`, `feature-x/`, etc.

## Running the example

A look into the `package.json` file reveals:

```
"scripts": {
  ...
  "dev": "baseloop dev --server dist/server/index.js"
}
```

We can run our app with it:

```
npm run dev
```

```
∞ Baseloop auto-reload server is running at ws://localhost:3456/
∞ Starting Webpack client watcher...
∞ Baseloop development server is running at http://localhost:8080/
...
```

Congrats! You may now access your app from the given URL.
