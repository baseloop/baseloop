# Installation

In this tutorial, we will set up an example project that uses Baseloop. We are using NPM here, but you may use another
 tool like Yarn.

## Setting up dependencies

Let's start by creating an empty NPM project somewhere on your disk:

```
npm init 
```

To get started with Baseloop, we recommend you to install the dev package first:

```
npm install --save-dev @baseloop/dev
```

This dev package comes with a command line tool that we will use next.

## Creating our example project 

Create the example project with our newly installed tool:

```
npx baseloop new
```

Now you should have a similar project structure:

```
src/
  client/
    index.ts
  common/
    about/
      about-controller.ts
      about-view.tsx
    app/
      app-controller.ts
      app-view.tsx
    home/
      home-view.tsx
    static/
      favicon.png
      index.html
  server/
    index.ts
package.json
webpack.config.js
```

Let me explain the project structure, which you are free to modify as you please.

Our example project is using Webpack. The configuration is defined in `webpack.config.js`, which is used by both frontend and backend.
You are free to use any other build tool you like such as [Parcel](https://parceljs.org/) or [Rollup](https://rollupjs.org/). We will not go through Webpack configuration as that is something you
can learn through their documentation.

The main source code lies under `src/`, grouped in `client/`, `common/` and `server/` folders. The `common/` folder is
used for almost all source code, because we are writing universal JavaScript that can render your app on the server
side.

We prefer grouping source code based on *features* instead of types of code. This means we want all the code related
to one feature to lie within their own separate folder. Therefore we do not have folders such as `controllers/` or `views/`,
but instead folders such as `app/`, `about/`, `profile/`, `todos/`, `feature-x/`, etc.

## Running the example

The cli tool we ran added the following line to your `package.json` file:

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
